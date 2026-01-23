'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '@/lib/store-context';
import { Product } from '@/lib/serper';
import { ReactLenis } from 'lenis/react';

interface BagOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function BagOverlay({ isOpen, onClose }: BagOverlayProps) {
    const { cart, removeFromCart, totalPrice, clearCart } = useStore();

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[150] flex justify-end">
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
                                <ShoppingBag size={20} />
                                <h2 className="font-serif text-2xl uppercase tracking-tighter">My Bag ({cart.length})</h2>
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
                                {cart.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center py-24">
                                        <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mb-6">
                                            <ShoppingBag size={24} className="text-stone-300" />
                                        </div>
                                        <p className="text-stone-400 font-serif italic text-lg mb-8">Your bag is empty.</p>
                                        <button
                                            onClick={onClose}
                                            className="text-[10px] uppercase tracking-[0.3em] border-b border-stone-900 pb-1 hover:opacity-60 transition-opacity"
                                        >
                                            Start Shopping
                                        </button>
                                    </div>
                                ) : (
                                    cart.map((item, idx) => (
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
                                                        onClick={() => removeFromCart(item.title)}
                                                        className="text-stone-300 hover:text-stone-900 transition-colors"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                                <p className="text-stone-500 font-serif italic text-sm mb-4">{item.price}</p>
                                                <div className="mt-auto">
                                                    <span className="text-[10px] uppercase tracking-widest text-stone-300">Quantity: 1</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))
                                )}
                            </div>
                        </ReactLenis>

                        {cart.length > 0 && (
                            <div className="p-8 border-t border-stone-100 bg-stone-50/50">
                                <div className="flex justify-between items-center mb-8">
                                    <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400">Total (Excl. Tax)</span>
                                    <span className="text-xl font-serif">${totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                                </div>
                                <button className="w-full bg-stone-900 text-white py-5 flex items-center justify-center gap-3 group hover:bg-stone-800 transition-colors uppercase text-[10px] tracking-[0.3em]">
                                    Checkout Now
                                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                                <p className="text-[10px] text-center text-stone-400 mt-6 uppercase tracking-widest">
                                    Free shipping on all orders over $500
                                </p>
                                <button
                                    onClick={clearCart}
                                    className="w-full text-[8px] uppercase tracking-[0.4em] text-stone-300 hover:text-stone-900 transition-colors mt-8"
                                >
                                    Empty Bag
                                </button>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
