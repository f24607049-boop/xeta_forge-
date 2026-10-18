import React, { useId } from 'react';

interface XetaForgeLogoProps {
  variant?: 'navbar' | 'hero' | 'footer' | 'about' | 'icon';
  className?: string;
  iconSize?: number;
}

export const XetaForgeEmblem: React.FC<{ size?: number; className?: string }> = ({
  size = 38,
  className = '',
}) => {
  const uid = useId().replace(/:/g, '');

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
      aria-label="XETA FORGE Emblem"
    >
      <defs>
        {/* Soft Environment-Matched Cyan Glow */}
        <filter id={`cyanGlow-${uid}`} x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Subtle Depth Shadow (Translucent, not heavy black) */}
        <filter id={`softDepth-${uid}`} x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#06b6d4" floodOpacity="0.22" />
        </filter>

        {/* Luminous Electric Cyan (Matches text-cyan-300 / #67e8f9 & #22d3ee) */}
        <linearGradient id={`cyanLuminous-${uid}`} x1="75" y1="75" x2="390" y2="425" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ecfeff" />
          <stop offset="28%" stopColor="#67e8f9" />
          <stop offset="65%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>

        {/* Deep Cyan-Indigo Bevel (Matches glass-button-primary) */}
        <linearGradient id={`cyanBevel-${uid}`} x1="115" y1="145" x2="270" y2="360" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="52%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#3730a3" />
        </linearGradient>

        {/* Liquid Platinum & White Specular (Matches Glassmorphism Rims) */}
        <linearGradient id={`platinumBright-${uid}`} x1="220" y1="135" x2="430" y2="335" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="45%" stopColor="#f1f5f9" />
          <stop offset="82%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#67e8f9" />
        </linearGradient>

        {/* Cool Frosted Silver Bevel */}
        <linearGradient id={`platinumBevel-${uid}`} x1="250" y1="190" x2="405" y2="365" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="55%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>

        {/* Orbital Swoosh Gradient */}
        <linearGradient id={`swooshGrad-${uid}`} x1="105" y1="415" x2="375" y2="105" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="38%" stopColor="#06b6d4" />
          <stop offset="75%" stopColor="#67e8f9" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
      </defs>

      <g filter={`url(#softDepth-${uid})`}>
        {/* Subtle Inner Glass Ring Guide */}
        <circle
          cx="250"
          cy="250"
          r="184"
          stroke="#67e8f9"
          strokeOpacity="0.18"
          strokeWidth="1.5"
        />

        {/* OUTER ORBITAL RING - LEFT & BOTTOM LUMINOUS CYAN ARC */}
        <path
          d="M 242 46 A 204 204 0 1 0 368 416 L 355 400 A 184 184 0 1 1 242 66 Z"
          fill={`url(#cyanLuminous-${uid})`}
          filter={`url(#cyanGlow-${uid})`}
        />

        {/* OUTER ORBITAL RING - TOP RIGHT PLATINUM GLASS ARC */}
        <path
          d="M 258 46 A 204 204 0 0 1 446 306 L 427 300 A 184 184 0 0 0 258 66 Z"
          fill={`url(#platinumBright-${uid})`}
        />

        {/* TOP ORBITAL SWOOSH STREAM */}
        <path
          d="M 230 178 C 272 124, 332 94, 364 110 C 380 119, 376 144, 358 164 L 336 164 C 349 148, 353 132, 342 126 C 320 115, 272 140, 230 178 Z"
          fill={`url(#swooshGrad-${uid})`}
        />
        <path
          d="M 232 176 C 273 125, 332 96, 363 111"
          stroke="#ecfeff"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* BOTTOM-LEFT ORBITAL SWOOSH STREAM */}
        <path
          d="M 118 370 C 96 400, 104 426, 136 426 C 174 426, 228 396, 272 348 C 232 382, 180 404, 148 402 C 127 400, 125 385, 139 370 Z"
          fill={`url(#swooshGrad-${uid})`}
        />
        <path
          d="M 108 412 C 134 430, 198 410, 270 350"
          stroke="#a5f3fc"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />

        {/* LEFT CYAN 'X' CHEVRON (Precision 45-deg Isometric Geometry) */}
        <polygon
          points="116,148 180,148 274,250 180,352 116,352 210,250"
          fill={`url(#cyanBevel-${uid})`}
        />
        <polygon
          points="116,148 180,148 274,250 246,250 166,164 132,164"
          fill={`url(#cyanLuminous-${uid})`}
        />
        <polyline
          points="118,148 179,148 272,250 179,351"
          stroke="#ecfeff"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* RIGHT PLATINUM 'F' & 'X' INTERLOCKING BLADES */}
        {/* 1. Top Blade (Upper-Right X Arm + Top Bar of F) */}
        <polygon
          points="252,216 314,148 438,148 404,186 330,186 284,236"
          fill={`url(#platinumBright-${uid})`}
        />
        <polygon
          points="284,236 330,186 404,186 395,196 334,196 292,243"
          fill={`url(#platinumBevel-${uid})`}
        />

        {/* 2. Middle Blade (Center Bar of F) */}
        <polygon
          points="286,258 324,216 398,216 366,252 332,252 310,276"
          fill={`url(#platinumBright-${uid})`}
        />
        <polygon
          points="310,276 332,252 366,252 358,261 335,261 317,282"
          fill={`url(#platinumBevel-${uid})`}
        />

        {/* 3. Lower Blade (Lower-Right Leg of X) */}
        <polygon
          points="252,284 284,250 378,352 314,352"
          fill={`url(#platinumBright-${uid})`}
        />
        <polygon
          points="252,284 266,269 342,352 314,352"
          fill={`url(#platinumBevel-${uid})`}
        />

        {/* Crisp Specular Glass Highlights */}
        <polyline
          points="253,216 314,149 436,149"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <polyline
          points="287,258 324,217 396,217"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </g>
    </svg>
  );
};

