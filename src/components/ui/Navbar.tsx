'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ShoppingBag, Search, Menu } from 'lucide-react';
import Logo from './Logo';
import Dior3DLogo from './Dior3DLogo';
import MenuOverlay from './MenuOverlay';
import SearchOverlay from './SearchOverlay';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 flex justify-between items-center mix-blend-difference text-white"
            >
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className="hidden md:flex items-center gap-2 text-sm uppercase tracking-widest hover:opacity-70 transition-opacity"
                    >
                        <Menu size={20} />
                        <span>Menu</span>
                    </button>
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className="md:hidden"
                    >
                        <Menu size={24} />
                    </button>
                </div>

                <div className="absolute left-1/2 -track-1/2 -translate-x-1/2">
                    <Dior3DLogo />
                </div>

                <div className="flex items-center gap-6">
                    <div className="hidden md:flex items-center gap-6 text-sm uppercase tracking-widest">
                        <Link href="/fashion" className="hover:opacity-70 transition-opacity">Fashion</Link>
                        <Link href="/beauty" className="hover:opacity-70 transition-opacity">Beauty</Link>
                    </div>
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="hover:opacity-70 transition-opacity"
                    >
                        <Search size={20} />
                    </button>
                    <button className="hover:opacity-70 transition-opacity">
                        <ShoppingBag size={20} />
                    </button>
                </div>
            </motion.nav>

            <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
}
