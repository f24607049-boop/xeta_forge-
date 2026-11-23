/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, Compass, Layers, Lock } from 'lucide-react';
import { PageId } from '../types';
import { PROCESS_STEPS } from '../data/studioData';
import { XetaForgeLogo } from '../components/XetaForgeLogo';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

const PRINCIPLES = [
  {
    icon: Compass,
    tone: 'terracotta' as const,
    title: 'Talk Directly to the Builders',
    desc: 'You speak directly with the people designing and building your project—no confusing middlemen or complicated sales layers.',
  },
  {
    icon: Layers,
    tone: 'sage' as const,
    title: 'Simple & Fast for Visitors',
    desc: 'We keep websites and apps lightweight so pages open quickly, read clearly, and work smoothly on any phone.',
  },
  {
    icon: Lock,
    tone: 'terracotta' as const,
    title: 'Your Information Stays Yours',
    desc: 'Any AI helper we set up sticks strictly to your approved business details and keeps your private company files safe.',
  },
];

const CAPABILITY_GROUPS = [
  {
    group: 'For Your Customers',
    items: ['Company Websites', 'Booking Pages', 'iPhone & Android Apps', 'Online Customer Portals'],
  },
  {
    group: 'Behind the Scenes',
    items: ['Lead Capture Forms', 'Safe Data Storage', 'Email & Calendar Links', 'Payment Connections'],
  },
  {
    group: 'Smart Helpers',
    items: ['24/7 Website Chat', 'WhatsApp Auto-Handoff', 'Form Reading', 'Private Team Assistants'],
  },
];

const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <section className="pt-28 sm:pt-36 pb-20 px-4 sm:px-6 max-w-6xl mx-auto w-full space-y-10">
      {/* Studio Story */}
      <div className="frosted-glass rounded-[30px] p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-5">
        <XetaForgeLogo variant="about" className="mx-auto" />
        <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#4E6D51]">
          About Xeta Forge
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl font-semibold text-[#262A24] tracking-tight">
          Friendly experts who make modern software easy to understand
        </h1>
        <p className="text-base sm:text-lg text-[#4D5549] leading-relaxed max-w-2xl mx-auto">
          Xeta Forge builds websites, mobile apps, and practical AI helpers for
          growing businesses. We focus on clear everyday language, honest
          timelines, and tools your whole team can comfortably use.
        </p>
      </div>

      {/* Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PRINCIPLES.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="studio-card rounded-[24px] p-6 space-y-4">
              <span
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                  item.tone === 'sage' ? 'sage-medallion' : 'terracotta-medallion'
                }`}
              >
                <Icon className="w-5 h-5" />
              </span>
              <h2 className="font-heading text-2xl font-semibold text-[#262A24]">
                {item.title}
              </h2>
              <p className="text-sm text-[#4D5549] leading-relaxed">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Plain-English Breakdown */}
      <div className="frosted-glass rounded-[28px] p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#4E6D51] mb-1">
              What We Set Up
            </div>
            <h2 className="font-heading text-3xl font-semibold text-[#262A24]">
              Everything needed for a smooth launch
            </h2>
          </div>
          <span className="text-xs text-[#4D5549]">
            Chosen for reliability and easy upkeep
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CAPABILITY_GROUPS.map((group) => (
            <div
              key={group.group}
              className="studio-chip rounded-2xl p-5 space-y-3"
            >
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#3B553E]">
                {group.group}
              </div>
              <div className="text-sm text-[#262A24] leading-relaxed">
                {group.items.join(' · ')}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Consistent Rhythm Strip */}
      <div className="studio-card rounded-[26px] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B24E30]">
            Simple Way of Working
          </div>
          <h3 className="font-heading text-2xl sm:text-3xl font-semibold text-[#262A24]">
            {PROCESS_STEPS.map((s) => s.title.split(' ')[0]).join(' · ')}
          </h3>
          <p className="text-sm text-[#4D5549]">
            Every project moves cleanly through four clear milestones.
          </p>
        </div>
        <button
          onClick={() => onNavigate('contact')}
          className="btn-terracotta px-6 py-3.5 rounded-full text-xs font-semibold tracking-wide inline-flex items-center justify-center gap-2 shrink-0 cursor-pointer whitespace-nowrap"
        >
          Book a Free Chat
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

export default AboutPage;
