'use client';

import { motion, AnimatePresence, Variants } from 'framer-motion';
import { X, ShoppingBag, Heart, Share2, ShieldCheck, Truck, ArrowUpRight } from 'lucide-react';
import { Product } from '@/lib/serper';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store-context';
import { cn } from '@/lib/utils';

// --- Types ---

interface QuickViewProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

// --- Animation Variants ---

const overlayVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0, transition: { delay: 0.4 } }
};

const contentVariants: Variants = {
    hidden: { x: '100%' },
    visible: {
        x: 0,
        transition: {
            duration: 1,
            ease: [0.16, 1, 0.3, 1]
        }
    },
    exit: {
        x: '100%',
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1]
        }
    }
};

const imageVariants: Variants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1]
        }
    },
    exit: {
        scale: 1.05,
        opacity: 0,
        transition: { duration: 0.8 }
    }
};

const textReveal: Variants = {
    hidden: { y: '100%' },
    visible: {
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1]
        }
    }
};

const staggerContainer: Variants = {
    visible: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3
        }
    }
};

// --- Sub-components ---

const Visuals = ({
    imageUrl,
    title,
    onClose,
    closeBtnRef
}: {
    imageUrl: string;
    title: string;
    onClose: () => void;
    closeBtnRef: React.RefObject<HTMLButtonElement | null>;
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const imgRef = useRef<HTMLImageElement>(null);

    // Handle cached images
    useEffect(() => {
        if (imgRef.current?.complete) {
            setIsLoaded(true);
        }
    }, [imageUrl]);

    const handleMouseMove = (e: React.MouseEvent) => {
        setMousePos({
            x: e.clientX,
            y: e.clientY
        });
    };

    return (
        <div
            onMouseMove={handleMouseMove}
            className="relative w-full md:flex-1 bg-stone-100 overflow-hidden group h-[50vh] min-h-[400px] sm:h-[60vh] md:h-full"
        >
            {/* Custom Interactive Cursor - Desktop Only */}
            <motion.div
                className="hidden lg:flex fixed pointer-events-none z-30 w-16 h-16 rounded-full border border-white/40 items-center justify-center backdrop-blur-sm mix-blend-difference"
                style={{
                    left: mousePos.x - 32,
                    top: mousePos.y - 32,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200, mass: 0.5 }}
            >
                <span className="text-[8px] uppercase tracking-widest text-white font-medium">View</span>
            </motion.div>

            <motion.div
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full h-full"
            >
                {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-stone-50 z-10">
                        <div className="text-[10px] uppercase tracking-[1em] text-stone-200 animate-pulse">Dior</div>
                    </div>
                )}
                <img
                    ref={imgRef}
                    src={imageUrl}
                    alt={title}
                    onLoad={() => setIsLoaded(true)}
                    className={cn(
                        "w-full h-full object-cover transition-all duration-[3s] ease-out group-hover:scale-110",
                        !isLoaded && "opacity-0",
                        isLoaded && "opacity-100"
                    )}
                />
                <div className="absolute inset-0 bg-stone-900/5 mix-blend-multiply pointer-events-none" />
            </motion.div>

            <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onClick={onClose}
                ref={closeBtnRef}
                className="absolute top-4 left-4 md:top-8 md:left-8 flex items-center gap-3 md:gap-4 text-white group z-20 cursor-pointer"
                aria-label="Close product view"
            >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md group-hover:bg-white group-hover:text-stone-950 transition-all duration-500">
                    <X size={18} className="md:hidden" />
                    <X size={20} className="hidden md:block" />
                </div>
                <span className="hidden lg:block text-[10px] uppercase tracking-[0.4em] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">Close Cabinet</span>
            </motion.button>
        </div>
    );
};

