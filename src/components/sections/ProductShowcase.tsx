'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProducts, Product } from '@/lib/serper';
import ProductCard from '@/components/ui/ProductCard';

const CATEGORIES = ['Scarves', 'Shoes'];

export default function ProductShowcase() {
    const [activeCategory, setActiveCategory] = useState('Scarves');
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const data = await getProducts(activeCategory);
            setProducts(data);
            setLoading(false);
        };
        fetchProducts();
    }, [activeCategory]);

    return (
        <section id="products" className="py-24 px-6 md:px-12 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="font-serif text-4xl md:text-5xl mb-8 tracking-wide">LATEST ARRIVALS</h2>

                    <div className="flex justify-center gap-8">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`text-sm uppercase tracking-widest pb-1 border-b transition-colors ${activeCategory === cat ? 'border-stone-900 text-stone-900' : 'border-transparent text-stone-400 hover:text-stone-600'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </motion.div>

                <div className="min-h-[600px]">
                    <AnimatePresence mode='wait'>
                        {loading ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center justify-center h-96"
                            >
                                <div className="w-12 h-[1px] bg-stone-300 animate-pulse" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key={activeCategory}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
                            >
                                {products.map((product, idx) => (
                                    <ProductCard key={product.title} product={product} index={idx} />
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
