'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center px-6 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="font-serif text-[12vw] leading-none text-stone-900 mb-8 opacity-10">404</h1>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-4 tracking-tight">PAGE NOT FOUND</h2>
                    <p className="text-stone-500 text-sm uppercase tracking-[0.2em] max-w-md mx-auto leading-relaxed">
                        The page you are looking for does not exist or has been moved to a new collection.
                    </p>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mt-12"
            >
                <Link
                    href="/"
                    className="px-8 py-3 bg-stone-900 text-white text-xs uppercase tracking-widest hover:bg-stone-800 transition-colors"
                >
                    Return to Universe
                </Link>
            </motion.div>
        </div>
    );
}
