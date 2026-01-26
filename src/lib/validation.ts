import { z } from 'zod';

export const ProductSchema = z.object({
    title: z.string().min(1),
    price: z.string().optional(),
    imageUrl: z.string().url(),
    link: z.string().url().optional().or(z.literal('#')),
});

export const SyncRequestSchema = z.object({
    query: z.string().min(1).max(100).optional().default('dior new arrivals'),
});

export const ActivityLogSchema = z.object({
    userId: z.string().min(1),
    action: z.enum(['view_product', 'add_to_cart', 'purchase', 'search']),
    metadata: z.record(z.string(), z.any()).optional().default({}),
});

export const RecommendationRequestSchema = z.object({
    userId: z.string().min(1),
});

export type Product = z.infer<typeof ProductSchema>;
