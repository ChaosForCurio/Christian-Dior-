'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  const letters = "DIOR".split("");

  return (
    <div className="fixed inset-0 bg-stone-50 z-[9999] flex flex-col items-center justify-center select-none">
      <div className="flex gap-4 mb-8">
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{
              opacity: [0, 1, 0.2, 1],
              scale: [1.2, 1, 1.1, 1],
              filter: ["blur(10px)", "blur(0px)", "blur(2px)", "blur(0px)"]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
            className="font-serif text-3xl md:text-5xl text-stone-900 tracking-tighter"
          >
            {letter}
          </motion.span>
        ))}
      </div>

      <div className="relative w-48 h-[1px] bg-stone-200 overflow-hidden">
        <motion.div
          animate={{
            x: ["-100%", "100%"]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: [0.65, 0, 0.35, 1]
          }}
          className="absolute inset-0 w-full h-full bg-stone-900"
        />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mt-8 text-[9px] uppercase tracking-[0.5em] text-stone-900 font-light"
      >
        Curating Your Experience
      </motion.p>

      {/* Aesthetic Accents */}
      <div className="absolute top-1/2 left-12 h-[1px] w-12 bg-stone-200" />
      <div className="absolute top-1/2 right-12 h-[1px] w-12 bg-stone-200" />
    </div>
  );
}
