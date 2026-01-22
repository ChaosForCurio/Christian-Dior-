'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface MenuOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

const MENU_LINKS = [
    { title: 'Fashion', href: '/fashion', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop' },
    { title: 'Beauty', href: '/beauty', image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1600&auto=format&fit=crop' },
    { title: 'Accessories', href: '/accessories', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1600&auto=format&fit=crop' },
    { title: 'Haute Couture', href: '/couture', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1600&auto=format&fit=crop' },
    { title: 'Heritage', href: '/heritage', image: 'https://images.unsplash.com/photo-1537832816519-689ad163238b?q=80&w=1600&auto=format&fit=crop' },
];

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const overlayVariants = {
        closed: {
            opacity: 0,
            transition: {
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
                when: "afterChildren"
            }
        },
        open: {
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
                when: "beforeChildren"
            }
        }
    };

    const bgVariants = {
        closed: {
            scaleY: 0,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
            }
        },
        open: {
            scaleY: 1,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
            }
        }
    };

    const linkVariants = {
        closed: { y: 40, opacity: 0 },
        open: (i: number) => ({
            y: 0,
            opacity: 1,
            transition: {
                delay: 0.1 + i * 0.08,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
            }
        })
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={overlayVariants}
                    className="fixed inset-0 z-[100] text-white flex flex-col md:flex-row overflow-hidden"
                >
                    {/* Sliding Background Panel */}
                    <motion.div
                        variants={bgVariants}
                        className="absolute inset-0 bg-stone-900 origin-top"
                    />

                    <button
                        onClick={onClose}
                        className="absolute top-8 right-8 md:top-12 md:right-12 hover:rotate-90 transition-transform duration-500 z-[102]"
                    >
                        <X size={32} className="text-white/50 hover:text-white transition-colors" />
                    </button>

                    {/* Left: Menu Links */}
                    <div className="flex-1 flex flex-col justify-center px-8 md:px-24 py-12 z-[101]">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 0.5, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-xs uppercase tracking-[0.4em] mb-12 block font-medium"
                        >
                            Explore collections
                        </motion.span>
                        <nav className="flex flex-col gap-4 md:gap-6">
                            {MENU_LINKS.map((link, i) => (
                                <motion.div
                                    key={`menu-link-${link.title}`}
                                    custom={i}
                                    variants={linkVariants}
                                    onMouseEnter={() => setHoveredIndex(i)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    className="overflow-hidden"
                                >
                                    <Link
                                        href={link.href}
                                        onClick={onClose}
                                        className="font-serif text-5xl md:text-7xl lg:text-8xl hover:italic transition-all duration-500 inline-block relative group"
                                    >
                                        <span className="relative z-10">{link.title}</span>
                                        <motion.span
                                            className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full"
                                            initial={false}
                                        />
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>
                    </div>

                    {/* Right: Preview Image (Hidden on Mobile) */}
                    <div className="hidden md:block w-2/5 relative overflow-hidden bg-stone-800 z-[101]">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={hoveredIndex !== null ? `preview-${hoveredIndex}` : 'preview-default'}
                                src={hoveredIndex !== null ? MENU_LINKS[hoveredIndex].image : MENU_LINKS[0].image}
                                alt="Preview"
                                initial={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                                animate={{ opacity: 0.7, scale: 1, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, scale: 1.05, filter: 'blur(5px)' }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                            />
                        </AnimatePresence>
                        <div className="absolute inset-0 bg-gradient-to-l from-stone-900/50 to-transparent pointer-events-none" />

                        <div className="absolute bottom-12 left-12 flex flex-col gap-2">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                            >
                                <span className="text-[10px] uppercase tracking-[0.4em] opacity-40">Dior Maison</span>
                                <h4 className="text-xl font-serif mt-1 italic">The Spirit of Couture</h4>
                            </motion.div>
                        </div>
                    </div>

                    {/* Background Text */}
                    <div className="absolute bottom-[-5%] right-[-5%] pointer-events-none overflow-hidden opacity-[0.03] select-none z-[100]">
                        <h2 className="text-[35vw] leading-none font-serif uppercase tracking-tighter">DIOR</h2>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
