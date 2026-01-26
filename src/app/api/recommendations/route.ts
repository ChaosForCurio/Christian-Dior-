import { NextResponse } from 'next/server';
import { query } from '@/lib/neon';
import { supabase } from '@/lib/supabaseClient';
import { getProductRecommendations } from '@/lib/gemini';
import { stackServerApp } from '@/lib/stack';
import { RecommendationRequestSchema } from '@/lib/validation';

export async function GET(req: Request) {
    try {
        // 1. Authentication
        const user = await stackServerApp.getUser();
        if (!user) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);

        // 2. Validation
        const validation = RecommendationRequestSchema.safeParse({ userId: user.id });
        if (!validation.success) {
            return NextResponse.json({ success: false, error: validation.error.format() }, { status: 400 });
        }
        const { userId } = validation.data;

        // 3. Fetch user history from Neon
        const activityRes = await query(
            'SELECT * FROM user_activities WHERE user_id = $1 ORDER BY created_at DESC LIMIT 10',
            [userId]
        );
        const history = activityRes.rows;

        // 4. Fetch products from Supabase
        const { data: products, error: productError } = await supabase
            .from('products')
            .select('*')
            .limit(20);

        if (productError) throw productError;

        // 5. Get recommendations from Gemini
        const recommendations = await getProductRecommendations(history, products || []);

        return NextResponse.json({ success: true, recommendations });
    } catch (error: any) {
        console.error('Recommendations api error:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
