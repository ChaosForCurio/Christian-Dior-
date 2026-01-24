'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ShoppingBag, Search, Menu, Heart, User } from 'lucide-react';
import { useUser } from "@stackframe/stack";
import Logo from './Logo';
import MenuOverlay from './MenuOverlay';
import SearchOverlay from './SearchOverlay';
import BagOverlay from './BagOverlay';
import WishlistOverlay from './WishlistOverlay';
import { useStore } from '@/lib/store-context';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isBagOpen, setIsBagOpen] = useState(false);
    const [isWishlistOpen, setIsWishlistOpen] = useState(false);
    const { cart, wishlist } = useStore();
    const user = useUser();

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
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

                <div className="absolute left-1/2 -translate-x-1/2">
                    <Logo />
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
                    <Link
                        href={user ? "/account" : "/sign-in"}
                        className="hover:opacity-70 transition-opacity"
                    >
                        {user?.profileImageUrl ? (
                            <div className="w-5 h-5 rounded-full overflow-hidden border border-white/50">
                                <img
                                    src={user.profileImageUrl}
                                    alt={user.displayName || "Profile"}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ) : (
                            <User size={20} />
                        )}
                    </Link>
                    <button
                        onClick={() => setIsWishlistOpen(true)}
                        className="hover:opacity-70 transition-opacity relative"
                    >
                        <Heart size={20} />
                        {wishlist.length > 0 && (
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full" />
                        )}
                    </button>
                    <button
                        onClick={() => setIsBagOpen(true)}
                        className="hover:opacity-70 transition-opacity relative"
                    >
                        <ShoppingBag size={20} />
                        {cart.length > 0 && (
                            <span className="absolute -top-2 -right-2 text-[10px] font-medium bg-white text-black w-4 h-4 rounded-full flex items-center justify-center">
                                {cart.length}
                            </span>
                        )}
                    </button>
                </div>
            </motion.nav>

            <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
            <BagOverlay isOpen={isBagOpen} onClose={() => setIsBagOpen(false)} />
            <WishlistOverlay isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
        </>
    );
}
