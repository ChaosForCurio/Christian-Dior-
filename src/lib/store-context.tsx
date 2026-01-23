'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from './serper';

interface StoreContextType {
    cart: Product[];
    wishlist: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (productTitle: string) => void;
    addToWishlist: (product: Product) => void;
    removeFromWishlist: (productTitle: string) => void;
    isInWishlist: (productTitle: string) => boolean;
    totalPrice: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<Product[]>([]);
    const [wishlist, setWishlist] = useState<Product[]>([]);

    // Load from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('dior-cart');
        const savedWishlist = localStorage.getItem('dior-wishlist');
        if (savedCart) setCart(JSON.parse(savedCart));
        if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    }, []);

    // Save to localStorage on change
    useEffect(() => {
        localStorage.setItem('dior-cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem('dior-wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const addToCart = (product: Product) => {
        setCart(prev => [...prev, product]);
    };

    const removeFromCart = (productTitle: string) => {
        setCart(prev => prev.filter(item => item.title !== productTitle));
    };

    const addToWishlist = (product: Product) => {
        if (!wishlist.find(item => item.title === product.title)) {
            setWishlist(prev => [...prev, product]);
        }
    };

    const removeFromWishlist = (productTitle: string) => {
        setWishlist(prev => prev.filter(item => item.title !== productTitle));
    };

    const isInWishlist = (productTitle: string) => {
        return !!wishlist.find(item => item.title === productTitle);
    };

    const totalPrice = cart.reduce((total, item) => {
        const priceNum = parseFloat(item.price.replace(/[$,]/g, '')) || 0;
        return total + priceNum;
    }, 0);

    return (
        <StoreContext.Provider value={{
            cart,
            wishlist,
            addToCart,
            removeFromCart,
            addToWishlist,
            removeFromWishlist,
            isInWishlist,
            totalPrice
        }}>
            {children}
        </StoreContext.Provider>
    );
}

export function useStore() {
    const context = useContext(StoreContext);
    if (context === undefined) {
        throw new Error('useStore must be used within a StoreProvider');
    }
    return context;
}
