/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface XetaForgeLogoProps {
  variant?: 'navbar' | 'card' | 'about' | 'footer' | 'icon';
  className?: string;
}

export const XetaForgeEmblem: React.FC<{ className?: string }> = ({
  className = 'w-9 h-9',
}) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <circle
      cx="32"
      cy="32"
      r="30"
      fill="#FBF7F0"
      stroke="rgba(78, 109, 81, 0.28)"
      strokeWidth="1.5"
    />
    <path
      d="M19 21L30 32L19 43"
      stroke="#262A24"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M34 43L23 32L34 21H45"
      stroke="#4E6D51"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M33 32H43"
      stroke="#B24E30"
      strokeWidth="2.6"
      strokeLinecap="round"
    />
    <path
      d="M46 16L47.1 18.9L50 20L47.1 21.1L46 24L44.9 21.1L42 20L44.9 18.9L46 16Z"
      fill="#B24E30"
    />
  </svg>
);

export const XetaForgeLogo: React.FC<XetaForgeLogoProps> = ({
  variant = 'navbar',
  className = '',
}) => {
  if (variant === 'icon') {
    return <XetaForgeEmblem className={className} />;
  }

  if (variant === 'card') {
    return (
      <div className={`inline-flex items-center gap-3.5 ${className}`}>
        <XetaForgeEmblem className="w-12 h-12 shrink-0 shadow-xs rounded-full" />
        <div className="flex flex-col text-left">
          <span className="font-sans text-xs font-semibold tracking-[0.2em] text-[#262A24] uppercase">
            XETA FORGE
          </span>
          <span className="text-[11px] text-[#4D5549] leading-snug mt-0.5">
            Websites &amp; smart tools.
            <br />
            Made simple for business.
          </span>
        </div>
      </div>
    );
  }

  if (variant === 'about') {
    return (
      <div className={`inline-flex flex-col items-center gap-2 ${className}`}>
        <XetaForgeEmblem className="w-14 h-14 shadow-xs rounded-full" />
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`inline-flex items-center gap-3 ${className}`}>
        <XetaForgeEmblem className="w-9 h-9 shrink-0 rounded-full" />
        <div className="flex flex-col text-left">
          <span className="font-sans text-sm font-semibold tracking-[0.16em] text-[#262A24] uppercase">
            XETA FORGE
          </span>
          <span className="text-[11px] text-[#4D5549]">
            Websites, Mobile Apps &amp; Helpful AI
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2.5 group whitespace-nowrap shrink-0 ${className}`}>
      <XetaForgeEmblem className="w-8 h-8 shrink-0 rounded-full transition-transform duration-200 group-hover:scale-105" />
      <span className="font-sans text-sm font-semibold tracking-[0.16em] text-[#262A24] uppercase">
        XETA FORGE
      </span>
    </div>
  );
};

export default XetaForgeLogo;
