'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingBag, Trash2, Loader2, Check } from 'lucide-react';
import { useStore } from '@/lib/store-context';
import { useState } from 'react';
import { ReactLenis } from 'lenis/react';
import { cn } from '@/lib/utils';

interface WishlistOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function WishlistOverlay({ isOpen, onClose }: WishlistOverlayProps) {
    const { wishlist, removeFromWishlist, addToCart, clearWishlist } = useStore();
    const [actioningItem, setActioningItem] = useState<{ title: string, type: 'remove' | 'add' } | null>(null);

    const handleAction = async (title: string, type: 'remove' | 'add', item?: any) => {
        setActioningItem({ title, type });

        await new Promise(resolve => setTimeout(resolve, 600));

        if (type === 'remove') {
            removeFromWishlist(title);
        } else if (item) {
            addToCart(item);
            removeFromWishlist(title);
        }

        setActioningItem(null);
    };

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
                                    <AnimatePresence mode="popLayout">
                                        {wishlist.map((item, idx) => (
                                            <motion.div
                                                key={`${item.title}-${idx}`}
                                                layout
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{
                                                    opacity: actioningItem?.title === item.title ? 0.6 : 1,
                                                    x: 0
                                                }}
                                                exit={{ opacity: 0, x: 50 }}
                                                transition={{ delay: idx * 0.05 }}
                                                className="flex gap-6 group"
                                            >
                                                <div className="w-24 aspect-[3/4] bg-stone-50 overflow-hidden relative">
                                                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                                                    {actioningItem?.title === item.title && (
                                                        <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] flex items-center justify-center">
                                                            <Loader2 size={16} className="animate-spin text-stone-900" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1 flex flex-col py-1">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h3 className="text-xs uppercase tracking-widest font-medium max-w-[150px]">{item.title}</h3>
                                                        <button
                                                            disabled={!!actioningItem}
                                                            onClick={() => handleAction(item.title, 'remove')}
                                                            className="text-stone-300 hover:text-stone-900 transition-colors disabled:opacity-0"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                    <p className="text-stone-500 font-serif italic text-sm mb-6">{item.price}</p>

                                                    <button
                                                        disabled={!!actioningItem}
                                                        onClick={() => handleAction(item.title, 'add', item)}
                                                        className={cn(
                                                            "mt-auto w-full border py-3 text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2",
                                                            actioningItem?.title === item.title && actioningItem.type === 'add'
                                                                ? "bg-stone-100 border-transparent text-stone-400"
                                                                : "border-stone-200 hover:bg-stone-900 hover:text-white hover:border-stone-900"
                                                        )}
                                                    >
                                                        {actioningItem?.title === item.title && actioningItem.type === 'add' ? (
                                                            <>
                                                                <Check size={14} />
                                                                Adding...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <ShoppingBag size={14} />
                                                                Add to Bag
                                                            </>
                                                        )}
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
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
