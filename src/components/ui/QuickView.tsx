'use client';

import { motion, AnimatePresence, Variants } from 'framer-motion';
import { X, ShoppingBag, Heart, Share2, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { Product } from '@/lib/serper';
import { useEffect, useState } from 'react';
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
    const [isImageLoaded, setIsImageLoaded] = useState(false);

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

    const containerVariants: Variants = {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        },
        exit: {
            opacity: 0,
            scale: 0.95,
            y: 20,
            transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 lg:p-12">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="relative w-full max-w-6xl bg-white shadow-[0_30px_100px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col md:flex-row h-full max-h-[85vh] rounded-sm"
                    >
                        {/* Close Button */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={onClose}
                            className="absolute top-6 right-6 z-20 p-2.5 text-stone-400 hover:text-stone-900 transition-colors bg-white/90 backdrop-blur-md rounded-full border border-stone-100 shadow-sm"
                        >
                            <X size={18} />
                        </motion.button>

                        {/* Image Section */}
                        <div className="relative flex-1 bg-stone-50 overflow-hidden group h-[400px] md:h-auto">
                            {!isImageLoaded && (
                                <div className="absolute inset-0 bg-stone-100 animate-pulse flex items-center justify-center">
                                    <span className="text-[10px] uppercase tracking-widest text-stone-300">Loading Image...</span>
                                </div>
                            )}
                            <motion.img
                                initial={{ scale: 1.15 }}
                                animate={{ scale: isImageLoaded ? 1 : 1.15 }}
                                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                                src={product.imageUrl}
                                alt={product.title}
                                onLoad={() => setIsImageLoaded(true)}
                                className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                            />

                            {/* Visual Accent */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                        </div>

                        {/* Content Section */}
                        <div className="w-full md:w-[450px] lg:w-[500px] bg-white relative flex flex-col">
                            <div className="flex-1 overflow-y-auto scrollbar-hide p-8 md:p-12 lg:p-16">
                                <div className="flex flex-col gap-8">
                                    <motion.div variants={itemVariants} className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <span className="h-[1px] w-8 bg-stone-200" />
                                            <span className="text-[10px] uppercase tracking-[0.4em] text-stone-400">Exquisite Collection</span>
                                        </div>
                                        <h2 className="font-serif text-3xl lg:text-4xl text-stone-900 leading-[1.1] tracking-tight">
                                            {product.title}
                                        </h2>
                                        <p className="text-2xl text-stone-900/80 font-serif italic tracking-wide">
                                            {product.price}
                                        </p>
                                    </motion.div>

                                    <motion.div variants={itemVariants} className="space-y-6">
                                        <p className="text-sm text-stone-500 leading-relaxed font-light">
                                            Crafted with meticulous attention to detail at the Dior Ateliers. This creation embodies the House&apos;s historic savoir-faire and contemporary vision of elegance.
                                        </p>

                                        <div className="grid grid-cols-2 gap-6 pt-4">
                                            <div className="space-y-1">
                                                <span className="text-[9px] uppercase tracking-widest text-stone-300 block">Identity</span>
                                                <span className="text-[11px] font-mono text-stone-600">DR-2026-FSH</span>
                                            </div>
                                            <div className="space-y-1">
                                                <span className="text-[9px] uppercase tracking-widest text-stone-300 block">Origin</span>
                                                <span className="text-[11px] font-mono text-stone-600">Atelier Paris</span>
                                            </div>
                                        </div>
                                    </motion.div>

                                    <motion.div variants={itemVariants} className="space-y-4 pt-4 border-t border-stone-100">
                                        <div className="flex items-center gap-3 text-stone-400 group cursor-default">
                                            <ShieldCheck size={14} className="group-hover:text-stone-900 transition-colors" />
                                            <span className="text-[9px] uppercase tracking-[0.2em] group-hover:text-stone-600 transition-colors">Authenticity Guaranteed</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-stone-400 group cursor-default">
                                            <Truck size={14} className="group-hover:text-stone-900 transition-colors" />
                                            <span className="text-[9px] uppercase tracking-[0.2em] group-hover:text-stone-600 transition-colors">Complimentary Shipping</span>
                                        </div>
                                    </motion.div>

                                    <motion.div variants={itemVariants} className="space-y-4 pt-12 mt-auto">
                                        <motion.button
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => {
                                                addToCart(product);
                                                onClose();
                                            }}
                                            className="w-full bg-stone-900 text-white py-5 flex items-center justify-center gap-3 group hover:bg-stone-800 transition-all duration-500 uppercase text-[11px] tracking-[0.25em]"
                                        >
                                            <ShoppingBag size={16} strokeWidth={1.5} />
                                            Add to Bag
                                        </motion.button>

                                        <div className="grid grid-cols-2 gap-4">
                                            <button
                                                onClick={() => addToWishlist(product)}
                                                className={cn(
                                                    "border py-4 flex items-center justify-center gap-2 transition-all duration-500 uppercase text-[10px] tracking-widest",
                                                    isInWishlist(product.title)
                                                        ? "bg-stone-950 text-white border-stone-950"
                                                        : "border-stone-100 text-stone-600 hover:bg-stone-50 hover:border-stone-200"
                                                )}
                                            >
                                                <Heart size={14} strokeWidth={1.5} className={isInWishlist(product.title) ? "fill-white" : ""} />
                                                {isInWishlist(product.title) ? "Wishlisted" : "Wishlist"}
                                            </button>
                                            <button className="border border-stone-100 py-4 flex items-center justify-center gap-2 hover:bg-stone-50 hover:border-stone-200 transition-all duration-500 uppercase text-[10px] tracking-widest text-stone-600">
                                                <Share2 size={14} strokeWidth={1.5} />
                                                Share
                                            </button>
                                        </div>

                                        <Link
                                            href={product.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.3em] text-stone-300 hover:text-stone-900 transition-colors pt-6 group"
                                        >
                                            Explore the Creation
                                            <ArrowRight size={12} className="group-hover:translate-x-1.5 transition-transform duration-500" />
                                        </Link>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
