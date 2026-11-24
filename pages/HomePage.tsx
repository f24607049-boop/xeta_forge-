/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  ArrowRight,
  Bookmark,
  Code2,
  MapPin,
  Workflow,
} from 'lucide-react';
import { PageId, Service } from '../types';
import { PROCESS_STEPS, SERVICES } from '../data/studioData';
import { XetaForgeLogo } from '../components/XetaForgeLogo';
import ServiceVisual from '../components/ServiceVisual';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onSelectService: (service: Service) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectService }) => {
  const featuredServices = SERVICES.slice(0, 4);

  return (
    <div>
      {/* HERO SECTION */}
      <section className="pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Editorial Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[#4E6D51]">
              Websites, Mobile Apps &amp; Helpful AI
            </div>

            <h1 className="font-heading text-5xl sm:text-6xl lg:text-[64px] font-semibold text-[#262A24] leading-[1.03] tracking-tight">
              Smart tools built to{' '}
              <span className="italic text-[#155EEF] font-medium">
                help you grow.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#4D5549] leading-relaxed max-w-lg">
              We build clean websites, time-saving office automations, and friendly
              customer chatbots—explained in plain English, built to fit your daily
              work, and handed completely to you.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={() => onNavigate('services')}
                className="btn-cobalt px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide inline-flex items-center justify-center gap-2.5 cursor-pointer whitespace-nowrap"
              >
                See Our Services
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="btn-cream px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide inline-flex items-center justify-center cursor-pointer whitespace-nowrap"
              >
                Book a Free Chat
              </button>
            </div>
          </div>

          {/* Right Glassomorphic Studio Card */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[460px] py-4 px-1 sm:px-2">
              {/* Lightweight Sage & Cobalt Backdrop Circles */}
              <div
                aria-hidden="true"
                className="hidden sm:block absolute bottom-2 -left-4 w-32 h-32 rounded-full bg-[#DCE6D8]/75 pointer-events-none"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-1 right-4 w-24 h-24 rounded-full bg-[#D8E7FE]/85 pointer-events-none"
              />

              {/* Glassomorphic Studio Card */}
              <div className="relative z-10 frosted-glass rounded-[30px] p-6 sm:p-8 space-y-6">
                <div className="flex items-start justify-between gap-3">
                  <XetaForgeLogo variant="card" />
                  <button
                    onClick={() => onNavigate('services')}
                    className="btn-cream px-3.5 py-2 rounded-xl text-xs font-medium inline-flex items-center gap-2 shrink-0 cursor-pointer whitespace-nowrap"
                  >
                    <span>Services</span>
                    <Bookmark className="w-3.5 h-3.5 text-[#4E6D51]" />
                  </button>
                </div>

                <div className="space-y-1.5">
                  <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#4E6D51]">
                    How We Help
                  </div>
                  <h2 className="font-heading text-4xl sm:text-[42px] font-semibold text-[#262A24] leading-[1.06] tracking-tight">
                    Your Digital Partner
                  </h2>
                  <p className="text-sm sm:text-base text-[#4D5549]">
                    Build helpful online tools that{' '}
                    <span className="text-[#155EEF] font-semibold">
                      save you time.
                    </span>
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => onSelectService(SERVICES[1])}
                    className="studio-chip rounded-2xl p-3 flex items-center gap-3 text-left hover:border-[#155EEF]/45 transition-colors cursor-pointer"
                  >
                    <span className="w-9 h-9 rounded-full cobalt-medallion flex items-center justify-center text-white shrink-0">
                      <Code2 className="w-4 h-4" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-[#262A24] truncate">
                        Websites &amp; Apps
                      </div>
                      <div className="text-[11px] text-[#4D5549] truncate">
                        Easy for visitors
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectService(SERVICES[2])}
                    className="studio-chip rounded-2xl p-3 flex items-center gap-3 text-left hover:border-[#4E6D51]/55 transition-colors cursor-pointer"
                  >
                    <span className="w-9 h-9 rounded-full sage-medallion flex items-center justify-center text-white shrink-0">
                      <Workflow className="w-4 h-4" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-[#262A24] truncate">
                        AI &amp; Automation
                      </div>
                      <div className="text-[11px] text-[#4D5549] truncate">
                        Runs on its own
                      </div>
                    </div>
                  </button>
                </div>

                <div className="border-t border-[#262A24]/10 pt-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div className="space-y-3">
                    <div>
                      <div className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#4E6D51]">
                        Our Promise
                      </div>
                      <div className="font-sans text-xl font-semibold text-[#262A24] tracking-tight mt-0.5">
                        4 Simple Steps
                      </div>
                      <div className="text-[11px] text-[#4D5549]">
                        You own everything we create
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-[#4D5549]">
                      <span className="w-6 h-6 rounded-full bg-[#EEF2EC] flex items-center justify-center text-[#4E6D51] shrink-0">
                        <MapPin className="w-3.5 h-3.5" />
                      </span>
                      <span>Friendly team · Clear plain language</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate('contact')}
                    className="btn-cobalt px-5 py-3 rounded-full text-xs font-semibold tracking-wide inline-flex items-center justify-center gap-2 shrink-0 whitespace-nowrap cursor-pointer"
                  >
                    Start a Project
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE SERVICES WITH REAL PHOTOS */}
      <section id="home-services" className="py-16 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto border-t border-[#262A24]/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#4E6D51] mb-2">
              What We Can Build For You
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-semibold text-[#262A24] tracking-tight">
              Helpful services for modern businesses
            </h2>
          </div>
          <button
            onClick={() => onNavigate('services')}
            className="text-sm font-semibold text-[#155EEF] hover:text-[#0D3FA8] inline-flex items-center gap-1.5 cursor-pointer self-start md:self-auto whitespace-nowrap"
          >
            See all 6 services <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredServices.map((service) => (
            <button
              key={service.id}
              type="button"
              onClick={() => onSelectService(service)}
              className="studio-card rounded-[24px] p-5 text-left flex flex-col justify-between gap-5 cursor-pointer group"
            >
              <div className="space-y-4">
                <ServiceVisual
                  visualId={service.visualId}
                  image={service.image}
                  imageAlt={service.imageAlt}
                  compact
                />
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#4E6D51] mb-1">
                    {service.category}
                  </div>
                  <h3 className="font-heading text-2xl font-semibold text-[#262A24] group-hover:text-[#155EEF] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#4D5549] leading-relaxed mt-2">
                    {service.outcome}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#262A24]/10 flex items-center justify-between text-xs font-semibold text-[#262A24]">
                <span>Read more</span>
                <ArrowRight className="w-4 h-4 text-[#155EEF] group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* FOUR SIMPLE STEPS */}
      <section id="home-process" className="py-16 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto border-t border-[#262A24]/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#4E6D51] mb-2">
              How It Works
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-semibold text-[#262A24] tracking-tight">
              Four simple steps from idea to launch
            </h2>
          </div>
          <button
            onClick={() => onNavigate('process')}
            className="text-sm font-semibold text-[#155EEF] hover:text-[#0D3FA8] inline-flex items-center gap-1.5 cursor-pointer self-start md:self-auto whitespace-nowrap"
          >
            See how we work <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROCESS_STEPS.map((step, idx) => (
            <button
              key={step.step}
              type="button"
              onClick={() => onNavigate('process')}
              className="studio-card rounded-[22px] p-6 text-left flex flex-col justify-between gap-4 cursor-pointer group"
            >
              <div>
                <div
                  className={`font-mono text-xs font-semibold mb-3 ${
                    idx % 2 === 0 ? 'text-[#155EEF]' : 'text-[#4E6D51]'
                  }`}
                >
                  Step {step.step}
                </div>
                <h3 className="font-heading text-2xl font-semibold text-[#262A24] group-hover:text-[#155EEF] transition-colors mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[#4D5549] leading-relaxed">
                  {step.summary}
                </p>
              </div>
              <div className="pt-3 border-t border-[#262A24]/10 flex items-center justify-between gap-2 text-[11px] text-[#4D5549]">
                <span>{step.artifact}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#155EEF] shrink-0 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
