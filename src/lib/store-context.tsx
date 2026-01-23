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
    clearCart: () => void;
    clearWishlist: () => void;
    totalPrice: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<Product[]>([]);
    const [wishlist, setWishlist] = useState<Product[]>([]);

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const savedCart = localStorage.getItem('dior-cart');
            const savedWishlist = localStorage.getItem('dior-wishlist');

            if (savedCart) {
                const parsed = JSON.parse(savedCart);
                if (Array.isArray(parsed)) setCart(parsed);
            }

            if (savedWishlist) {
                const parsed = JSON.parse(savedWishlist);
                if (Array.isArray(parsed)) setWishlist(parsed);
            }
        } catch (error) {
            console.error('[Store] Failed to load from localStorage:', error);
            // Clear corrupted data
            localStorage.removeItem('dior-cart');
            localStorage.removeItem('dior-wishlist');
        }
    }, []);

    // Save to localStorage on change
    useEffect(() => {
        try {
            localStorage.setItem('dior-cart', JSON.stringify(cart));
        } catch (error) {
            console.error('[Store] Failed to save cart:', error);
        }
    }, [cart]);

    useEffect(() => {
        try {
            localStorage.setItem('dior-wishlist', JSON.stringify(wishlist));
        } catch (error) {
            console.error('[Store] Failed to save wishlist:', error);
        }
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

    const clearCart = () => setCart([]);
    const clearWishlist = () => setWishlist([]);

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
            clearCart,
            clearWishlist,
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
