'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);

            // Show only when moving mouse inside window
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        window.addEventListener('mousemove', moveCursor);
        document.body.addEventListener('mouseenter', handleMouseEnter);
        document.body.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.body.removeEventListener('mouseenter', handleMouseEnter);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [cursorX, cursorY, isVisible]);

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full border border-stone-800 pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    translateX: cursorXSpring,
                    translateY: cursorYSpring,
                    opacity: isVisible ? 1 : 0
                }}
            />
            <motion.div
                className="fixed top-0 left-0 w-1 h-1 bg-stone-800 rounded-full pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    translateX: useSpring(useMotionValue(-100), { damping: 50, stiffness: 1000 }), // Simplified logic for dot to follow slightly different path if wanted, or just reuse variables
                    left: 0,
                    top: 0,
                    x: cursorX, // Using raw value for instant follow
                    y: cursorY, // But adding offset for centering if needed, though cursorX/Y are top-left based. w=8 h=8. center is +4. 
                    // Let's just create one circle for now to keep it clean.
                    display: 'none'
                }}
            />
        </>
    );
}
