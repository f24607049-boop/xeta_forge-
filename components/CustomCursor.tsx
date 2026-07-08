/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  
  // Initialize off-screen to prevent flash
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  // Smooth spring animation for high-precision cursor lag
  const springConfig = { damping: 25, stiffness: 400, mass: 0.15 }; 
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      const clickable = target.closest('button') || 
                        target.closest('a') || 
                        target.closest('[data-hover="true"]') ||
                        target.closest('select') ||
                        target.closest('input') ||
                        target.closest('textarea');
      setIsHovering(!!clickable);
    };

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Outer Glowing Brand Ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none flex items-center justify-center hidden md:flex will-change-transform"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      >
        <motion.div
          className="relative rounded-full border border-cyan-400/50 bg-cyan-500/5 flex items-center justify-center"
          style={{ width: 44, height: 44 }}
          animate={{
            scale: isHovering ? 2.0 : 1,
            borderColor: isHovering ? 'rgba(6, 182, 212, 1)' : 'rgba(6, 182, 212, 0.4)',
            backgroundColor: isHovering ? 'rgba(6, 182, 212, 0.1)' : 'rgba(6, 182, 212, 0.02)',
            boxShadow: isHovering ? '0 0 20px rgba(6, 182, 212, 0.5)' : '0 0 0px rgba(6, 182, 212, 0)',
          }}
          transition={{ type: "spring", stiffness: 350, damping: 22 }}
        >
          {/* Subtle tech crosshair lines inside cursor during hover */}
          {isHovering && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-full h-[1px] bg-cyan-400 absolute" />
              <div className="h-full w-[1px] bg-cyan-400 absolute" />
            </motion.div>
          )}

          {/* Action text inside the expanded cursor */}
          <motion.span 
            className="z-10 text-cyan-400 font-mono font-black uppercase tracking-[0.15em] text-[8px] overflow-hidden whitespace-nowrap pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: isHovering ? 1 : 0,
            }}
            transition={{ duration: 0.15 }}
          >
            Xeta
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Inner Brand Dot - Realtime immediate tracking */}
      <motion.div
        className="fixed top-0 left-0 z-[10000] pointer-events-none hidden md:block w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)] will-change-transform"
        style={{ 
          x: mouseX, 
          y: mouseY, 
          translateX: '-50%', 
          translateY: '-50%' 
        }}
        animate={{
          scale: isHovering ? 0.5 : 1,
          backgroundColor: isHovering ? '#3b82f6' : '#22d3ee', // transitions cyan to electric blue
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
};

export default CustomCursor;