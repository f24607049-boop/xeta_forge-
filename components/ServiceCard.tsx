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
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onClick }) => {
  return (
    <motion.div
      className="group relative h-[400px] md:h-[500px] w-full overflow-hidden border-b lg:border-r border-white/10 bg-slate-950 cursor-pointer"
      initial="rest"
      whileHover="hover"
      whileTap="hover"
      animate="rest"
      data-hover="true"
      onClick={onClick}
    >
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
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20 group-hover:via-cyan-950/30 transition-colors duration-500" />
      </div>

      {/* Grid Pattern overlay for tech feel */}
      <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Overlay Info */}
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between pointer-events-none">
        <div className="flex justify-between items-start">
           <span className="text-xs font-mono border border-cyan-500/30 bg-cyan-950/50 text-cyan-400 px-3 py-1 rounded-full backdrop-blur-md font-semibold tracking-wider">
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
              rest: { opacity: 0, y: 10 },
              hover: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {service.tagline}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
