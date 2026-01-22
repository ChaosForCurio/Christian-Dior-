'use client';

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-stone-50 z-[9999] flex flex-col items-center justify-center">
      <div className="relative">
        <div className="w-24 h-[1px] bg-stone-200" />
        <div className="absolute inset-0 w-24 h-[1px] bg-stone-900 animate-loading-bar" />
      </div>
      <p className="mt-6 text-[10px] uppercase tracking-[0.4em] text-stone-400 animate-pulse">
        Loading Dior Universe
      </p>

      <style jsx global>{`
        @keyframes loading-bar {
          0% { transform: scaleX(0); transform-origin: left; }
          45% { transform: scaleX(1); transform-origin: left; }
          55% { transform: scaleX(1); transform-origin: right; }
          100% { transform: scaleX(0); transform-origin: right; }
        }
        .animate-loading-bar {
          animation: loading-bar 2s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }
      `}</style>
    </div>
  );
}
