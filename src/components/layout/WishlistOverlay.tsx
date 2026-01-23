'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useStore } from '@/lib/store-context';
import { ReactLenis } from 'lenis/react';

interface WishlistOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function WishlistOverlay({ isOpen, onClose }: WishlistOverlayProps) {
    const { wishlist, removeFromWishlist, addToCart, clearWishlist } = useStore();

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[160] flex justify-end">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm"
                    />

                    {/* Side Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col pt-12"
                    >
                        <div className="px-8 flex justify-between items-center mb-12">
                            <div className="flex items-center gap-3">
                                <Heart size={20} className="fill-stone-900" />
                                <h2 className="font-serif text-2xl uppercase tracking-tighter">Wishlist ({wishlist.length})</h2>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-stone-50 rounded-full transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <ReactLenis
                            options={{ wheelMultiplier: 0.8, duration: 1.2 }}
                            className="flex-1 overflow-y-auto px-8 scrollbar-hide"
                        >
                            <div className="py-8 space-y-8">
                                {wishlist.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center py-24">
                                        <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mb-6">
                                            <Heart size={24} className="text-stone-300" />
                                        </div>
                                        <p className="text-stone-400 font-serif italic text-lg mb-8">Your wishlist is empty.</p>
                                        <button
                                            onClick={onClose}
                                            className="text-[10px] uppercase tracking-[0.3em] border-b border-stone-900 pb-1 hover:opacity-60 transition-opacity"
                                        >
                                            Explore Collections
                                        </button>
                                    </div>
                                ) : (
                                    wishlist.map((item, idx) => (
                                        <motion.div
                                            key={`${item.title}-${idx}`}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="flex gap-6 group"
                                        >
                                            <div className="w-24 aspect-[3/4] bg-stone-50 overflow-hidden">
                                                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 flex flex-col py-1">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="text-xs uppercase tracking-widest font-medium max-w-[150px]">{item.title}</h3>
                                                    <button
                                                        onClick={() => removeFromWishlist(item.title)}
                                                        className="text-stone-300 hover:text-stone-900 transition-colors"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                                <p className="text-stone-500 font-serif italic text-sm mb-6">{item.price}</p>

                                                <button
                                                    onClick={() => {
                                                        addToCart(item);
                                                        removeFromWishlist(item.title);
                                                    }}
                                                    className="mt-auto w-full border border-stone-200 py-3 text-[10px] uppercase tracking-widest hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all flex items-center justify-center gap-2"
                                                >
                                                    <ShoppingBag size={14} />
                                                    Add to Bag
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))
                                )}
                            </div>
                        </ReactLenis>

                        <div className="p-8 bg-stone-50/50 flex flex-col items-center gap-4">
                            <p className="text-[10px] text-center text-stone-400 uppercase tracking-widest">
                                Your wishlist is saved for 30 days
                            </p>
                            {wishlist.length > 0 && (
                                <button
                                    onClick={clearWishlist}
                                    className="text-[8px] uppercase tracking-[0.4em] text-stone-300 hover:text-stone-900 transition-colors"
                                >
                                    Clear All
                                </button>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