const XetaForgeLogo: React.FC<XetaForgeLogoProps> = ({
  variant = 'navbar',
  className = '',
  iconSize,
}) => {
  if (variant === 'icon') {
    return <XetaForgeEmblem size={iconSize || 36} className={className} />;
  }

  // Hero Crest Variant: Sleek translucent glass medallion that sits naturally above the Hero headline without blocking the 3D Robot
  if (variant === 'hero') {
    return (
      <div
        className={`inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.28),0_4px_20px_rgba(6,182,212,0.15)] select-none ${className}`}
      >
        <XetaForgeEmblem
          size={iconSize || 28}
          className="drop-shadow-[0_0_10px_rgba(103,232,249,0.45)]"
        />
        <span className="font-heading text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
          XET&#923; FORGE
        </span>
        <span className="text-white/25 text-xs" aria-hidden="true">
          ·
        </span>
        <span className="text-[10px] sm:text-xs font-mono text-cyan-300 tracking-[0.2em] uppercase">
          Next-Gen AI &amp; Web Engineering
        </span>
      </div>
    );
  }

  // About Page Crest Variant: Balanced glassmorphic studio emblem
  if (variant === 'about') {
    return (
      <div className={`inline-flex flex-col items-center select-none ${className}`}>
        <div className="w-16 h-16 rounded-2xl bg-white/[0.05] border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_8px_28px_rgba(6,182,212,0.2)] flex items-center justify-center mb-3">
          <XetaForgeEmblem
            size={iconSize || 46}
            className="drop-shadow-[0_2px_12px_rgba(103,232,249,0.4)]"
          />
        </div>
      </div>
    );
  }

  // Footer Variant: Harmonized with the bottom glass-nav surface
  if (variant === 'footer') {
    return (
      <div className={`inline-flex items-center gap-3 select-none group ${className}`}>
        <div className="w-11 h-11 rounded-xl bg-white/[0.05] border border-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] flex items-center justify-center shrink-0 group-hover:border-cyan-300/40 transition-colors">
          <XetaForgeEmblem
            size={iconSize || 34}
            className="drop-shadow-[0_2px_10px_rgba(103,232,249,0.35)]"
          />
        </div>
        <div className="flex flex-col justify-center">
          <div className="font-heading text-base md:text-lg font-bold tracking-[0.14em] leading-none flex items-center gap-1.5">
            <span className="bg-gradient-to-r from-white via-slate-100 to-cyan-200 bg-clip-text text-transparent">
              XET&#923;
            </span>
            <span className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              FORGE
            </span>
          </div>
          <div className="mt-1.5 text-[9px] font-mono tracking-[0.24em] uppercase flex items-center gap-1.5 text-slate-300">
            <span className="text-cyan-300">BUILD</span>
            <span className="text-white/30">·</span>
            <span className="text-slate-200">SCALE</span>
            <span className="text-white/30">·</span>
            <span className="text-cyan-300">AUTOMATE</span>
          </div>
        </div>
      </div>
    );
  }

  // Default: 'navbar' variant — Compact, proportional, and naturally blended into .glass-nav
  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 select-none group ${className}`}>
      <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/[0.06] border border-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.28),0_4px_14px_rgba(6,182,212,0.18)] flex items-center justify-center shrink-0 group-hover:border-cyan-300/50 group-hover:bg-white/[0.1] transition-all duration-200">
        <XetaForgeEmblem
          size={iconSize || 30}
          className="transition-transform duration-200 group-hover:scale-105 drop-shadow-[0_0_8px_rgba(103,232,249,0.4)]"
        />
      </div>
      <div className="flex flex-col justify-center">
        <div className="font-heading text-sm sm:text-base md:text-[17px] font-bold tracking-[0.14em] leading-none flex items-center gap-1.5">
          <span className="bg-gradient-to-r from-white via-slate-100 to-cyan-100 bg-clip-text text-transparent">
            XET&#923;
          </span>
          <span className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            FORGE
          </span>
        </div>
        <div className="mt-1 text-[7.5px] sm:text-[8px] font-mono tracking-[0.24em] uppercase flex items-center gap-1 text-slate-300/90">
          <span className="text-cyan-300">BUILD</span>
          <span className="text-white/30">·</span>
          <span>SCALE</span>
          <span className="text-white/30">·</span>
          <span className="text-cyan-300">AUTOMATE</span>
        </div>
      </div>
    </div>
  );
};

export default XetaForgeLogo;
