'use server';

export interface Product {
    title: string;
    price: string;
    imageUrl: string;
    link: string;
}

export const getProducts = async (query: string): Promise<Product[]> => {
    const apiKey = process.env.SERPER_API_KEY;
    const lowerQuery = query.toLowerCase();

    // Fallback to Mock Data if no key provided
    if (!apiKey || apiKey.includes('your_serper_api_key')) {
        await new Promise(resolve => setTimeout(resolve, 800));

        if (lowerQuery.includes('fashion') || lowerQuery.includes('shoe')) {
            return [
                {
                    title: "Dior B27 Low-Top Sneaker",
                    price: '$1,300.00',
                    imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1480&auto=format&fit=crop',
                    link: '#'
                },
                {
                    title: "Ready-to-Wear Silk Coat",
                    price: '$4,200.00',
                    imageUrl: 'https://images.unsplash.com/photo-1539109132314-c0c29419b841?q=80&w=1480&auto=format&fit=crop',
                    link: '#'
                },
                {
                    title: "Lady Dior My ABCDior Bag",
                    price: '$5,600.00',
                    imageUrl: 'https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=1480&auto=format&fit=crop',
                    link: '#'
                }
            ];
        }

        if (lowerQuery.includes('beauty')) {
            return [
                {
                    title: "Dior Prestige La Crème",
                    price: '$390.00',
                    imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?q=80&w=1480&auto=format&fit=crop',
                    link: '#'
                },
                {
                    title: "Miss Dior Eau de Parfum",
                    price: '$160.00',
                    imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1480&auto=format&fit=crop',
                    link: '#'
                },
                {
                    title: "Rouge Dior Lipstick",
                    price: '$45.00',
                    imageUrl: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=1480&auto=format&fit=crop',
                    link: '#'
                }
            ];
        }

        if (lowerQuery.includes('accessories')) {
            return [
                {
                    title: "D-Connect Sunglasses",
                    price: '$520.00',
                    imageUrl: 'https://images.unsplash.com/photo-1511499767350-a15943ee7207?q=80&w=1480&auto=format&fit=crop',
                    link: '#'
                },
                {
                    title: "Dior Oblique Scarf",
                    price: '$650.00',
                    imageUrl: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=1480&auto=format&fit=crop',
                    link: '#'
                },
                {
                    title: "Clair D Lune Necklace",
                    price: '$590.00',
                    imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1480&auto=format&fit=crop',
                    link: '#'
                }
            ];
        }

        // Default / Latest Arrivals
        return [
            {
                title: "Dior Book Tote",
                price: '$3,350.00',
                imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1480&auto=format&fit=crop',
                link: '#'
            },
            {
                title: "Walk'D',ior Sneaker",
                price: '$950.00',
                imageUrl: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1480&auto=format&fit=crop',
                link: '#'
            },
            {
                title: "Dior Tribal Earrings",
                price: '$590.00',
                imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1480&auto=format&fit=crop',
                link: '#'
            }
        ];
    }

    // Real API Call
    try {
        console.log(`Fetching from Serper API for: Dior ${query}`);
        const response = await fetch('https://google.serper.dev/shopping', {
            method: 'POST',
            headers: {
                'X-API-KEY': apiKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                q: `Dior ${query}`,
                gl: 'us',
                hl: 'en',
                num: 6
            })
        });

        if (!response.ok) throw new Error('Failed to fetch from Serper');

        const data = await response.json();

        // Map Serper results to our Product interface
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return data.shopping.map((item: any) => ({
            title: item.title,
            price: item.price,
            imageUrl: item.imageUrl,
            link: item.link
        }));

    } catch (error) {
        console.error('Serper API Error:', error);
        return [];
    }
}
