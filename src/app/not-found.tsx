'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag, Map, Sparkles } from 'lucide-react';

export default function NotFound() {
    const categories = [
        { name: 'Couture', href: '/couture', icon: Sparkles },
        { name: 'Fashion', href: '/fashion', icon: ShoppingBag },
        { name: 'Accessories', href: '/accessories', icon: Map },
    ];

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center select-none overflow-hidden relative">
            {/* Immersive Background */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, 0]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute inset-0 flex items-center justify-center opacity-[0.02]"
                >
                    <span className="font-serif text-[60vw]">404</span>
                </motion.div>
            </div>

            <div className="relative z-10 max-w-2xl w-full">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="text-[10px] uppercase tracking-[0.6em] text-stone-400 mb-6 block">Collection Not Found</span>
                    <h1 className="font-serif text-4xl md:text-6xl text-stone-900 mb-8 tracking-tight">
                        LOST IN THE UNIVERSE
                    </h1>
                    <p className="text-stone-500 text-xs md:text-sm uppercase tracking-[0.2em] max-w-md mx-auto leading-[2] mb-16">
                        The piece you are searching for is currently unavailable or has been archived. Allow us to guide you back to our curated selections.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
                    {categories.map((cat, i) => (
                        <motion.div
                            key={cat.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                        >
                            <Link
                                href={cat.href}
                                className="group block p-6 border border-stone-100 bg-stone-50/50 hover:bg-white hover:border-stone-900 transition-all duration-500"
                            >
                                <cat.icon size={18} className="mx-auto mb-4 text-stone-400 group-hover:text-stone-900 transition-colors" />
                                <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 group-hover:text-stone-900">{cat.name}</span>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-4 px-12 py-5 bg-stone-900 text-white text-[10px] uppercase tracking-[0.4em] hover:bg-stone-800 transition-all duration-500 group"
                    >
                        <span>Return Home</span>
                        <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-500" />
                    </Link>
                </motion.div>
            </div>

            {/* Corner Detailing */}
            <div className="absolute top-12 left-12 h-1 w-12 bg-stone-900/10" />
            <div className="absolute top-12 left-12 w-1 h-12 bg-stone-900/10" />
            <div className="absolute bottom-12 right-12 h-1 w-12 bg-stone-900/10" />
            <div className="absolute bottom-12 right-12 w-1 h-12 bg-stone-900/10" />
        </div>
    );
}
