/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface XetaForgeLogoProps {
  variant?: 'navbar' | 'card' | 'about' | 'footer' | 'icon';
  className?: string;
}

export const LOGO_IMAGE_SRC =
  '/assets/aistudio/WhatsApp_Image_2026-11-24_at_1.44.08_PM_8a501e78.jpeg';

export const XetaForgeEmblem: React.FC<{ className?: string }> = ({
  className = 'w-9 h-9',
}) => (
  <span
    className={`inline-flex items-center justify-center rounded-full overflow-hidden bg-[#0A101E] ring-1 ring-[#155EEF]/45 shadow-[0_2px_10px_-2px_rgba(21,94,239,0.45)] ${className}`}
  >
    <img
      src={LOGO_IMAGE_SRC}
      alt="Xeta Forge Logo"
      width={64}
      height={64}
      decoding="async"
      referrerPolicy="no-referrer"
      className="w-full h-full object-cover object-center scale-[1.12]"
    />
  </span>
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
        <XetaForgeEmblem className="w-12 h-12 shrink-0" />
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
        <XetaForgeEmblem className="w-16 h-16" />
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`inline-flex items-center gap-3 ${className}`}>
        <XetaForgeEmblem className="w-10 h-10 shrink-0" />
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
      <XetaForgeEmblem className="w-9 h-9 shrink-0 transition-transform duration-200 group-hover:scale-105" />
      <span className="font-sans text-sm font-semibold tracking-[0.16em] text-[#262A24] uppercase">
        XETA FORGE
      </span>
    </div>
  );
};

export default XetaForgeLogo;