const Editorial = ({
    product,
    isAdded,
    onAdd,
    addToWishlist,
    isInWishlist
}: {
    product: Product;
    isAdded: boolean;
    onAdd: () => void;
    addToWishlist: (p: Product) => void;
    isInWishlist: (t: string) => boolean;
}) => (
    <motion.div
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-full md:w-[500px] lg:w-[650px] bg-stone-50 h-auto md:h-full shadow-[-20px_0_60px_rgba(0,0,0,0.1)] relative flex flex-col pt-12 sm:pt-16 md:pt-24 px-6 sm:px-8 md:px-12 lg:px-16 pb-8 md:pb-12 max-h-[50vh] md:max-h-none overflow-y-auto md:overflow-y-visible"
    >
        <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex-1 flex flex-col"
        >
            <div className="mb-8 md:mb-12">
                <div className="overflow-hidden mb-4 md:mb-6">
                    <motion.span variants={textReveal} className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.5em] text-stone-400 block">
                        Maison Dior Signature
                    </motion.span>
                </div>
                <div className="overflow-hidden">
                    <motion.h2 id="quickview-title" variants={textReveal} className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-stone-900 leading-[1.05] tracking-tight mb-4 md:mb-6">
                        {product.title}
                    </motion.h2>
                </div>
                <div className="overflow-hidden">
                    <motion.p variants={textReveal} className="text-xl sm:text-2xl font-serif italic text-stone-800">
                        {product.price}
                    </motion.p>
                </div>
            </div>

            <motion.div variants={textReveal} className="space-y-6 md:space-y-8 mb-auto">
                <div className="grid grid-cols-2 gap-6 md:gap-12 py-6 md:py-8 border-y border-stone-200">
                    {[
                        { label: 'Atelier Location', val: '30 Avenue Montaigne, Paris' },
                        { label: 'Savoir-Faire', val: 'Hand-Finished Detail' },
                        { label: 'Certification', val: 'Authenticity Verified' },
                        { label: 'Collection', val: 'Season 2026 Collection' }
                    ].map(spec => (
                        <div key={spec.label} className="space-y-1.5 md:space-y-2">
                            <span className="text-[8px] md:text-[9px] uppercase tracking-[0.25em] md:tracking-[0.3em] text-stone-300 block">{spec.label}</span>
                            <span className="text-[10px] md:text-[11px] font-medium text-stone-600 block leading-relaxed">{spec.val}</span>
                        </div>
                    ))}
                </div>
                <p className="text-xs md:text-sm text-stone-500 leading-relaxed font-light italic max-w-sm hidden md:block">
                    "A Dior creation is never just an object; it is the embodiment of a dream, a testament to the excellence of our ateliers."
                </p>
            </motion.div>

            <div className="mt-8 md:mt-12 space-y-3 md:space-y-4">
                <div className="flex gap-3 md:gap-4">
                    <motion.button
                        whileHover={{ scale: 1.02, backgroundColor: '#1c1917' }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onAdd}
                        disabled={isAdded}
                        className={cn(
                            "flex-1 h-12 md:h-14 flex items-center justify-center gap-2 md:gap-3 transition-all duration-500 uppercase text-[9px] md:text-[10px] tracking-[0.25em] md:tracking-[0.3em] font-medium",
                            isAdded ? "bg-stone-100 text-stone-400 cursor-default" : "bg-stone-900 text-white"
                        )}
                    >
                        {isAdded ? <ShieldCheck size={14} className="md:w-4 md:h-4" /> : <ShoppingBag size={14} className="md:w-4 md:h-4" />}
                        {isAdded ? "Added To Wardrobe" : "Acquire Piece"}
                    </motion.button>
                    <button
                        onClick={() => addToWishlist(product)}
                        className={cn(
                            "w-12 h-12 md:w-14 md:h-14 flex items-center justify-center border transition-all duration-500",
                            isInWishlist(product.title) ? "bg-stone-900 border-stone-900 text-white" : "border-stone-200 text-stone-400 hover:border-stone-900 hover:text-stone-900"
                        )}
                        aria-label={isInWishlist(product.title) ? "Remove from wishlist" : "Add to wishlist"}
                    >
                        <Heart size={16} className={cn("md:w-[18px] md:h-[18px]", isInWishlist(product.title) && "fill-white")} />
                    </button>
                </div>
                <div className="flex items-center justify-between pt-4 md:pt-6">
                    <Link href={product.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 md:gap-2 text-[8px] md:text-[9px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-stone-400 hover:text-stone-950 transition-colors group">
                        <span className="hidden sm:inline">Journal de la Maison</span>
                        <span className="sm:hidden">Details</span>
                        <ArrowUpRight size={10} className="md:w-3 md:h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                    <button className="flex items-center gap-1.5 md:gap-2 text-[8px] md:text-[9px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-stone-400 hover:text-stone-950 transition-colors">
                        <Share2 size={10} className="md:w-3 md:h-3" /> Share
                    </button>
                </div>
            </div>
        </motion.div>
    </motion.div>
);

// --- Main Component ---

export default function QuickView({ product, isOpen, onClose }: QuickViewProps) {
    const { addToCart, addToWishlist, isInWishlist } = useStore();
    const [isAdded, setIsAdded] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!isOpen) {
            setIsAdded(false);
            return;
        }

        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${scrollBarWidth}px`;

        const timer = setTimeout(() => closeButtonRef.current?.focus(), 300);

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'Tab' && contentRef.current) {
                const focusables = contentRef.current.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                const first = focusables[0] as HTMLElement;
                const last = focusables[focusables.length - 1] as HTMLElement;
                if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
                else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = 'unset';
            document.body.style.paddingRight = '0';
            window.removeEventListener('keydown', handleKeyDown);
            clearTimeout(timer);
        };
    }, [isOpen, onClose]);

    if (!product) return null;

    const handleAcquire = () => {
        setIsAdded(true);
        addToCart(product);
        setTimeout(() => onClose(), 1200);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="quickview-title"
                    className="fixed inset-0 z-[500] flex items-stretch outline-none overflow-hidden select-none"
                    ref={contentRef}
                >
                    <motion.div
                        variants={overlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute inset-0 bg-stone-950/60 backdrop-blur-xl z-0"
                        onClick={onClose}
                    />

                    <div className="relative w-full h-full flex flex-col md:flex-row z-10">
                        <Visuals
                            imageUrl={product.imageUrl}
                            title={product.title}
                            onClose={onClose}
                            closeBtnRef={closeButtonRef}
                        />

                        <Editorial
                            product={product}
                            isAdded={isAdded}
                            onAdd={handleAcquire}
                            addToWishlist={addToWishlist}
                            isInWishlist={isInWishlist}
                        />
                    </div>

                    <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-[600] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                </div>
            )}
        </AnimatePresence>
    );
}
