/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Service } from '../types';
import ServiceVisual from './ServiceVisual';

interface ServiceModalProps {
  service: Service;
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
  onDiscuss: (serviceTitle: string) => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  onClose,
  onNavigate,
  onDiscuss,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') onNavigate('prev');
      if (e.key === 'ArrowRight') onNavigate('next');
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNavigate]);

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#262A24]/55"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-[28px] frosted-glass overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        {/* Top Modal Controls */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3">
          <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#4E6D51]">
            {service.category}
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onNavigate('prev')}
              className="p-2 rounded-full btn-cream cursor-pointer"
              aria-label="Previous Service"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('next')}
              className="p-2 rounded-full btn-cream cursor-pointer"
              aria-label="Next Service"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full btn-cream cursor-pointer"
              aria-label="Close Modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Visual Header */}
        <div className="px-6">
          <ServiceVisual
            visualId={service.visualId}
            image={service.image}
            imageAlt={service.imageAlt}
            eager
          />
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-5">
          <div>
            <h2
              id="service-modal-title"
              className="font-heading text-3xl sm:text-4xl font-semibold text-[#262A24] tracking-tight"
            >
              {service.title}
            </h2>
            <p className="text-sm sm:text-base text-[#4D5549] leading-relaxed mt-3">
              {service.description}
            </p>
          </div>

          <div>
            <div className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#4E6D51] mb-3">
              What Is Included
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl studio-chip text-xs text-[#262A24]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#4E6D51] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#262A24]/10">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#4D5549]">
                What You Receive
              </div>
              <div className="text-xs font-medium text-[#262A24] mt-0.5">
                {service.deliverable}
              </div>
            </div>

            <button
              onClick={() => onDiscuss(service.title)}
              className="btn-terracotta px-6 py-3 rounded-full text-xs font-semibold tracking-wide inline-flex items-center justify-center gap-2 cursor-pointer shrink-0 whitespace-nowrap"
            >
              Ask About This Service
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
