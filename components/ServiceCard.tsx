/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';
import { Service } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
  onClick: () => void;
  className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onClick, className = '' }) => {
  return (
    <motion.div
      className={`group relative h-[340px] sm:h-[400px] md:h-[480px] w-full rounded-2xl p-[1px] bg-gradient-to-b from-cyan-500/35 via-white/10 to-cyan-500/20 hover:from-cyan-400/80 hover:via-cyan-500/30 hover:to-blue-500/60 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(6,182,212,0.06)] hover:shadow-[0_12px_40px_rgba(6,182,212,0.22)] cursor-pointer select-none ${className}`}
      initial="rest"
      whileHover="hover"
      whileTap="hover"
      animate="rest"
      data-hover="true"
      onClick={onClick}
    >
      {/* Inner Card Container */}
      <div className="relative h-full w-full rounded-[15px] overflow-hidden bg-slate-950/60 backdrop-blur-2xl">
        {/* Top Luminous Specular Edge Beam */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-80 group-hover:via-cyan-300 group-hover:opacity-100 z-20 transition-opacity duration-300" />

        {/* Corner Tech Accents */}
        <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 w-2.5 h-2.5 sm:w-3 sm:h-3 border-t-2 border-l-2 border-white/40 group-hover:border-cyan-300 transition-colors duration-300 z-20 pointer-events-none rounded-tl-sm" />
        <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-2.5 h-2.5 sm:w-3 sm:h-3 border-t-2 border-r-2 border-white/40 group-hover:border-cyan-300 transition-colors duration-300 z-20 pointer-events-none rounded-tr-sm" />
        <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 w-2.5 h-2.5 sm:w-3 sm:h-3 border-b-2 border-l-2 border-white/40 group-hover:border-cyan-300 transition-colors duration-300 z-20 pointer-events-none rounded-bl-sm" />
        <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 w-2.5 h-2.5 sm:w-3 sm:h-3 border-b-2 border-r-2 border-white/40 group-hover:border-cyan-300 transition-colors duration-300 z-20 pointer-events-none rounded-br-sm" />

        {/* Image Background with Zoom */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.img 
            src={service.image} 
            alt={service.title} 
            loading="lazy"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover will-change-transform"
            variants={{
              rest: { scale: 1, opacity: 0.55, filter: 'grayscale(25%) contrast(1.05)' },
              hover: { scale: 1.08, opacity: 0.8, filter: 'grayscale(0%) contrast(1.12)' }
            }}
            transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-white/[0.04] group-hover:via-cyan-950/25 transition-colors duration-300" />
        </div>

        {/* Diagonal Glass Sheen Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.02)_45%,transparent_100%)] pointer-events-none z-10" />

        {/* Subtle Inner Frame Hairline */}
        <div className="absolute inset-2 sm:inset-2.5 rounded-xl border border-white/15 group-hover:border-cyan-300/35 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] transition-colors duration-300 pointer-events-none z-10" />

        {/* Overlay Info with Frosted Glass Prism Panel */}
        <div className="absolute inset-0 p-4 sm:p-5 md:p-7 flex flex-col justify-between pointer-events-none z-20">
          <div className="flex justify-between items-start">
             <span className="text-[11px] sm:text-xs font-mono border border-white/25 bg-white/10 text-cyan-300 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-xl backdrop-blur-xl font-semibold tracking-wider shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_4px_15px_rgba(0,0,0,0.3)]">
               {service.statusTag}
             </span>
             <motion.div
               variants={{
                 rest: { opacity: 0.85, scale: 0.95 },
                 hover: { opacity: 1, scale: 1.08 }
               }}
               className="bg-white/15 group-hover:bg-cyan-400 text-white group-hover:text-slate-950 border border-white/30 group-hover:border-cyan-200 backdrop-blur-xl rounded-full p-2 sm:p-2.5 will-change-transform shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_0_15px_rgba(6,182,212,0.35)] transition-colors duration-300"
             >
               <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 font-bold" />
             </motion.div>
          </div>

          <div className="p-3.5 sm:p-5 rounded-2xl bg-white/[0.08] group-hover:bg-white/[0.13] backdrop-blur-xl border border-white/20 group-hover:border-cyan-300/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.28),0_10px_30px_rgba(0,0,0,0.45)] transition-all duration-300">
            <div className="overflow-hidden">
              <motion.h3 
                className="font-heading text-lg sm:text-xl md:text-2xl font-bold uppercase text-white tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] will-change-transform"
                variants={{
                  rest: { y: 0 },
                  hover: { y: -2 }
                }}
                transition={{ duration: 0.2 }}
              >
                {service.title}
              </motion.h3>
            </div>
            <p className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-cyan-300 mt-1.5 sm:mt-2 font-bold">
              {service.tagline}
            </p>
          </div>
        </div>

        {/* Bottom Animated Cyan Laser Bar */}
        <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out z-20" />
      </div>
    </motion.div>
  );
};

export default ServiceCard;
