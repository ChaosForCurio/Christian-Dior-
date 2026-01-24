'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Twitter, Instagram, Facebook, ArrowUpRight } from 'lucide-react';

export default function Footer() {
    const [parisTime, setParisTime] = useState<string>('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-GB', {
                timeZone: 'Europe/Paris',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });
            setParisTime(timeString);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const footerLinks = {
        products: [
            { name: 'Haute Couture', href: '#' },
            { name: 'Ready-to-Wear', href: '#' },
            { name: 'Accessories', href: '#' },
            { name: 'Fragrance', href: '#' },
        ],
        house: [
            { name: 'History', href: '#' },
            { name: 'Sustainability', href: '#' },
            { name: 'Exhibitions', href: '#' },
            { name: 'Careers', href: '#' },
        ],
        support: [
            { name: 'Client Service', href: '#' },
            { name: 'Shipping', href: '#' },
            { name: 'Returns', href: '#' },
            { name: 'Legal', href: '#' },
        ]
    };

    return (
        <footer className="relative w-full bg-stone-950 text-stone-400 overflow-hidden border-t border-white/5">
            <div className="max-w-[1800px] mx-auto px-6 md:px-12 pt-24 pb-12">
                {/* Top Section: Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
                    {/* Brand Info */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-white text-xs uppercase tracking-[0.3em] font-semibold mb-6">Maison Dior</h3>
                            <p className="max-w-xs text-sm leading-relaxed opacity-60 font-light">
                                Discover the world of Christian Dior, a legacy of elegance and avant-garde spirit since 1946.
                            </p>
                        </div>
                        <div className="flex gap-6">
                            <Link href="#" className="hover:text-white transition-colors duration-300"><Instagram size={18} strokeWidth={1.5} /></Link>
                            <Link href="#" className="hover:text-white transition-colors duration-300"><Twitter size={18} strokeWidth={1.5} /></Link>
                            <Link href="#" className="hover:text-white transition-colors duration-300"><Facebook size={18} strokeWidth={1.5} /></Link>
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h3 className="text-white text-xs uppercase tracking-[0.3em] font-semibold mb-8">{category}</h3>
                            <ul className="space-y-4">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="group flex items-center gap-2 text-sm hover:text-white transition-colors duration-300 font-light"
                                        >
                                            {link.name}
                                            <ArrowUpRight size={10} className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Middle Section: Time & Status */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-8 pb-12 border-b border-white/5 mb-12">
                    <div className="space-y-2">
                        <span className="text-[10px] uppercase tracking-[0.4em] opacity-40">Paris, France</span>
                        <div className="text-4xl md:text-5xl font-serif text-white/90 tabular-nums">
                            {parisTime || '00:00:00'}
                        </div>
                    </div>

                </div>

                {/* Bottom Section: Massive Brand Reveal */}
                <div className="relative pt-12">
                    <motion.h2
                        initial={{ y: "100%" }}
                        whileInView={{ y: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="text-[15vw] md:text-[20vw] leading-none font-serif text-white select-none pointer-events-none tracking-tighter opacity-100 mix-blend-exclusion"
                    >
                        DIOR
                    </motion.h2>

                    <div className="flex flex-col md:flex-row justify-between items-center mt-12 gap-6 text-[10px] uppercase tracking-[0.3em] opacity-40">
                        <p>© {new Date().getFullYear()} Christian Dior Couture</p>
                        <div className="flex gap-8">
                            <Link href="#" className="hover:text-white transition-colors underline-offset-4 hover:underline">Accessibility</Link>
                            <Link href="#" className="hover:text-white transition-colors underline-offset-4 hover:underline">Privacy Policy</Link>
                            <Link href="#" className="hover:text-white transition-colors underline-offset-4 hover:underline">Sitemap</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Aesthetic Background Elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/[0.02] to-transparent pointer-events-none" />
            <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-white/[0.02] blur-[150px] rounded-full pointer-events-none" />
        </footer>
    );
}
