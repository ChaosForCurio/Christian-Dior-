'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Captured Dior Exception:', error);
    }, [error]);

    const titleLetters = "AN ERROR OCCURRED".split("");

    return (
        <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center px-6 text-center select-none overflow-hidden relative">
            {/* Background Aesthetic */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
                <div className="w-full h-full flex items-center justify-center font-serif text-[40vw] leading-none">
                    D
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10"
            >
                <div className="flex justify-center mb-8">
                    {titleLetters.map((char, i) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            transition={{
                                delay: 0.2 + i * 0.03,
                                duration: 0.8,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                            className="font-serif text-3xl md:text-5xl text-stone-900 tracking-tight whitespace-pre"
                        >
                            {char}
                        </motion.span>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="space-y-6 mb-16"
                >
                    <p className="text-stone-500 text-[10px] md:text-sm uppercase tracking-[0.4em] max-w-md mx-auto leading-relaxed">
                        The House of Dior regrets an interruption in your immersive experience.
                        Our artisans have been notified.
                    </p>
                    <div className="h-[1px] w-12 bg-stone-200 mx-auto" />
                    <p className="text-stone-300 font-mono text-[9px] uppercase tracking-widest">
                        Error Digest: {error.digest || "Maison.Exceptions.Universal_01"}
                    </p>
                </motion.div>

                <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                    <button
                        onClick={() => reset()}
                        className="group relative flex items-center gap-3 px-10 py-4 bg-stone-900 text-white text-[10px] uppercase tracking-[0.3em] overflow-hidden transition-all duration-500 hover:bg-stone-800"
                    >
                        <RefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-700" />
                        <span>Restore Experience</span>
                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    </button>

                    <Link
                        href="#"
                        className="group flex items-center gap-3 px-10 py-4 border border-stone-200 text-stone-900 text-[10px] uppercase tracking-[0.3em] transition-all duration-500 hover:border-stone-900"
                    >
                        <MessageCircle size={14} />
                        <span>Contact Concierge</span>
                    </Link>
                </div>
            </motion.div>

            {/* Corner Detailing */}
            <div className="absolute top-12 left-12 h-12 w-12 border-t border-l border-stone-200 pointer-events-none" />
            <div className="absolute bottom-12 right-12 h-12 w-12 border-b border-r border-stone-200 pointer-events-none" />
        </div>
    );
}
