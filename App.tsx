/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy, useState } from 'react';
import { ArrowRight, Menu, MessageSquare, X } from 'lucide-react';
import { PageId, Service } from './types';
import { SERVICES, STUDIO_EMAIL, WHATSAPP_URL } from './data/studioData';
import { XetaForgeLogo } from './components/XetaForgeLogo';
import HomePage from './pages/HomePage';

const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ProcessPage = lazy(() => import('./pages/ProcessPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ServiceModal = lazy(() => import('./components/ServiceModal'));
const AIChat = lazy(() => import('./components/AIChat'));

const NAV_ITEMS: { label: string; id: PageId }[] = [
  { label: 'Home', id: 'home' },
  { label: 'Services', id: 'services' },
  { label: 'Process', id: 'process' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' },
];

const PageFallback: React.FC = () => (
  <div className="pt-36 pb-20 px-6 max-w-7xl mx-auto w-full text-center text-sm text-[#4D5549]">
    Loading section...
  </div>
);

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [initialScope, setInitialScope] = useState<string>('Free Discovery Call');
  const [chatMounted, setChatMounted] = useState(false);

  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const handleDiscussService = (serviceTitle: string) => {
    setSelectedService(null);
    setInitialScope(serviceTitle);
    navigateTo('contact');
  };

  const handleNavigateModal = (direction: 'prev' | 'next') => {
    if (!selectedService) return;
    const idx = SERVICES.findIndex((s) => s.id === selectedService.id);
    if (idx === -1) return;
    const nextIdx =
      direction === 'prev'
        ? (idx - 1 + SERVICES.length) % SERVICES.length
        : (idx + 1) % SERVICES.length;
    setSelectedService(SERVICES[nextIdx]);
  };

  return (
    <div className="min-h-screen bg-sunlit-studio text-[#262A24] selection:bg-[#B24E30] selection:text-white flex flex-col">
      {/* Top Frosted Cream Navigation Bar (3-zone Top Bar Contract) */}
      <header className="fixed top-3 sm:top-4 left-3 right-3 sm:left-6 sm:right-6 z-40">
        <nav
          aria-label="Primary Navigation"
          className="max-w-7xl mx-auto px-4 sm:px-6 h-16 rounded-full frosted-glass flex items-center justify-between gap-8"
        >
          {/* Zone 1: Single-line Brand Wordmark */}
          <button
            type="button"
            onClick={() => navigateTo('home')}
            className="cursor-pointer py-1 shrink-0"
            aria-label="Xeta Forge Home"
          >
            <XetaForgeLogo variant="navbar" />
          </button>

          {/* Zone 2: 5 Clean Single-Line Text Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigateTo(item.id)}
                  className={`py-1.5 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer border-b-2 ${
                    isActive
                      ? 'text-[#B24E30] border-[#B24E30]'
                      : 'text-[#4D5549] border-transparent hover:text-[#262A24] hover:border-[#4E6D51]/45'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Zone 3: Single Primary Action + Mobile Menu Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => navigateTo('contact')}
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide btn-terracotta whitespace-nowrap shrink-0 cursor-pointer"
            >
              Book a Free Chat
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden p-2.5 rounded-full btn-cream cursor-pointer"
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
      </header>

      {/* Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-[#FBF7F0] flex flex-col justify-between p-6">
          <div className="flex items-center justify-between">
            <XetaForgeLogo variant="navbar" />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-full btn-cream cursor-pointer"
              aria-label="Close Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigateTo(item.id)}
                  className={`text-left font-heading text-4xl font-semibold py-2 transition-colors cursor-pointer ${
                    isActive ? 'text-[#B24E30]' : 'text-[#262A24]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => navigateTo('contact')}
            className="btn-terracotta w-full py-4 rounded-full text-sm font-semibold tracking-wide inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            Book a Free Chat
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            onSelectService={(svc) => setSelectedService(svc)}
          />
        )}

        <Suspense fallback={<PageFallback />}>
          {currentPage === 'services' && (
            <ServicesPage
              onSelectService={(svc) => setSelectedService(svc)}
              onNavigate={navigateTo}
            />
          )}
          {currentPage === 'process' && (
            <ProcessPage onNavigate={navigateTo} />
          )}
          {currentPage === 'about' && <AboutPage onNavigate={navigateTo} />}
          {currentPage === 'contact' && (
            <ContactPage initialScope={initialScope} />
          )}
        </Suspense>
      </main>

      {/* Quiet Studio Footer */}
      <footer className="border-t border-[#4E6D51]/15 bg-[#F3ECE0]/75 py-10 px-4 sm:px-6 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <XetaForgeLogo variant="footer" />

          <div className="flex flex-wrap items-center justify-center gap-5 text-xs font-medium text-[#4D5549]">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => navigateTo(item.id)}
                className="hover:text-[#B24E30] transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#4E6D51] transition-colors"
            >
              WhatsApp
            </a>
            <a
              href={`mailto:${STUDIO_EMAIL}`}
              className="hover:text-[#4E6D51] transition-colors"
            >
              Email
            </a>
          </div>

          <div className="text-xs text-[#4D5549]">
            © {new Date().getFullYear()} XETA FORGE. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Lazy-Loaded Service Details Modal */}
      {selectedService && (
        <Suspense fallback={null}>
          <ServiceModal
            service={selectedService}
            onClose={() => setSelectedService(null)}
            onNavigate={handleNavigateModal}
            onDiscuss={handleDiscussService}
          />
        </Suspense>
      )}

      {/* Lazy-Loaded Conversational Assistant */}
      {chatMounted ? (
        <Suspense fallback={null}>
          <AIChat defaultOpen />
        </Suspense>
      ) : (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
          <button
            type="button"
            onClick={() => setChatMounted(true)}
            className="w-13 h-13 rounded-full btn-terracotta flex items-center justify-center cursor-pointer"
            aria-label="Open Assistant"
          >
            <MessageSquare className="w-5 h-5 text-white" />
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
