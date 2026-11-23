/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ServiceVisualId } from '../types';
import { Bot, Code2, Cpu, Smartphone, Workflow } from 'lucide-react';

interface ServiceVisualProps {
  visualId: ServiceVisualId;
  image?: string;
  imageAlt?: string;
  compact?: boolean;
  eager?: boolean;
}

const FALLBACK_ICONS: Record<ServiceVisualId, React.ElementType> = {
  web: Code2,
  automation: Workflow,
  chatbot: Bot,
  mobile: Smartphone,
  training: Cpu,
};

export const ServiceVisual: React.FC<ServiceVisualProps> = ({
  visualId,
  image,
  imageAlt = 'Xeta Forge Service Preview',
  compact = false,
  eager = false,
}) => {
  const [imgFailed, setImgFailed] = useState(false);
  const heightClass = compact ? 'h-48 sm:h-52' : 'h-64 sm:h-72';
  const FallbackIcon = FALLBACK_ICONS[visualId];

  if (!image || imgFailed) {
    return (
      <div
        className={`relative w-full ${heightClass} rounded-2xl overflow-hidden border border-[#4E6D51]/15 bg-[#F2EDE3] flex flex-col items-center justify-center p-6 text-center`}
      >
        <span className="w-12 h-12 rounded-full terracotta-medallion flex items-center justify-center text-white mb-3">
          <FallbackIcon className="w-6 h-6" />
        </span>
        <span className="text-xs font-medium text-[#4D5549]">{imageAlt}</span>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full ${heightClass} rounded-2xl overflow-hidden border border-[#4E6D51]/15 bg-[#EFE6D8]`}
    >
      <img
        src={image}
        alt={imageAlt}
        width={800}
        height={600}
        decoding="async"
        referrerPolicy="no-referrer"
        loading={eager ? 'eager' : 'lazy'}
        onError={() => setImgFailed(true)}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default ServiceVisual;
