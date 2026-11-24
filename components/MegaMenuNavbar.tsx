/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  Bot,
  CalendarCheck,
  CheckCircle2,
  ChevronDown,
  Code2,
  Compass,
  Cpu,
  FileCheck2,
  Home,
  Layers,
  Lock,
  Mail,
  Menu,
  MessageCircle,
  PlayCircle,
  Rocket,
  ShieldCheck,
  Smartphone,
  Workflow,
  X,
} from 'lucide-react';
import { PageId, Service } from '../types';
import {
  ENGAGEMENT_SCOPES,
  PROCESS_STEPS,
  SERVICES,
  STUDIO_EMAIL,
  WHATSAPP_URL,
} from '../data/studioData';
import { XetaForgeLogo } from './XetaForgeLogo';

export interface NavNavigateOptions {
  sectionId?: string;
  service?: Service;
  stepIndex?: number;
  contactScope?: string;
}

interface MegaMenuNavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId, options?: NavNavigateOptions) => void;
}

interface MegaMenuItem {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  action?: () => void;
  href?: string;
  external?: boolean;
}

interface MegaMenuColumn {
  heading: string;
  items: MegaMenuItem[];
}

const NAV_ITEMS: { label: string; id: PageId }[] = [
  { label: 'Home', id: 'home' },
  { label: 'Services', id: 'services' },
  { label: 'Process', id: 'process' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' },
];

export const MegaMenuNavbar: React.FC<MegaMenuNavbarProps> = ({
  currentPage,
  onNavigate,
}) => {
  const [openMenu, setOpenMenu] = useState<PageId | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<PageId | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);

  const clearCloseTimer = () => {
    if (closeTimeoutRef.current !== null) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleOpenMenu = (id: PageId) => {
    clearCloseTimer();
    setOpenMenu(id);
  };

  const handleScheduleClose = () => {
    clearCloseTimer();
    closeTimeoutRef.current = window.setTimeout(() => {
      setOpenMenu(null);
    }, 140);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenMenu(null);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      clearCloseTimer();
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const triggerNavigate = (page: PageId, options?: NavNavigateOptions) => {
    clearCloseTimer();
    setOpenMenu(null);
    setMobileMenuOpen(false);
    onNavigate(page, options);
  };

  const MEGA_MENUS: Record<PageId, MegaMenuColumn[]> = {
    home: [
      {
        heading: 'START HERE',
        items: [
          {
            title: 'Studio Overview',
            subtitle: 'Home',
            icon: Home,
            action: () => triggerNavigate('home'),
          },
          {
            title: 'Featured Services',
            subtitle: 'Preview',
            icon: Layers,
            action: () => triggerNavigate('home', { sectionId: 'home-services' }),
          },
          {
            title: '4 Simple Steps',
            subtitle: 'Workflow',
            icon: PlayCircle,
            action: () => triggerNavigate('home', { sectionId: 'home-process' }),
          },
        ],
      },
      {
        heading: 'TOP SERVICES',
        items: [
          {
            title: SERVICES[0].title,
            subtitle: 'Analytics',
            icon: BarChart3,
            action: () =>
              triggerNavigate('services', {
                service: SERVICES[0],
                sectionId: `service-${SERVICES[0].id}`,
              }),
          },
          {
            title: SERVICES[1].title,
            subtitle: 'Web',
            icon: Code2,
            action: () =>
              triggerNavigate('services', {
                service: SERVICES[1],
                sectionId: `service-${SERVICES[1].id}`,
              }),
          },
          {
            title: SERVICES[2].title,
            subtitle: 'Workflows',
            icon: Workflow,
            action: () =>
              triggerNavigate('services', {
                service: SERVICES[2],
                sectionId: `service-${SERVICES[2].id}`,
              }),
          },
        ],
      },
      {
        heading: 'GET STARTED',
        items: [
          {
            title: 'View All 6 Services',
            subtitle: 'Catalog',
            icon: Layers,
            action: () => triggerNavigate('services'),
          },
          {
            title: 'Book a Free Chat',
            subtitle: 'Consultation',
            icon: CalendarCheck,
            action: () =>
              triggerNavigate('contact', { contactScope: 'Free Discovery Call' }),
          },
          {
            title: 'Chat on WhatsApp',
            subtitle: 'Direct',
            icon: MessageCircle,
            href: WHATSAPP_URL,
            external: true,
          },
        ],
      },
    ],
    services: [
      {
        heading: 'DATA & WEB',
        items: [
          {
            title: SERVICES[0].title,
            subtitle: 'Insights',
            icon: BarChart3,
            action: () =>
              triggerNavigate('services', {
                service: SERVICES[0],
                sectionId: `service-${SERVICES[0].id}`,
              }),
          },
          {
            title: SERVICES[1].title,
            subtitle: 'Web',
            icon: Code2,
            action: () =>
              triggerNavigate('services', {
                service: SERVICES[1],
                sectionId: `service-${SERVICES[1].id}`,
              }),
          },
          {
            title: SERVICES[4].title,
            subtitle: 'Apps',
            icon: Smartphone,
            action: () =>
              triggerNavigate('services', {
                service: SERVICES[4],
                sectionId: `service-${SERVICES[4].id}`,
              }),
          },
        ],
      },
      {
        heading: 'AUTOMATE & TRAIN',
        items: [
          {
            title: SERVICES[2].title,
            subtitle: 'Workflows',
            icon: Workflow,
            action: () =>
              triggerNavigate('services', {
                service: SERVICES[2],
                sectionId: `service-${SERVICES[2].id}`,
              }),
          },
          {
            title: SERVICES[3].title,
            subtitle: 'Support',
            icon: Bot,
            action: () =>
              triggerNavigate('services', {
                service: SERVICES[3],
                sectionId: `service-${SERVICES[3].id}`,
              }),
          },
          {
            title: SERVICES[5].title,
            subtitle: 'Models',
            icon: Cpu,
            action: () =>
              triggerNavigate('services', {
                service: SERVICES[5],
                sectionId: `service-${SERVICES[5].id}`,
              }),
          },
        ],
      },
      {
        heading: 'EXPLORE MORE',
        items: [
          {
            title: 'View All 6 Services',
            subtitle: 'Full Catalog',
            icon: Layers,
            action: () => triggerNavigate('services'),
          },
          {
            title: 'Request a Quote',
            subtitle: 'Contact',
            icon: CalendarCheck,
            action: () =>
              triggerNavigate('contact', { contactScope: 'Free Discovery Call' }),
          },
        ],
      },
    ],
    process: [
      {
        heading: 'PLAN & DESIGN',
        items: [
          {
            title: `01. ${PROCESS_STEPS[0].title}`,
            subtitle: 'Roadmap',
            icon: Compass,
            action: () => triggerNavigate('process', { stepIndex: 0 }),
          },
          {
            title: `02. ${PROCESS_STEPS[1].title}`,
            subtitle: 'Preview',
            icon: Layers,
            action: () => triggerNavigate('process', { stepIndex: 1 }),
          },
        ],
      },
      {
        heading: 'BUILD & LAUNCH',
        items: [
          {
            title: `03. ${PROCESS_STEPS[2].title}`,
            subtitle: 'Testing',
            icon: CheckCircle2,
            action: () => triggerNavigate('process', { stepIndex: 2 }),
          },
          {
            title: `04. ${PROCESS_STEPS[3].title}`,
            subtitle: 'Handover',
            icon: Rocket,
            action: () => triggerNavigate('process', { stepIndex: 3 }),
          },
        ],
      },
      {
        heading: 'PROMISES',
        items: [
          {
            title: 'Safe & Private by Design',
            subtitle: 'Security',
            icon: ShieldCheck,
            action: () =>
              triggerNavigate('process', { sectionId: 'process-promises' }),
          },
          {
            title: 'You Own Everything',
            subtitle: 'Ownership',
            icon: FileCheck2,
            action: () =>
              triggerNavigate('process', { sectionId: 'process-promises' }),
          },
        ],
      },
    ],
    about: [
      {
        heading: 'STUDIO',
        items: [
          {
            title: 'Meet Xeta Forge',
            subtitle: 'Overview',
            icon: Compass,
            action: () => triggerNavigate('about'),
          },
          {
            title: 'Our Principles',
            subtitle: 'Values',
            icon: Lock,
            action: () =>
              triggerNavigate('about', { sectionId: 'about-principles' }),
          },
        ],
      },
      {
        heading: 'WHAT WE SET UP',
        items: [
          {
            title: 'Launch Capabilities',
            subtitle: 'Setup',
            icon: Layers,
            action: () => triggerNavigate('about', { sectionId: 'about-setup' }),
          },
          {
            title: '4-Step Work Rhythm',
            subtitle: 'Milestones',
            icon: Workflow,
            action: () => triggerNavigate('about', { sectionId: 'about-rhythm' }),
          },
        ],
      },
      {
        heading: 'CONNECT',
        items: [
          {
            title: 'Our 4-Step Process',
            subtitle: 'How We Work',
            icon: Rocket,
            action: () => triggerNavigate('process'),
          },
          {
            title: 'Book a Free Chat',
            subtitle: 'Inquiry',
            icon: CalendarCheck,
            action: () => triggerNavigate('contact'),
          },
        ],
      },
    ],
    contact: [
      {
        heading: 'DATA & WEB OPTIONS',
        items: [
          {
            title: ENGAGEMENT_SCOPES[0].name,
            subtitle: 'Advice',
            icon: CalendarCheck,
            action: () =>
              triggerNavigate('contact', { contactScope: ENGAGEMENT_SCOPES[0].name }),
          },
          {
            title: ENGAGEMENT_SCOPES[1].name,
            subtitle: 'Analytics',
            icon: BarChart3,
            action: () =>
              triggerNavigate('contact', { contactScope: ENGAGEMENT_SCOPES[1].name }),
          },
          {
            title: ENGAGEMENT_SCOPES[2].name,
            subtitle: 'Web',
            icon: Code2,
            action: () =>
              triggerNavigate('contact', { contactScope: ENGAGEMENT_SCOPES[2].name }),
          },
        ],
      },
      {
        heading: 'APPS & AI BUILDS',
        items: [
          {
            title: ENGAGEMENT_SCOPES[3].name,
            subtitle: 'Automation',
            icon: Bot,
            action: () =>
              triggerNavigate('contact', { contactScope: ENGAGEMENT_SCOPES[3].name }),
          },
          {
            title: ENGAGEMENT_SCOPES[4].name,
            subtitle: 'Mobile',
            icon: Smartphone,
            action: () =>
              triggerNavigate('contact', { contactScope: ENGAGEMENT_SCOPES[4].name }),
          },
          {
            title: ENGAGEMENT_SCOPES[5].name,
            subtitle: 'Model Training',
            icon: Cpu,
            action: () =>
              triggerNavigate('contact', { contactScope: ENGAGEMENT_SCOPES[5].name }),
          },
        ],
      },
      {
        heading: 'DIRECT CHANNELS',
        items: [
          {
            title: 'Message on WhatsApp',
            subtitle: '+92 371 1889382',
            icon: MessageCircle,
            href: WHATSAPP_URL,
            external: true,
          },
          {
            title: 'Email Our Studio',
            subtitle: STUDIO_EMAIL,
            icon: Mail,
            href: `mailto:${STUDIO_EMAIL}`,
          },
        ],
      },
    ],
  };

  const activeColumns = openMenu ? MEGA_MENUS[openMenu] : null;

  return (
    <>
      <header
        onMouseLeave={handleScheduleClose}
        className="fixed top-3 sm:top-4 left-3 right-3 sm:left-6 sm:right-6 z-40"
      >
        <div className="max-w-7xl mx-auto">
          {/* Top 3-Zone Navigation Bar */}
          <nav
            aria-label="Primary Navigation"
            className="px-4 sm:px-6 h-16 rounded-full frosted-glass flex items-center justify-between gap-6"
          >
            {/* Zone 1: Single-line Brand Wordmark */}
            <button
              type="button"
              onClick={() => triggerNavigate('home')}
              className="cursor-pointer py-1 shrink-0"
              aria-label="Xeta Forge Home"
            >
              <XetaForgeLogo variant="navbar" />
            </button>

            {/* Zone 2: Clean Hover-Dropdown Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = currentPage === item.id;
                const isHovered = openMenu === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onMouseEnter={() => handleOpenMenu(item.id)}
                    onFocus={() => handleOpenMenu(item.id)}
                    onClick={() => triggerNavigate(item.id)}
                    aria-expanded={isHovered}
                    className={`px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                      isHovered || isActive
                        ? 'bg-[#E9F0FC] text-[#1250D2]'
                        : 'text-[#4D5549] hover:text-[#262A24] hover:bg-white/55'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isHovered ? 'rotate-180 text-[#1250D2]' : 'opacity-70'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Zone 3: Single Primary Action + Mobile Toggle */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() =>
                  triggerNavigate('contact', { contactScope: 'Free Discovery Call' })
                }
                className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide btn-cobalt whitespace-nowrap shrink-0 cursor-pointer"
              >
                Book a Free Chat
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="lg:hidden p-2.5 rounded-full btn-cream cursor-pointer"
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </nav>

          {/* Desktop Hover Mega-Menu Panel */}
          {openMenu && activeColumns && (
            <div
              onMouseEnter={clearCloseTimer}
              className="hidden lg:block pt-2"
            >
              <div className="frosted-glass bg-[#FBF7F0]/95 rounded-[26px] p-6 lg:p-8 shadow-[0_24px_48px_-14px_rgba(21,94,239,0.2)] border border-[#155EEF]/15">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-10">
                  {activeColumns.map((col) => (
                    <div key={col.heading} className="space-y-3">
                      <div className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#155EEF] px-2">
                        {col.heading}
                      </div>

                      <div className="space-y-1">
                        {col.items.map((entry) => {
                          const Icon = entry.icon;
                          const itemClasses =
                            'w-full flex items-center gap-3.5 p-2.5 rounded-2xl text-left hover:bg-[#E9F0FC]/80 transition-colors cursor-pointer group';
                          const content = (
                            <>
                              <span className="w-10 h-10 rounded-xl bg-[#EFF5FF] border border-[#155EEF]/25 text-[#1250D2] group-hover:bg-[#1250D2] group-hover:text-white group-hover:border-[#1250D2] flex items-center justify-center shrink-0 transition-colors">
                                <Icon className="w-4 h-4" />
                              </span>
                              <div className="min-w-0">
                                <div className="text-sm font-semibold text-[#262A24] group-hover:text-[#1250D2] transition-colors truncate">
                                  {entry.title}
                                </div>
                                <div className="text-xs text-[#4D5549] truncate">
                                  {entry.subtitle}
                                </div>
                              </div>
                            </>
                          );

                          if (entry.href) {
                            return (
                              <a
                                key={entry.title}
                                href={entry.href}
                                target={entry.external ? '_blank' : undefined}
                                rel={entry.external ? 'noopener noreferrer' : undefined}
                                onClick={() => setOpenMenu(null)}
                                className={itemClasses}
                              >
                                {content}
                              </a>
                            );
                          }

                          return (
                            <button
                              key={entry.title}
                              type="button"
                              onClick={entry.action}
                              className={itemClasses}
                            >
                              {content}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile & Tablet Navigation Overlay with Sub-Options */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-[#FBF7F0] flex flex-col justify-between p-4 sm:p-6 overflow-y-auto">
          <div className="space-y-4">
            <div className="flex items-center justify-between px-3 py-2 rounded-full frosted-glass">
              <XetaForgeLogo variant="navbar" />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 rounded-full btn-cream flex items-center justify-center cursor-pointer"
                aria-label="Close Menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="frosted-glass rounded-2xl px-3 py-2 divide-y divide-[#262A24]/10">
              {NAV_ITEMS.map((item) => {
                const isActive = currentPage === item.id;
                const isExpanded = mobileExpanded === item.id;
                const flatItems = MEGA_MENUS[item.id].flatMap((col) => col.items);
                return (
                  <div key={item.id} className="py-1">
                    <div className="flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => triggerNavigate(item.id)}
                        className={`flex-1 min-h-[44px] px-2.5 rounded-xl text-left font-sans text-[15px] font-semibold transition-colors cursor-pointer flex items-center ${
                          isActive
                            ? 'text-[#1250D2] bg-[#E9F0FC]/75'
                            : 'text-[#262A24] hover:bg-white/60'
                        }`}
                      >
                        {item.label}
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setMobileExpanded(isExpanded ? null : item.id)
                        }
                        className="w-11 h-11 rounded-xl hover:bg-[#E9F0FC] text-[#4D5549] flex items-center justify-center shrink-0 cursor-pointer"
                        aria-label={`Toggle ${item.label} options`}
                        aria-expanded={isExpanded}
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isExpanded ? 'rotate-180 text-[#1250D2]' : ''
                          }`}
                        />
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="grid grid-cols-1 gap-1.5 pt-1.5 pb-2 px-1">
                        {flatItems.map((sub) => {
                          const SubIcon = sub.icon;
                          const mobileClasses =
                            'flex items-center gap-2.5 px-2.5 py-2 rounded-xl bg-white/80 border border-[#155EEF]/12 text-left cursor-pointer hover:border-[#155EEF]/35 transition-colors';
                          const mobileContent = (
                            <>
                              <span className="w-7 h-7 rounded-lg bg-[#EFF5FF] text-[#1250D2] flex items-center justify-center shrink-0">
                                <SubIcon className="w-3.5 h-3.5" />
                              </span>
                              <div className="min-w-0">
                                <div className="text-[13px] font-semibold text-[#262A24] leading-tight truncate">
                                  {sub.title}
                                </div>
                                <div className="text-[11px] text-[#4D5549] truncate">
                                  {sub.subtitle}
                                </div>
                              </div>
                            </>
                          );

                          if (sub.href) {
                            return (
                              <a
                                key={sub.title}
                                href={sub.href}
                                target={sub.external ? '_blank' : undefined}
                                rel={sub.external ? 'noopener noreferrer' : undefined}
                                onClick={() => setMobileMenuOpen(false)}
                                className={mobileClasses}
                              >
                                {mobileContent}
                              </a>
                            );
                          }

                          return (
                            <button
                              key={sub.title}
                              type="button"
                              onClick={sub.action}
                              className={mobileClasses}
                            >
                              {mobileContent}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              triggerNavigate('contact', { contactScope: 'Free Discovery Call' })
            }
            className="btn-cobalt w-full py-3.5 mt-5 rounded-full text-xs font-semibold tracking-wide inline-flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            Book a Free Chat
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </>
  );
};

export default MegaMenuNavbar;
