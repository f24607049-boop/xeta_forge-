/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy, useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { PageId, Service } from './types';
import { SERVICES, STUDIO_EMAIL, WHATSAPP_URL } from './data/studioData';
import { XetaForgeLogo } from './components/XetaForgeLogo';
import MegaMenuNavbar, { NavNavigateOptions } from './components/MegaMenuNavbar';
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
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [initialScope, setInitialScope] = useState<string>('Free Discovery Call');
  const [initialProcessStep, setInitialProcessStep] = useState<number>(0);
  const [chatMounted, setChatMounted] = useState(false);

  const navigateTo = (page: PageId, options?: NavNavigateOptions) => {
    setCurrentPage(page);

    if (options?.contactScope) {
      setInitialScope(options.contactScope);
    }

    if (typeof options?.stepIndex === 'number') {
      setInitialProcessStep(options.stepIndex);
    }

    if (options?.service) {
      setSelectedService(options.service);
    } else {
      setSelectedService(null);
    }

    if (options?.sectionId) {
      const targetId = options.sectionId;
      window.setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo(0, 0);
        }
      }, 120);
    } else {
      window.scrollTo(0, 0);
    }
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
    <div className="min-h-screen bg-sunlit-studio text-[#262A24] selection:bg-[#155EEF] selection:text-white flex flex-col">
      <MegaMenuNavbar currentPage={currentPage} onNavigate={navigateTo} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={(page) => navigateTo(page)}
            onSelectService={(svc) => setSelectedService(svc)}
          />
        )}

        <Suspense fallback={<PageFallback />}>
          {currentPage === 'services' && (
            <ServicesPage
              onSelectService={(svc) => setSelectedService(svc)}
              onNavigate={(page) => navigateTo(page)}
            />
          )}
          {currentPage === 'process' && (
            <ProcessPage
              onNavigate={(page) => navigateTo(page)}
              initialStepIndex={initialProcessStep}
            />
          )}
          {currentPage === 'about' && (
            <AboutPage onNavigate={(page) => navigateTo(page)} />
          )}
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
                className="hover:text-[#155EEF] transition-colors cursor-pointer"
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
            className="w-13 h-13 rounded-full btn-cobalt flex items-center justify-center cursor-pointer"
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
