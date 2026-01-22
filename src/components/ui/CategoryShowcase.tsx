'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProducts, Product } from '@/lib/serper';
import ProductCard from './ProductCard';
import { Loader2 } from 'lucide-react';

interface CategoryShowcaseProps {
    category: string;
    description: string;
}

export default function CategoryShowcase({ category, description }: CategoryShowcaseProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const data = await getProducts(category);
            setProducts(data);
            setLoading(false);
        };
        fetchProducts();
    }, [category]);

    return (
        <section className="pt-40 pb-24 px-6 md:px-12 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-20"
                >
                    <span className="text-[10px] uppercase tracking-[0.4em] text-stone-400 mb-4 block">Collections</span>
                    <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-6 uppercase tracking-tight">{category}</h1>
                    <p className="text-stone-500 max-w-2xl font-light leading-relaxed text-lg italic">
                        {description}
                    </p>
                </motion.div>

                <div className="min-h-[400px]">
                    <AnimatePresence mode='wait'>
                        {loading ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center h-96 gap-4"
                            >
                                <Loader2 className="animate-spin text-stone-200" size={40} />
                                <span className="text-[10px] uppercase tracking-widest text-stone-300">Curating the finest...</span>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20"
                            >
                                {products.map((product, idx) => (
                                    <ProductCard key={product.title + idx} product={product} index={idx} />
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
