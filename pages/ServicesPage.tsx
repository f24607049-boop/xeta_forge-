/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { PageId, Service } from '../types';
import { SERVICES } from '../data/studioData';
import ServiceVisual from '../components/ServiceVisual';

interface ServicesPageProps {
  onSelectService: (service: Service) => void;
  onNavigate: (page: PageId) => void;
}

const ServicesPage: React.FC<ServicesPageProps> = ({
  onSelectService,
  onNavigate,
}) => {
  const leadService = SERVICES[0];
  const secondaryServices = SERVICES.slice(1);

  return (
    <section className="pt-28 sm:pt-36 pb-20 px-4 sm:px-6 max-w-7xl mx-auto w-full space-y-10">
      {/* Header Panel */}
      <div className="frosted-glass rounded-[28px] p-7 sm:p-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#4E6D51]">
            What We Offer
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-semibold text-[#262A24] tracking-tight">
            Services Explained Simply
          </h1>
        </div>
        <p className="max-w-md text-sm text-[#4D5549] leading-relaxed">
          Whether you need a fresh website, a mobile app, or smart tools that
          handle busywork for you, click any service card below to see what is
          included.
        </p>
      </div>

      {/* Lead Featured Service Card */}
      <div
        onClick={() => onSelectService(leadService)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onSelectService(leadService)}
        className="studio-card rounded-[28px] p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center cursor-pointer group"
      >
        <div className="lg:col-span-6">
          <ServiceVisual
            visualId={leadService.visualId}
            image={leadService.image}
            imageAlt={leadService.imageAlt}
            eager
          />
        </div>
        <div className="lg:col-span-6 space-y-4">
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#4E6D51]">
            {leadService.category}
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-[#262A24] group-hover:text-[#B24E30] transition-colors">
            {leadService.title}
          </h2>
          <p className="text-sm sm:text-base text-[#4D5549] leading-relaxed">
            {leadService.description}
          </p>
          <ul className="space-y-2 pt-1">
            {leadService.features.slice(0, 3).map((feat, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-[#262A24]"
              >
                <CheckCircle2 className="w-4 h-4 text-[#4E6D51] shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
          <div className="pt-3 inline-flex items-center gap-2 text-xs font-semibold text-[#B24E30]">
            See full details
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Remaining 4 Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {secondaryServices.map((service) => (
          <button
            key={service.id}
            type="button"
            onClick={() => onSelectService(service)}
            className="studio-card rounded-[26px] p-6 text-left flex flex-col justify-between gap-5 cursor-pointer group"
          >
            <div className="space-y-4">
              <ServiceVisual
                visualId={service.visualId}
                image={service.image}
                imageAlt={service.imageAlt}
                compact
              />
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4E6D51] mb-1">
                  {service.category}
                </div>
                <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-[#262A24] group-hover:text-[#B24E30] transition-colors">
                  {service.title}
                </h2>
                <p className="text-sm text-[#4D5549] leading-relaxed mt-2">
                  {service.description}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#262A24]/10 flex items-center justify-between text-xs font-semibold text-[#262A24]">
              <span className="text-[#4D5549] font-normal">
                {service.deliverable}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[#B24E30] shrink-0 ml-3 whitespace-nowrap">
                Details <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Consultation Strip */}
      <div className="frosted-glass rounded-[26px] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <h3 className="font-heading text-2xl sm:text-3xl font-semibold text-[#262A24]">
            Not sure which option fits your business best?
          </h3>
          <p className="text-sm text-[#4D5549] mt-1">
            Tell us what you want to achieve and we will suggest the simplest setup.
          </p>
        </div>
        <button
          onClick={() => onNavigate('contact')}
          className="btn-terracotta px-6 py-3.5 rounded-full text-xs font-semibold tracking-wide inline-flex items-center gap-2 shrink-0 cursor-pointer whitespace-nowrap"
        >
          Ask Us Anything
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

export default ServicesPage;
