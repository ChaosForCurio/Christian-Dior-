'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Heart, Share2, ArrowRight } from 'lucide-react';
import { Product } from '@/lib/serper';
import { useEffect } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store-context';
import { cn } from '@/lib/utils';

interface QuickViewProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function QuickView({ product, isOpen, onClose }: QuickViewProps) {
    const { addToCart, addToWishlist, isInWishlist } = useStore();
    // Prevent scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!product) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-stone-900/60 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full max-w-5xl bg-white shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 p-2 text-stone-400 hover:text-stone-900 transition-colors bg-white/80 backdrop-blur-sm rounded-full"
                        >
                            <X size={20} />
                        </button>

                        {/* Image Section */}
                        <div className="flex-1 bg-stone-100 overflow-hidden group">
                            <motion.img
                                initial={{ scale: 1.1 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                src={product.imageUrl}
                                alt={product.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Info Section */}
                        <div className="w-full md:w-[400px] p-8 md:p-12 flex flex-col overflow-y-auto">
                            <div className="mb-auto">
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-[10px] uppercase tracking-[0.4em] text-stone-400 mb-4 block"
                                >
                                    New Collection
                                </motion.span>

                                <motion.h2
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="font-serif text-3xl md:text-4xl text-stone-900 mb-6 leading-tight"
                                >
                                    {product.title}
                                </motion.h2>

                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-xl text-stone-600 font-serif italic mb-8"
                                >
                                    {product.price}
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="space-y-6 mb-12"
                                >
                                    <p className="text-sm text-stone-500 leading-relaxed uppercase tracking-wider">
                                        Experience the exceptional craftsmanship of the Dior universe. This piece represents the House's heritage and constant search for perfection.
                                    </p>

                                    <div className="flex gap-4">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[10px] uppercase tracking-widest text-stone-300">Reference</span>
                                            <span className="text-xs font-mono">DR-2026-FSH</span>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="space-y-4"
                            >
                                <button
                                    onClick={() => {
                                        addToCart(product);
                                        onClose();
                                    }}
                                    className="w-full bg-stone-900 text-white py-4 flex items-center justify-center gap-3 group hover:bg-stone-800 transition-colors uppercase text-xs tracking-[0.2em]"
                                >
                                    <ShoppingBag size={16} />
                                    Add to Bag
                                </button>

                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => addToWishlist(product)}
                                        className={cn(
                                            "flex-1 border py-3 flex items-center justify-center gap-2 transition-all uppercase text-[10px] tracking-widest",
                                            isInWishlist(product.title)
                                                ? "bg-stone-900 text-white border-stone-900"
                                                : "border-stone-200 text-stone-600 hover:bg-stone-50"
                                        )}
                                    >
                                        <Heart size={14} className={isInWishlist(product.title) ? "fill-white" : ""} />
                                        {isInWishlist(product.title) ? "Wishlisted" : "Wishlist"}
                                    </button>
                                    <button className="flex-1 border border-stone-200 py-3 flex items-center justify-center gap-2 hover:bg-stone-50 transition-colors uppercase text-[10px] tracking-widest text-stone-600">
                                        <Share2 size={14} />
                                        Share
                                    </button>
                                </div>

                                <Link
                                    href={product.link}
                                    target="_blank"
                                    className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.3em] text-stone-400 hover:text-stone-900 transition-colors pt-4 group"
                                >
                                    View Full Details
                                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
