'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center px-6 text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-4 tracking-tight uppercase">AN ERROR OCCURRED</h2>
                <p className="text-stone-500 text-sm uppercase tracking-[0.2em] max-w-md mx-auto leading-relaxed mb-12">
                    We encountered an unexpected issue while curating your experience.
                </p>

                <button
                    onClick={() => reset()}
                    className="px-8 py-3 border border-stone-900 text-stone-900 text-xs uppercase tracking-widest hover:bg-stone-900 hover:text-white transition-all"
                >
                    Try Again
                </button>
            </motion.div>
        </div>
    );
}
