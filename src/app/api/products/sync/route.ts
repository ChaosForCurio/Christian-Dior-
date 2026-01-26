import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/serper';
import { uploadImage } from '@/lib/cloudinary';
import { supabase } from '@/lib/supabaseClient';
import { SyncRequestSchema } from '@/lib/validation';

export async function POST(req: Request) {
    try {
        // 1. Authorization: Admin Key Check
        const authHeader = req.headers.get('Authorization');
        const adminKey = process.env.ADMIN_API_KEY;

        if (!adminKey || authHeader !== `Bearer ${adminKey}`) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const rawQuery = searchParams.get('q') || 'dior new arrivals';

        // 2. Validation
        const validation = SyncRequestSchema.safeParse({ query: rawQuery });
        if (!validation.success) {
            return NextResponse.json({ success: false, error: validation.error.format() }, { status: 400 });
        }
        const { query } = validation.data;

        // 3. Fetch from Serper
        const products = await getProducts(query);

        const results = [];

        // 4. Process each product
        for (const product of products) {
            try {
                // Upload to Cloudinary
                const cloudinaryUrl = await uploadImage(product.imageUrl);

                // Store in Supabase
                const { data, error } = await supabase
                    .from('products')
                    .upsert({
                        title: product.title,
                        price: product.price,
                        original_image_url: product.imageUrl,
                        cloudinary_url: cloudinaryUrl,
                        link: product.link,
                        metadata: { query, synced_at: new Date().toISOString() }
                    }, { onConflict: 'title' })
                    .select();

                if (!error && data) {
                    results.push(data[0]);
                }
            } catch (err) {
                console.error(`Error processing product ${product.title}:`, err);
            }
        }

        return NextResponse.json({ success: true, count: results.length, products: results });
    } catch (error: any) {
        console.error('Sync error:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
