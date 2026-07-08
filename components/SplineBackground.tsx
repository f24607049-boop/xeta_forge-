import React, { useState } from 'react';
import Spline from '@splinetool/react-spline';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Sparkles } from 'lucide-react';

const SplineBackground: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#090d16]">
      {/* Fallback ambient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#090d16] via-[#0d1527] to-[#111a2e]" />
      
      {/* Decorative background grid */}
      <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#0891b220_1px,transparent_1px),linear-gradient(to_bottom,#0891b220_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Spline 3D Scene Container */}
      {!hasError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 0.75 : 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute inset-0 w-full h-full flex items-center justify-center select-none pointer-events-none md:pointer-events-auto"
        >
          <Spline
            scene="https://prod.spline.design/QGDEiJI2JTHcfPwD/scene.splinecode"
            onLoad={() => setIsLoaded(true)}
            onError={() => {
              console.warn("Spline load failed. Using dynamic backup background.");
              setHasError(true);
            }}
          />
        </motion.div>
      )}

      {/* High-tech Loading Indicator */}
      <AnimatePresence>
        {!isLoaded && !hasError && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-[#090d16]/80 backdrop-blur-md z-10"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                {/* Rotating ring */}
                <div className="w-16 h-16 rounded-full border-2 border-cyan-500/10 border-t-cyan-400 animate-spin" />
                <Cpu className="w-6 h-6 text-cyan-400 absolute inset-0 m-auto animate-pulse" />
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span className="font-mono text-xs text-slate-300 tracking-[0.3em] font-bold uppercase animate-pulse">
                  Calibrating 3D Neural Mesh...
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cybernetic Grid / Scanning line overlays */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle vignette to focus attention on the content */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#090d16]/30 to-[#090d16]/90" />
        
        {/* Scan line effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_bottom,rgba(6,182,212,0)_97%,rgba(6,182,212,0.03)_97%)] bg-[size:100%_3px]" />
      </div>
    </div>
  );
};

export default SplineBackground;
