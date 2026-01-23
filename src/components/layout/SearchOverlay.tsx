'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search as SearchIcon, ArrowRight, Loader2 } from 'lucide-react';
import { getProducts, Product } from '@/lib/serper';
import QuickView from '@/components/ui/QuickView';
import { ReactLenis } from 'lenis/react';

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

    const openQuickView = (product: Product) => {
        setSelectedProduct(product);
        setIsQuickViewOpen(true);
    };

    const handleSearch = useCallback(async (searchQuery: string) => {
        if (!searchQuery.trim()) {
            setResults([]);
            return;
        }
        setLoading(true);
        try {
            const data = await getProducts(searchQuery);
            setResults(data);
        } catch (error) {
            console.error('Search failed:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            handleSearch(query);
        }, 500);
        return () => clearTimeout(timer);
    }, [query, handleSearch]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[110] bg-white text-stone-900"
                >
                    <ReactLenis
                        options={{ wheelMultiplier: 0.8, duration: 1.2 }}
                        className="h-full overflow-y-auto scrollbar-hide"
                    >
                        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
                            <div className="flex justify-between items-center mb-16">
                                <span className="text-[10px] uppercase tracking-[0.4em] text-stone-400">Search Dior.com</span>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-stone-50 rounded-full transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="relative mb-24">
                                <input
                                    autoFocus
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="What are you looking for?"
                                    className="w-full bg-transparent border-b border-stone-200 py-6 text-3xl md:text-5xl lg:text-6xl font-serif outline-none placeholder:text-stone-100 focus:border-stone-900 transition-colors"
                                />
                                <div className="absolute right-0 top-1/2 -translate-y-1/2">
                                    {loading ? (
                                        <Loader2 className="animate-spin text-stone-300" size={32} />
                                    ) : (
                                        <SearchIcon className="text-stone-300" size={32} />
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                                <AnimatePresence mode="popLayout">
                                    {results.map((product, idx) => (
                                        <motion.div
                                            key={product.link + idx}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="group cursor-pointer"
                                            onClick={() => openQuickView(product)}
                                        >
                                            <div className="relative aspect-[4/5] bg-stone-50 mb-6 overflow-hidden">
                                                <img
                                                    src={product.imageUrl}
                                                    alt={product.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                                            </div>
                                            <div className="flex justify-between items-start gap-4">
                                                <div>
                                                    <h3 className="text-xs uppercase tracking-widest mb-2 font-medium">{product.title}</h3>
                                                    <p className="text-stone-500 text-sm">{product.price}</p>
                                                </div>
                                                <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {query && !loading && results.length === 0 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-24"
                                >
                                    <p className="text-stone-400 font-serif text-xl">No results found for &quot;{query}&quot;</p>
                                </motion.div>
                            )}

                            {!query && (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40">
                                    <div>
                                        <h4 className="text-[10px] uppercase tracking-widest mb-4">Trending</h4>
                                        <ul className="text-xs space-y-2">
                                            <li className="hover:text-stone-900 cursor-pointer">Lady Dior</li>
                                            <li className="hover:text-stone-900 cursor-pointer">Saddle Bag</li>
                                            <li className="hover:text-stone-900 cursor-pointer">J&apos;adore</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="text-[10px] uppercase tracking-widest mb-4">Collections</h4>
                                        <ul className="text-xs space-y-2">
                                            <li className="hover:text-stone-900 cursor-pointer">Cruise 2024</li>
                                            <li className="hover:text-stone-900 cursor-pointer">Spring-Summer</li>
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                    </ReactLenis>

                    <QuickView
                        product={selectedProduct}
                        isOpen={isQuickViewOpen}
                        onClose={() => setIsQuickViewOpen(false)}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
