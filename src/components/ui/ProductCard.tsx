'use client';

import { motion } from 'framer-motion';
import { Product } from '@/lib/serper';
import { Heart } from 'lucide-react';
import { useStore } from '@/lib/store-context';

export default function ProductCard({
    product,
    index,
    onQuickView
}: {
    product: Product;
    index: number;
    onQuickView: (p: Product) => void;
}) {
    const { addToWishlist, removeFromWishlist, isInWishlist } = useStore();
    const isWishlisted = isInWishlist(product.title);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            className="group cursor-pointer"
            onClick={() => onQuickView(product)}
        >
            <div className="relative overflow-hidden aspect-[3/4] mb-4 bg-stone-100">
                {/* Wishlist Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        isWishlisted ? removeFromWishlist(product.title) : addToWishlist(product);
                    }}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white"
                >
                    <Heart size={16} className={isWishlisted ? "fill-stone-900 text-stone-900" : "text-stone-400"} />
                </button>

                {/* Image Placeholder */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-110"
                />

                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onQuickView(product);
                        }}
                        className="bg-white/90 backdrop-blur-sm px-6 py-3 uppercase text-xs tracking-widest hover:bg-white transition-colors"
                    >
                        Quick View
                    </button>
                </div>
            </div>

            <div className="text-center">
                <h3 className="font-serif text-lg text-stone-900 mb-1">{product.title}</h3>
                <p className="text-sm text-stone-500 font-mono tracking-wide">{product.price}</p>
            </div>
        </motion.div>
    );
}
