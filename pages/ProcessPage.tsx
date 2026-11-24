/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, FileCheck2, ShieldCheck } from 'lucide-react';
import { PageId } from '../types';
import { PROCESS_STEPS } from '../data/studioData';

interface ProcessPageProps {
  onNavigate: (page: PageId) => void;
  initialStepIndex?: number;
}

const ProcessPage: React.FC<ProcessPageProps> = ({
  onNavigate,
  initialStepIndex = 0,
}) => {
  const [activeIndex, setActiveIndex] = useState(initialStepIndex);

  useEffect(() => {
    setActiveIndex(initialStepIndex);
  }, [initialStepIndex]);

  const activeStep = PROCESS_STEPS[activeIndex] ?? PROCESS_STEPS[0];

  return (
    <section className="pt-28 sm:pt-36 pb-20 px-4 sm:px-6 max-w-7xl mx-auto w-full space-y-10">
      {/* Header */}
      <div className="frosted-glass rounded-[28px] p-7 sm:p-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#4E6D51]">
            How We Work
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-semibold text-[#262A24] tracking-tight">
            Four clear steps from first chat to launch
          </h1>
        </div>
        <p className="max-w-md text-sm text-[#4D5549] leading-relaxed">
          No confusing tech talk or surprise steps. Every project follows the
          same simple four-part path so you always know what comes next.
        </p>
      </div>

      {/* Interactive 4-Step Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 space-y-3">
          {PROCESS_STEPS.map((item, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <button
                key={item.step}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`w-full text-left rounded-[22px] p-5 transition-all cursor-pointer ${
                  isSelected
                    ? 'frosted-glass border-[#4E6D51]/45'
                    : 'studio-card'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-mono text-[11px] font-semibold text-[#155EEF] mb-1">
                      STEP {item.step}
                    </div>
                    <h2 className="font-heading text-2xl font-semibold text-[#262A24]">
                      {item.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#4D5549] mt-1 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono shrink-0 ${
                      isSelected
                        ? 'sage-medallion text-white'
                        : 'bg-[#EEF2EC] border border-[#4E6D51]/20 text-[#3B553E]'
                    }`}
                  >
                    {item.step}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Detail Panel */}
        <div className="lg:col-span-7 frosted-glass rounded-[28px] p-6 sm:p-9 space-y-6">
          <div className="rounded-2xl bg-[#EEF2EC]/80 border border-[#4E6D51]/18 p-4 sm:p-5">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#3B553E] mb-3">
              Project Progress Overview
            </div>
            <div className="grid grid-cols-4 gap-2 items-center">
              {PROCESS_STEPS.map((s, idx) => {
                const active = idx === activeIndex;
                const completed = idx < activeIndex;
                return (
                  <button
                    key={s.step}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`rounded-xl py-2.5 px-2 text-center border transition-all cursor-pointer ${
                      active
                        ? 'bg-[#1250D2] border-[#1250D2] text-white'
                        : completed
                          ? 'bg-[#D7E3D4] border-[#4E6D51]/35 text-[#262A24]'
                          : 'bg-white/90 border-[#262A24]/10 text-[#4D5549]'
                    }`}
                  >
                    <div className="font-mono text-[10px] opacity-85">
                      {s.step}
                    </div>
                    <div className="text-[11px] font-semibold truncate mt-0.5">
                      {s.title.split(' ')[0]}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            <div className="font-mono text-xs font-semibold text-[#4E6D51]">
              STEP {activeStep.step} DETAILS
            </div>
            <h3 className="font-heading text-3xl sm:text-4xl font-semibold text-[#262A24]">
              {activeStep.title}
            </h3>
            <p className="text-sm sm:text-base text-[#4D5549] leading-relaxed">
              {activeStep.details}
            </p>
          </div>

          <div className="studio-chip rounded-2xl p-4 flex items-start gap-3">
            <span className="w-9 h-9 rounded-full sage-medallion flex items-center justify-center text-white shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </span>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#4E6D51]">
                What You Receive
              </div>
              <div className="text-sm font-semibold text-[#262A24] mt-0.5">
                {activeStep.artifact}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#262A24]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-xs text-[#4D5549]">
              Step {activeIndex + 1} of {PROCESS_STEPS.length}
            </span>
            <button
              onClick={() => onNavigate('contact')}
              className="btn-cobalt px-6 py-3 rounded-full text-xs font-semibold tracking-wide inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
            >
              Book a Free Chat
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Plain-English Promises */}
      <div id="process-promises" className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="studio-card rounded-[24px] p-6 flex items-start gap-4">
          <span className="w-10 h-10 rounded-full sage-medallion flex items-center justify-center text-white shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </span>
          <div>
            <h3 className="font-heading text-2xl font-semibold text-[#262A24]">
              Safe &amp; Private by Design
            </h3>
            <p className="text-sm text-[#4D5549] leading-relaxed mt-1">
              Your customer inquiries and private company files are kept protected
              with safe login rules and locked private keys.
            </p>
          </div>
        </div>

        <div className="studio-card rounded-[24px] p-6 flex items-start gap-4">
          <span className="w-10 h-10 rounded-full cobalt-medallion flex items-center justify-center text-white shrink-0">
            <FileCheck2 className="w-5 h-5" />
          </span>
          <div>
            <h3 className="font-heading text-2xl font-semibold text-[#262A24]">
              You Own Everything We Build
            </h3>
            <p className="text-sm text-[#4D5549] leading-relaxed mt-1">
              All website files, logins, and simple how-to instructions are handed
              over to you at launch with no hidden lock-in.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessPage;
