'use client';

import { motion } from 'framer-motion';
import Scene from '@/components/3d/Scene';

export default function Hero() {
    return (
        <section className="relative w-full h-screen bg-stone-100 flex items-center justify-center overflow-hidden">
            {/* 3D Background */}
            <Scene />

            <div className="relative z-10 text-center flex flex-col items-center pointer-events-none">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="text-xs md:text-sm uppercase tracking-[0.3em] mb-4 text-stone-500"
                >
                    The New Collection
                </motion.p>

                <div className="overflow-hidden">
                    <motion.h1
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="font-serif text-[15vw] leading-[0.9] text-stone-900 tracking-tighter"
                    >
                        DIOR
                    </motion.h1>
                </div>

                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1, duration: 1, ease: "easeInOut" }}
                    className="w-24 h-[1px] bg-stone-400 my-8"
                />

                <motion.a
                    href="#products"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="text-xs uppercase tracking-widest border-b border-stone-900 pb-1 hover:opacity-60 transition-opacity pointer-events-auto"
                >
                    Discover More
                </motion.a>
            </div>
        </section>
    );
}
