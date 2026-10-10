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
      className={`group relative h-[400px] md:h-[480px] w-full rounded-2xl p-[1px] bg-gradient-to-b from-cyan-500/35 via-white/10 to-cyan-500/20 hover:from-cyan-400/80 hover:via-cyan-500/30 hover:to-blue-500/60 transition-all duration-500 shadow-[0_8px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(6,182,212,0.06)] hover:shadow-[0_12px_40px_rgba(6,182,212,0.22)] cursor-pointer ${className}`}
      initial="rest"
      whileHover="hover"
      whileTap="hover"
      animate="rest"
      data-hover="true"
      onClick={onClick}
    >
      {/* Inner Card Container */}
      <div className="relative h-full w-full rounded-[15px] overflow-hidden bg-slate-950">
        {/* Top Luminous Edge Beam */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent opacity-75 group-hover:opacity-100 z-20 transition-opacity duration-500" />

        {/* Corner Tech Accents */}
        <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-cyan-400/40 group-hover:border-cyan-400 transition-colors duration-300 z-20 pointer-events-none rounded-tl-sm" />
        <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-cyan-400/40 group-hover:border-cyan-400 transition-colors duration-300 z-20 pointer-events-none rounded-tr-sm" />
        <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-cyan-400/40 group-hover:border-cyan-400 transition-colors duration-300 z-20 pointer-events-none rounded-bl-sm" />
        <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-cyan-400/40 group-hover:border-cyan-400 transition-colors duration-300 z-20 pointer-events-none rounded-br-sm" />

        {/* Image Background with Zoom */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.img 
            src={service.image} 
            alt={service.title} 
            className="h-full w-full object-cover will-change-transform"
            variants={{
              rest: { scale: 1, opacity: 0.65, filter: 'grayscale(40%) contrast(1.05)' },
              hover: { scale: 1.08, opacity: 0.9, filter: 'grayscale(0%) contrast(1.15)' }
            }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-slate-950/20 group-hover:via-cyan-950/30 transition-colors duration-500" />
        </div>

        {/* Grid Pattern overlay for tech feel */}
        <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

        {/* Subtle Inner Frame Hairline */}
        <div className="absolute inset-2.5 rounded-xl border border-white/5 group-hover:border-cyan-400/20 transition-colors duration-500 pointer-events-none z-10" />

        {/* Overlay Info */}
        <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between pointer-events-none z-20">
          <div className="flex justify-between items-start">
             <span className="text-xs font-mono border border-cyan-500/30 bg-cyan-950/60 text-cyan-400 px-3 py-1 rounded-full backdrop-blur-md font-semibold tracking-wider shadow-[0_0_12px_rgba(6,182,212,0.15)]">
               {service.statusTag}
             </span>
             <motion.div
               variants={{
                 rest: { opacity: 0, x: 20, y: -20 },
                 hover: { opacity: 1, x: 0, y: 0 }
               }}
               className="bg-cyan-500 text-slate-950 rounded-full p-2.5 will-change-transform shadow-[0_0_15px_rgba(6,182,212,0.5)]"
             >
               <ArrowUpRight className="w-5 h-5 font-bold" />
             </motion.div>
          </div>

          <div>
            <div className="overflow-hidden">
              <motion.h3 
                className="font-heading text-2xl md:text-3xl font-bold uppercase text-white tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] will-change-transform"
                variants={{
                  rest: { y: 0 },
                  hover: { y: -5 }
                }}
                transition={{ duration: 0.4 }}
              >
                {service.title}
              </motion.h3>
            </div>
            <motion.p 
              className="text-xs font-mono uppercase tracking-widest text-cyan-400 mt-2 font-bold will-change-transform"
              variants={{
                rest: { opacity: 0.75, y: 4 },
                hover: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.4, delay: 0.05 }}
            >
              {service.tagline}
            </motion.p>
          </div>
        </div>

        {/* Bottom Animated Cyan Laser Bar */}
        <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out z-20" />
      </div>
    </motion.div>
  );
};

export default ServiceCard;
