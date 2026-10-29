import React, { useState, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Cpu } from 'lucide-react';

// Lazy load the heavy Spline runtime so initial page paint is instantaneous (<100ms)
const Spline = lazy(() => import('@splinetool/react-spline'));

const SplineBackground: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#060a14] pointer-events-none">
      {/* High-performance instant ambient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#060a14] via-[#0b1528] to-[#0f172a]" />
      
      {/* Luminous Ambient Orbs for Glassmorphism Refraction */}
      <div className="absolute top-[-10%] left-[-5%] w-[60vw] h-[60vw] max-w-[620px] max-h-[620px] rounded-full bg-cyan-500/20 blur-[90px] sm:blur-[120px] pointer-events-none transform-gpu" />
      <div className="absolute bottom-[-12%] right-[-5%] w-[65vw] h-[65vw] max-w-[680px] max-h-[680px] rounded-full bg-blue-600/20 blur-[100px] sm:blur-[130px] pointer-events-none transform-gpu" />
      <div className="absolute top-[35%] left-[55%] w-[45vw] h-[45vw] max-w-[480px] max-h-[480px] rounded-full bg-indigo-500/15 blur-[80px] sm:blur-[110px] pointer-events-none transform-gpu" />

      {/* Decorative background grid with responsive sizing */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#22d3ee18_1px,transparent_1px),linear-gradient(to_bottom,#22d3ee18_1px,transparent_1px)] bg-[size:32px_32px] sm:bg-[size:48px_48px] pointer-events-none" />

      {/* Spline 3D Scene - Stream loaded in background with zero UI freeze */}
      {!hasError && (
        <Suspense fallback={null}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 0.95 : 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute inset-0 w-full h-full flex items-center justify-center select-none pointer-events-none md:pointer-events-auto overflow-hidden"
            style={{ touchAction: 'pan-y' }}
          >
            <div className="w-full h-full flex items-center justify-center origin-center transform-gpu scale-[0.60] sm:scale-[0.78] lg:scale-100 -translate-y-4 sm:translate-y-0 transition-transform duration-500 ease-out pointer-events-none md:pointer-events-auto">
              <Spline
                scene="https://prod.spline.design/QGDEiJI2JTHcfPwD/scene.splinecode"
                onLoad={() => setIsLoaded(true)}
                onError={() => {
                  console.warn("Spline load failed. Using dynamic ambient background.");
                  setHasError(true);
                }}
              />
            </div>
          </motion.div>
        </Suspense>
      )}

      {/* Non-intrusive subtle background loading indicator - NEVER blocks the user */}
      <AnimatePresence>
        {!isLoaded && !hasError && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4 }}
            className="hidden sm:flex absolute bottom-5 left-5 z-20 items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/60 backdrop-blur-md border border-cyan-500/25 shadow-lg pointer-events-none"
          >
            <div className="relative w-3.5 h-3.5">
              <div className="w-3.5 h-3.5 rounded-full border border-cyan-400/40 border-t-cyan-300 animate-spin" />
              <Cpu className="w-2 h-2 text-cyan-400 absolute inset-0 m-auto" />
            </div>
            <span className="font-mono text-[10px] text-cyan-300/80 tracking-wider uppercase">
              Streaming 3D Canvas
            </span>
            <Sparkles className="w-2.5 h-2.5 text-cyan-400 animate-pulse" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cybernetic Grid / Scanning line overlays */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle vignette to focus attention on content */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#090d16]/30 to-[#090d16]/90" />
        
        {/* Scan line effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_bottom,rgba(6,182,212,0)_97%,rgba(6,182,212,0.03)_97%)] bg-[size:100%_3px]" />
      </div>
    </div>
  );
};

export default SplineBackground;
