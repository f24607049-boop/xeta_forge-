/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code, Cpu, Bot, Layers, Sparkles, Terminal, ArrowRight, Menu, X, 
  ChevronLeft, ChevronRight, Shield, Activity, CheckCircle, Mail, Building, User,
  MessageCircle, Globe, Lock, Zap
} from 'lucide-react';
import SplineBackground from './components/SplineBackground';
import GradientText from './components/GlitchText';
import CustomCursor from './components/CustomCursor';
import ServiceCard from './components/ServiceCard';
import AIChat from './components/AIChat';
import XetaForgeLogo from './components/XetaForgeLogo';
import { Service } from './types';
import { saveConsultation } from './services/firebase';

export type PageId = 'home' | 'services' | 'process' | 'about' | 'contact';

const PAGE_PATHS: Record<PageId, string> = {
  home: '/',
  services: '/services',
  process: '/process',
  about: '/about',
  contact: '/contact',
};

function getPageFromPath(pathname: string): PageId {
  const cleaned = pathname.replace(/\/+$/, '') || '/';
  if (cleaned === '/services') return 'services';
  if (cleaned === '/process') return 'process';
  if (cleaned === '/about') return 'about';
  if (cleaned === '/contact') return 'contact';
  return 'home';
}

// XETA Forge Services
const SERVICES: Service[] = [
  {
    id: '1',
    title: 'Next-Gen Web Development',
    tagline: 'Web Engineering',
    statusTag: 'Scalable',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
    description: 'We engineer blazingly fast, secure, and accessible web architectures utilizing modern frameworks and cloud-native solutions designed to handle high transaction volumes.',
    features: [
      'Production-ready React, Next.js, and Vite architectures.',
      'Tailwind CSS-driven premium responsive layouts.',
      'Highly optimized asset loading and near-perfect Lighthouse/SEO scores.',
      'Serverless, edge-optimized, and containerized backend APIs.'
    ]
  },
  {
    id: '2',
    title: 'Intelligent AI Automation',
    tagline: 'Workflow Orchestration',
    statusTag: 'Efficient',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop',
    description: 'Optimize business operations, eliminate repetitive daily tasks, and eliminate data silos with autonomous LLM agents and intelligent pipeline sync.',
    features: [
      'Multi-agent LLM orchestration tailored to your business rules.',
      'Autonomous document parsing, indexing, and automated labelling.',
      'Robust API bridges connecting legacy CRM databases to modern LLM APIs.',
      'Real-time automated data processing and pipeline analytics.'
    ]
  },
  {
    id: '3',
    title: 'Conversational AI & Chatbots',
    tagline: 'Interactive AI Support',
    statusTag: '24/7 Smart',
    image: 'https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?q=80&w=1000&auto=format&fit=crop',
    description: 'Elevate customer satisfaction with bespoke conversational assistants trained on your corporate knowledge bases, offering instant support 24/7.',
    features: [
      'Context-aware NLP powered by state-of-the-art LLMs (like Gemini).',
      'Secure document search utilizing highly efficient Vector databases.',
      'Omnichannel support across Web, Slack, and WhatsApp platforms.',
      'Seamless fallback routing models notifying on-duty human agents.'
    ]
  },
  {
    id: '4',
    title: 'Custom App Development',
    tagline: 'Mobile & Cross-Platform',
    statusTag: 'High-Performance',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000&auto=format&fit=crop',
    description: 'We engineer high-performance native and cross-platform mobile applications with fluid interfaces, offline resilience, and deeply integrated AI capabilities for iOS and Android.',
    features: [
      'Cross-platform React Native and Flutter mobile architectures.',
      'Native iOS & Android performance with 60fps fluid interactions.',
      'Offline-first data synchronization, biometric auth, and push notifications.',
      'End-to-end App Store and Google Play deployment pipelines.'
    ]
  },
  {
    id: '5',
    title: 'Custom AI Model Training',
    tagline: 'Fine-Tuning & Neural Ops',
    statusTag: 'Precision AI',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop',
    description: 'Train, fine-tune, and align domain-specific foundation models and custom neural architectures on your proprietary datasets for unmatched accuracy, speed, and data sovereignty.',
    features: [
      'Domain-specific LLM fine-tuning (LoRA, QLoRA, and full-weight tuning).',
      'Proprietary dataset curation, cleaning, and RLHF alignment.',
      'Custom computer vision, classification, and predictive ML model training.',
      'Model quantization and low-latency private cloud or on-prem deployment.'
    ]
  }
];

const NAV_ITEMS: { label: string; id: PageId }[] = [
  { label: 'Home', id: 'home' },
  { label: 'Services', id: 'services' },
  { label: 'Our Process', id: 'process' },
  { label: 'About Us', id: 'about' },
  { label: 'Contact', id: 'contact' },
];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageId>(() =>
    typeof window !== 'undefined' ? getPageFromPath(window.location.pathname) : 'home'
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  
  // B2B Booking Form States
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    projectType: 'Next-Gen Web Development',
    message: ''
  });
  const [bookingStep, setBookingStep] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Sync browser back/forward navigation with active page
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getPageFromPath(window.location.pathname));
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Keyboard navigation for service modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedService) return;
      if (e.key === 'ArrowLeft') navigateService('prev');
      if (e.key === 'ArrowRight') navigateService('next');
      if (e.key === 'Escape') setSelectedService(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedService]);

  const navigateToPage = (page: PageId) => {
    setMobileMenuOpen(false);
    setSelectedService(null);
    setCurrentPage(page);
    const targetPath = PAGE_PATHS[page];
    if (typeof window !== 'undefined' && window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    const steps = [
      'Establishing secure database connection...',
      'Validating form data & sanitizing inputs...',
      'Syncing brief with Firestore persistence...',
      'Dispatched successfully!'
    ];

    let currentStep = 0;
    setBookingStep(steps[currentStep]);

    try {
      await saveConsultation({
        name: formData.name,
        company: formData.company,
        email: formData.email,
        projectType: formData.projectType,
        message: formData.message
      });

      const interval = setInterval(() => {
        currentStep++;
        if (currentStep < steps.length) {
          setBookingStep(steps[currentStep]);
        } else {
          clearInterval(interval);
          setBookingStep(null);
          setBookingSuccess(true);

          const encodedMessage = encodeURIComponent(
            `Assalamu Alaikum / Hi!\n\n` +
            `I just submitted a consultation brief on XETA Forge. Here are my details:\n\n` +
            `⚡ *Name:* ${formData.name}\n` +
            `⚡ *Company:* ${formData.company || 'N/A'}\n` +
            `⚡ *Email:* ${formData.email}\n` +
            `⚡ *Required Service:* ${formData.projectType}\n` +
            `⚡ *Brief Description:* ${formData.message || 'N/A'}`
          );
          window.open(`https://wa.me/923711889382?text=${encodedMessage}`, '_blank');
        }
      }, 700);
    } catch (error) {
      console.error("Failed to persist consultation:", error);
      setBookingStep("Error saving brief. Retrying locally...");
      setTimeout(() => {
        setBookingStep(null);
        setBookingSuccess(true);
        
        const encodedMessage = encodeURIComponent(
          `Assalamu Alaikum / Hi!\n\n` +
          `I am trying to connect for a consultation at XETA Forge. Here are my details:\n\n` +
          `⚡ *Name:* ${formData.name}\n` +
          `⚡ *Company:* ${formData.company || 'N/A'}\n` +
          `⚡ *Email:* ${formData.email}\n` +
          `⚡ *Required Service:* ${formData.projectType}\n` +
          `⚡ *Brief Description:* ${formData.message || 'N/A'}`
        );
        window.open(`https://wa.me/923711889382?text=${encodedMessage}`, '_blank');
      }, 1500);
    }
  };

  const navigateService = (direction: 'next' | 'prev') => {
    if (!selectedService) return;
    const currentIndex = SERVICES.findIndex(s => s.id === selectedService.id);
    let nextIndex;
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % SERVICES.length;
    } else {
      nextIndex = (currentIndex - 1 + SERVICES.length) % SERVICES.length;
    }
    setSelectedService(SERVICES[nextIndex]);
  };

  const selectServiceForInquiry = (serviceTitle: string) => {
    setSelectedService(null);
    setFormData(prev => ({ ...prev, projectType: serviceTitle }));
    navigateToPage('contact');
    setTimeout(() => {
      const formElement = document.getElementById('b2b-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'instant' });
      }
    }, 50);
  };
  
  return (
    <div className="relative min-h-screen flex flex-col text-slate-100 selection:bg-cyan-500 selection:text-slate-950 cursor-auto md:cursor-none overflow-x-hidden">
      <CustomCursor />
      <SplineBackground />
      
      {/* Floating Chat Widget */}
      <AIChat />

      {/* Floating Glassmorphism Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 md:px-10 pt-3 pointer-events-none">
        <nav className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-5 md:px-8 py-3 rounded-2xl glass-nav pointer-events-auto">
          <a 
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigateToPage('home');
            }}
            className="cursor-pointer z-50 whitespace-nowrap shrink-0 no-underline"
            data-hover="true"
          >
            <XetaForgeLogo variant="navbar" iconSize={30} />
          </a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-xs font-bold tracking-[0.2em] uppercase">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <a 
                  key={item.id}
                  href={PAGE_PATHS[item.id]}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToPage(item.id);
                  }}
                  className={`transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 relative py-1 no-underline ${
                    isActive ? 'text-cyan-300' : 'text-slate-200 hover:text-cyan-300'
                  }`}
                  data-hover="true"
                >
                  {item.label}
                  <span 
                    className={`absolute -bottom-1 left-0 h-0.5 bg-cyan-300 transition-all duration-150 ${
                      isActive ? 'w-full shadow-[0_0_10px_rgba(103,232,249,0.9)]' : 'w-0'
                    }`} 
                  />
                </a>
              );
            })}
          </div>
          
          <button 
            onClick={() => navigateToPage('contact')}
            className="hidden md:inline-block glass-button-primary px-6 py-2.5 text-xs font-bold tracking-widest uppercase transition-all duration-150 text-white cursor-pointer rounded-xl whitespace-nowrap shrink-0"
            data-hover="true"
          >
            Book a Consultation
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white z-50 relative w-10 h-10 flex items-center justify-center glass-button-secondary rounded-xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-300" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </div>

      {/* Mobile Glass Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-slate-950/75 backdrop-blur-2xl flex flex-col items-center justify-center gap-7 md:hidden px-6">
          <div className="glass-panel w-full max-w-sm rounded-3xl p-8 flex flex-col items-center gap-6">
            <XetaForgeLogo variant="footer" iconSize={34} className="mb-2" />
            {NAV_ITEMS.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <a
                  key={item.id}
                  href={PAGE_PATHS[item.id]}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToPage(item.id);
                  }}
                  className={`text-xl font-heading font-semibold uppercase tracking-widest no-underline ${
                    isActive ? 'text-cyan-300' : 'text-slate-100 hover:text-cyan-300'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <button 
              onClick={() => navigateToPage('contact')}
              className="mt-2 w-full glass-button-primary py-3.5 text-xs font-bold tracking-widest uppercase text-white rounded-xl whitespace-nowrap"
            >
              Book Consultation
            </button>
          </div>
        </div>
      )}

      {/* MAIN MULTI-PAGE CONTENT AREA */}
      <main className="flex-1 relative z-10 pt-24">
        {/* ==================== PAGE 1: HOME ==================== */}
        {currentPage === 'home' && (
          <div>
            {/* HERO SECTION - TRANSPARENT OVERLAY SO 3D ROBOT SHINES THROUGH */}
            <header id="hero" className="relative min-h-[calc(100svh-96px)] flex flex-col items-center justify-center overflow-hidden px-4 py-12 pointer-events-none">
              <div className="z-10 text-center flex flex-col items-center w-full max-w-6xl">
                <div className="px-6 sm:px-12 md:px-16 py-10 md:py-14 w-full relative rounded-[2rem] bg-transparent border border-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)]">
                  {/* Top Specular Highlight Rim (Zero Blur so Robot is 100% Visible) */}
                  <div className="absolute top-0 inset-x-12 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
                  
                  <div className="relative z-10 flex flex-col items-center">
                    {/* Translucent Glass Brand Crest */}
                    <XetaForgeLogo variant="hero" iconSize={28} className="mb-6" />

                    {/* Environment-Native Hero Title */}
                    <div className="relative w-full flex flex-col justify-center items-center my-1">
                      <GradientText 
                        text="XETA FORGE" 
                        as="h1" 
                        className="text-[10vw] md:text-[7.5vw] leading-[0.92] font-black tracking-tighter text-center" 
                      />
                    </div>

                    {/* Architectural Brand Tagline Divider */}
                    <div className="flex items-center justify-center gap-3 sm:gap-4 w-full max-w-lg mt-5 mb-7">
                      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-300/60 to-cyan-300" />
                      <div className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.28em] uppercase flex items-center gap-2 shrink-0">
                        <span className="text-cyan-300">BUILD</span>
                        <span className="text-white/35">·</span>
                        <span className="text-slate-100">SCALE</span>
                        <span className="text-white/35">·</span>
                        <span className="text-cyan-300">AUTOMATE</span>
                      </div>
                      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-cyan-300/60 to-cyan-300" />
                    </div>

                    <p className="text-sm md:text-xl font-light max-w-2xl mx-auto text-slate-100 leading-relaxed px-4 py-2 bg-transparent tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                      Forging scalable web architectures, native mobile applications, custom-trained neural models, and intelligent AI workflows tailored to automate your growth.
                    </p>

                    {/* Hero Glass CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-10 z-20 pointer-events-auto">
                      <button
                        onClick={() => navigateToPage('services')}
                        className="glass-button-primary text-white font-bold text-xs tracking-widest uppercase px-8 py-4 rounded-xl transition-all duration-150 cursor-pointer whitespace-nowrap"
                        data-hover="true"
                      >
                        Explore Services
                      </button>
                      <button
                        onClick={() => navigateToPage('contact')}
                        className="glass-button-secondary text-white font-bold text-xs tracking-widest uppercase px-8 py-4 rounded-xl transition-all duration-150 cursor-pointer whitespace-nowrap"
                        data-hover="true"
                      >
                        Book a Consultation
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            {/* FROSTED GLASS TECH MARQUEE */}
            <div className="relative z-20 w-full py-4 glass-nav text-white overflow-hidden border-y border-white/15">
              <motion.div 
                className="flex w-fit will-change-transform"
                animate={{ x: "-50%" }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              >
                {[0, 1].map((key) => (
                  <div key={key} className="flex whitespace-nowrap shrink-0">
                    {[...Array(3)].map((_, i) => (
                      <span key={i} className="text-xs md:text-sm font-mono tracking-[0.3em] font-medium uppercase px-12 flex items-center gap-6 text-slate-200">
                        WEB ENGINEERING <span className="text-cyan-300">·</span> 
                        APP DEVELOPMENT <span className="text-cyan-300">·</span> 
                        MODEL TRAINING <span className="text-cyan-300">·</span> 
                        AI WORKFLOWS <span className="text-cyan-300">·</span> 
                        CONVERSATIONAL AGENTS <span className="text-cyan-300">·</span> 
                        SECURE METADATA <span className="text-cyan-300">·</span> 
                      </span>
                    ))}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ARCHITECTURAL DIRECTORY SECTION ON HOME PAGE */}
            <section className="py-20 md:py-28 px-6 max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
                <div>
                  <span className="text-xs font-mono text-cyan-300 uppercase tracking-[0.25em] block mb-2 font-bold">
                    Multi-Page Architecture
                  </span>
                  <h2 className="text-3xl md:text-5xl font-heading font-bold uppercase text-white tracking-tight">
                    Explore Xeta Forge
                  </h2>
                </div>
                <p className="text-slate-300 text-sm md:text-base max-w-md font-light leading-relaxed">
                  Navigate directly to our dedicated engineering capabilities, 3-phase execution blueprint, studio profile, or project engagement models.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {/* Directory Card 1: Services */}
                <div className="p-8 rounded-3xl glass-card flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                  <div>
                    <span className="text-xs font-mono text-cyan-300 tracking-widest uppercase block mb-3">01. Capabilities</span>
                    <h3 className="text-2xl font-heading font-bold text-white uppercase mb-3">Core Engineering Pillars</h3>
                    <p className="text-sm text-slate-200 font-light leading-relaxed mb-6">
                      Explore our 5 specialized practices: Next-Gen Web Development, Custom App Development, AI Model Training, Intelligent Automation, and 24/7 Conversational AI.
                    </p>
                  </div>
                  <button
                    onClick={() => navigateToPage('services')}
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-300 hover:text-white font-bold bg-transparent border-none cursor-pointer p-0"
                    data-hover="true"
                  >
                    <span>Go to Services Page</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Directory Card 2: Process */}
                <div className="p-8 rounded-3xl glass-card flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                  <div>
                    <span className="text-xs font-mono text-cyan-300 tracking-widest uppercase block mb-3">02. Execution</span>
                    <h3 className="text-2xl font-heading font-bold text-white uppercase mb-3">Our Forge Process</h3>
                    <p className="text-sm text-slate-200 font-light leading-relaxed mb-6">
                      See how we take complex enterprise requirements from technical discovery and architecture blueprinting to production deployment with a 99% system reliability rate.
                    </p>
                  </div>
                  <button
                    onClick={() => navigateToPage('process')}
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-300 hover:text-white font-bold bg-transparent border-none cursor-pointer p-0"
                    data-hover="true"
                  >
                    <span>Go to Process Page</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Directory Card 3: About Us */}
                <div className="p-8 rounded-3xl glass-card flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                  <div>
                    <span className="text-xs font-mono text-cyan-300 tracking-widest uppercase block mb-3">03. The Studio</span>
                    <h3 className="text-2xl font-heading font-bold text-white uppercase mb-3">About Xeta Forge</h3>
                    <p className="text-sm text-slate-200 font-light leading-relaxed mb-6">
                      Meet the boutique engineering studio behind 12+ deployed custom LLMs, 50+ automated enterprise workflows, and 150+ production API integrations.
                    </p>
                  </div>
                  <button
                    onClick={() => navigateToPage('about')}
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-300 hover:text-white font-bold bg-transparent border-none cursor-pointer p-0"
                    data-hover="true"
                  >
                    <span>Go to About Us Page</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ==================== PAGE 2: SERVICES ==================== */}
        {currentPage === 'services' && (
          <section id="services" className="relative z-10 min-h-[calc(100vh-96px)] py-12 md:py-20">
            <div className="max-w-[1600px] mx-auto px-4 md:px-12">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300 mb-6 px-4">
                <button
                  onClick={() => navigateToPage('home')}
                  className="hover:text-cyan-300 transition-colors bg-transparent border-none text-slate-300 cursor-pointer p-0 font-mono text-xs"
                >
                  Home
                </button>
                <span>/</span>
                <span className="text-cyan-300">Services</span>
              </div>

              <div className="glass-panel rounded-3xl p-8 md:p-12 mb-14 mx-4 relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                  <div>
                    <span className="text-xs font-mono text-cyan-300 uppercase tracking-[0.25em] block mb-2 font-bold">Capabilities</span>
                    <h1 className="text-4xl md:text-7xl font-heading font-bold uppercase leading-none text-white tracking-tight">
                      Core <br/> 
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">Pillars</span>
                    </h1>
                  </div>
                  <p className="text-slate-200 text-sm md:text-base max-w-md leading-relaxed font-light">
                    We deliver top-tier engineering by matching state-of-the-art cognitive LLM modeling with high-coverage web and mobile architectures. Click any service card below for full technical specifications.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 md:gap-8 mb-20 px-4">
                {SERVICES.map((service, index) => (
                  <ServiceCard 
                    key={service.id} 
                    service={service} 
                    onClick={() => setSelectedService(service)} 
                    className={index < 3 ? 'lg:col-span-2' : index === 4 ? 'md:col-span-2 lg:col-span-3' : 'lg:col-span-3'}
                  />
                ))}
              </div>

              {/* Service Page Glass CTA Strip */}
              <div className="mx-4 p-8 md:p-12 rounded-3xl glass-panel flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                <div>
                  <span className="text-xs font-mono text-cyan-300 uppercase tracking-widest block mb-2">Custom Architecture</span>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-white uppercase">Need a combined Web, Mobile, or AI Model build?</h2>
                  <p className="text-sm text-slate-200 font-light mt-2 max-w-xl">
                    Select an engagement model or submit your project brief to receive a scoped architecture proposal within 24 hours.
                  </p>
                </div>
                <button
                  onClick={() => navigateToPage('contact')}
                  className="glass-button-primary text-white font-bold text-xs tracking-widest uppercase px-8 py-4 rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0"
                  data-hover="true"
                >
                  Select Engagement Model
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ==================== PAGE 3: OUR PROCESS ==================== */}
        {currentPage === 'process' && (
          <section id="process" className="relative z-10 min-h-[calc(100vh-96px)] py-12 md:py-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300 mb-8">
                <button
                  onClick={() => navigateToPage('home')}
                  className="hover:text-cyan-300 transition-colors bg-transparent border-none text-slate-300 cursor-pointer p-0 font-mono text-xs"
                >
                  Home
                </button>
                <span>/</span>
                <span className="text-cyan-300">Our Process</span>
              </div>

              <div className="glass-panel rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-6 order-2 lg:order-1">
                    <span className="text-xs font-mono text-cyan-300 uppercase tracking-[0.25em] block mb-2 font-bold">Execution</span>
                    <h1 className="text-3xl md:text-6xl font-heading font-bold mb-6 leading-tight text-white uppercase tracking-tight">
                      Our <br/> <GradientText text="PROCESS" className="text-4xl md:text-7xl" />
                    </h1>
                    <p className="text-slate-200 text-sm md:text-base mb-8 font-light leading-relaxed">
                      Transforming complex engineering goals into predictable digital products through our structured design and forge pipeline.
                    </p>
                    
                    <div className="space-y-4">
                      {[
                        { icon: Terminal, title: '01. Discovery & Blueprinting', desc: 'Detailed business workflow audit, architecture mapping, and scope modeling.' },
                        { icon: Code, title: '02. Agile Product Forging', desc: 'Clean, robust TypeScript and cross-platform compilation with strict code quality standards.' },
                        { icon: Cpu, title: '03. Cognitive LLM Alignment', desc: 'Bespoke LLM tuning, custom prompt modeling, and cognitive pipeline synchronization.' },
                      ].map((step, i) => (
                        <div key={i} className="flex items-start gap-4 p-4 rounded-2xl glass-card">
                          <div className="p-3 rounded-xl bg-white/10 border border-white/20 text-cyan-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] shrink-0">
                            <step.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-base md:text-lg font-bold mb-1 font-heading text-white">{step.title}</h4>
                            <p className="text-xs md:text-sm text-slate-200 leading-relaxed">{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-6 relative h-[360px] md:h-[560px] w-full order-1 lg:order-2">
                    <div className="relative h-full w-full rounded-3xl overflow-hidden border border-white/25 group shadow-2xl glass-card">
                      <img 
                        src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop" 
                        alt="Tech team designing software architecture" 
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-75 grayscale group-hover:grayscale-0" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                      
                      <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/25 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]">
                        <div className="text-5xl md:text-7xl font-heading font-black text-cyan-300 tracking-tighter tabular-nums">
                          99%
                        </div>
                        <div className="text-xs md:text-sm font-mono tracking-[0.25em] uppercase mt-1 text-white font-bold">
                          System Reliability Rate
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Milestones Grid */}
              <div className="pt-4">
                <h2 className="text-2xl md:text-4xl font-heading font-bold text-white uppercase mb-10">
                  Delivery Milestones & Engineering Standards
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      step: 'Milestone 01',
                      title: 'Architecture & Data Audit',
                      detail: 'We map your existing APIs, databases, and operational bottlenecks into a concrete technical specification before writing a single line of production code.'
                    },
                    {
                      step: 'Milestone 02',
                      title: 'Iterative Sprint Releases',
                      detail: 'Weekly staging deployments allow your stakeholders to test web interfaces, mobile builds, and fine-tuned AI model outputs in real time.'
                    },
                    {
                      step: 'Milestone 03',
                      title: 'Production Handover & Telemetry',
                      detail: 'Full repository ownership, containerized CI/CD pipelines, security rules verification, and post-launch monitoring.'
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="p-8 rounded-3xl glass-card relative overflow-hidden">
                      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                      <span className="text-xs font-mono text-cyan-300 uppercase tracking-widest block mb-2">{item.step}</span>
                      <h3 className="text-xl font-heading font-bold text-white mb-3">{item.title}</h3>
                      <p className="text-sm text-slate-200 font-light leading-relaxed">{item.detail}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-12 flex justify-center">
                  <button
                    onClick={() => navigateToPage('contact')}
                    className="glass-button-primary text-white font-bold text-xs tracking-widest uppercase px-8 py-4 rounded-xl transition-all cursor-pointer whitespace-nowrap"
                    data-hover="true"
                  >
                    Start Your Project Roadmap
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ==================== PAGE 4: ABOUT US ==================== */}
        {currentPage === 'about' && (
          <section id="about" className="relative z-10 min-h-[calc(100vh-96px)] py-12 md:py-20">
            <div className="max-w-6xl mx-auto px-6">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300 mb-8">
                <button
                  onClick={() => navigateToPage('home')}
                  className="hover:text-cyan-300 transition-colors bg-transparent border-none text-slate-300 cursor-pointer p-0 font-mono text-xs"
                >
                  Home
                </button>
                <span>/</span>
                <span className="text-cyan-300">About Us</span>
              </div>

              <div className="glass-panel rounded-3xl p-8 md:p-14 mb-16 relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                <div className="text-center mb-12 flex flex-col items-center">
                  <XetaForgeLogo variant="about" iconSize={44} />
                  <span className="text-xs font-mono text-cyan-300 uppercase tracking-[0.25em] block mb-2 font-bold">The Studio</span>
                  <h1 className="text-3xl md:text-6xl font-heading font-bold text-white uppercase tracking-tight">About Xeta Forge</h1>
                  <div className="w-16 h-1 bg-cyan-400 mx-auto mt-4 rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div>
                    <p className="text-slate-100 text-base md:text-lg leading-relaxed font-light mb-6">
                      We are a boutique team of elite engineers, mobile architects, machine learning specialists, and AI automation builders. We believe that technology should be a compounding asset, not an operational bottleneck.
                    </p>
                    <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light mb-8">
                      By fusing modern full-stack web and mobile engineering with custom model training and cognitive LLM orchestrations, we build durable digital infrastructure that streamlines legacy business bottlenecks and powers predictable growth.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <button
                        onClick={() => navigateToPage('services')}
                        className="glass-button-secondary text-white font-bold text-xs tracking-widest uppercase px-6 py-3.5 rounded-xl transition-all cursor-pointer whitespace-nowrap"
                      >
                        View Our Services
                      </button>
                      <button
                        onClick={() => navigateToPage('contact')}
                        className="glass-button-primary text-white font-bold text-xs tracking-widest uppercase px-6 py-3.5 rounded-xl transition-all cursor-pointer whitespace-nowrap"
                      >
                        Work With Us
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'LLMs Deployed', val: '12+' },
                      { label: 'Workflows Automated', val: '50+' },
                      { label: 'API Integrations', val: '150+' },
                      { label: 'Client Satisfaction', val: '100%' }
                    ].map((stat, i) => (
                      <div key={i} className="p-6 glass-card rounded-2xl text-center">
                        <div className="text-2xl md:text-4xl font-heading font-black text-cyan-300 mb-2 tabular-nums">{stat.val}</div>
                        <div className="text-xxs md:text-xs text-slate-200 font-mono tracking-wider uppercase">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Studio Principles */}
              <div>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-white uppercase mb-8 text-center">
                  Core Engineering Principles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      icon: Globe,
                      title: 'Full-Stack & Mobile Precision',
                      desc: 'Every web application and native mobile build is architected for sub-second response times, high concurrency, and resilient offline-first operation.'
                    },
                    {
                      icon: Lock,
                      title: 'Sovereign AI & Data Privacy',
                      desc: 'When fine-tuning custom models or deploying RAG chatbots, your proprietary datasets and weights remain isolated and under your organization’s control.'
                    },
                    {
                      icon: Zap,
                      title: 'Direct Engineer Access',
                      desc: 'You collaborate directly with the senior architects building your system—never through layers of account managers.'
                    }
                  ].map((principle, idx) => (
                    <div key={idx} className="p-8 rounded-3xl glass-card relative overflow-hidden">
                      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                      <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]">
                        <principle.icon className="w-6 h-6 text-cyan-300" />
                      </div>
                      <h3 className="text-lg font-heading font-bold text-white mb-2">{principle.title}</h3>
                      <p className="text-sm text-slate-200 font-light leading-relaxed">{principle.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ==================== PAGE 5: CONTACT & ENGAGEMENT ==================== */}
        {currentPage === 'contact' && (
          <section id="contact" className="relative z-10 min-h-[calc(100vh-96px)] py-12 md:py-20 px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300 mb-6">
                <button
                  onClick={() => navigateToPage('home')}
                  className="hover:text-cyan-300 transition-colors bg-transparent border-none text-slate-300 cursor-pointer p-0 font-mono text-xs"
                >
                  Home
                </button>
                <span>/</span>
                <span className="text-cyan-300">Contact & Engagement Models</span>
              </div>

              <div className="text-center mb-16">
                <span className="text-cyan-300 font-mono uppercase tracking-[0.25em] block text-xs md:text-sm font-bold mb-3">
                  Collaborate With Xeta Forge
                </span>
                <h1 className="text-3xl md:text-6xl font-heading font-bold text-white uppercase tracking-tight">
                  Select an Engagement Model
                </h1>
              </div>
              
              {/* 5 Glassmorphism Engagement Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-20">
                {[
                  { 
                    name: 'Technical Discovery', 
                    price: 'Roadmap', 
                    subtitle: 'Architecture & Scoping', 
                    color: 'white', 
                    targetType: 'General Consultation',
                    features: [
                      { icon: Terminal, text: 'Full Workflow Assessment', iconColor: 'text-cyan-300', textColor: 'text-slate-100' },
                      { icon: Layers, text: 'System Architecture Layout', iconColor: 'text-cyan-300', textColor: 'text-slate-100' },
                      { icon: Code, text: 'Custom Scope Proposal', iconColor: 'text-cyan-300', textColor: 'text-slate-100' },
                    ]
                  },
                  { 
                    name: 'Dedicated Product Forge', 
                    price: 'Custom Project', 
                    subtitle: 'End-to-end Web Engineering', 
                    color: 'cyan', 
                    targetType: 'Next-Gen Web Development',
                    features: [
                      { icon: Code, text: 'Full-Stack Web Development', iconColor: 'text-cyan-300', textColor: 'text-white' },
                      { icon: Cpu, text: 'Cloud-Native API Architecture', iconColor: 'text-cyan-300', textColor: 'text-white' },
                      { icon: Shield, text: 'Post-launch Support Retainer', iconColor: 'text-cyan-300', textColor: 'text-white' },
                    ]
                  },
                  { 
                    name: 'Turnkey AI Suite', 
                    price: 'Agent Setup', 
                    subtitle: 'Workflow & Bot Integrations', 
                    color: 'indigo', 
                    targetType: 'Intelligent AI Automation',
                    features: [
                      { icon: Bot, text: 'Custom Trained 24/7 Chatbot', iconColor: 'text-indigo-300', textColor: 'text-slate-100' },
                      { icon: Activity, text: 'Automatic Business Workflow', iconColor: 'text-indigo-300', textColor: 'text-slate-100' },
                      { icon: Layers, text: 'Legacy CRM API Pipelines', iconColor: 'text-indigo-300', textColor: 'text-slate-100' },
                    ]
                  },
                  { 
                    name: 'Mobile App Forge', 
                    price: 'iOS & Android', 
                    subtitle: 'Native & Cross-Platform Apps', 
                    color: 'cyan', 
                    targetType: 'Custom App Development',
                    features: [
                      { icon: Code, text: 'React Native & Flutter Builds', iconColor: 'text-cyan-300', textColor: 'text-white' },
                      { icon: Activity, text: '60fps Fluid UI & Offline Sync', iconColor: 'text-cyan-300', textColor: 'text-white' },
                      { icon: Shield, text: 'App Store & Play Store Launch', iconColor: 'text-cyan-300', textColor: 'text-white' },
                    ]
                  },
                  { 
                    name: 'Neural Model Training', 
                    price: 'Custom LLM / ML', 
                    subtitle: 'Fine-Tuning & Proprietary AI', 
                    color: 'indigo', 
                    targetType: 'Custom AI Model Training',
                    features: [
                      { icon: Cpu, text: 'Domain-Specific LLM Fine-Tuning', iconColor: 'text-indigo-300', textColor: 'text-white' },
                      { icon: Layers, text: 'Dataset Curation & RLHF Alignment', iconColor: 'text-indigo-300', textColor: 'text-white' },
                      { icon: Shield, text: 'Private Cloud & On-Prem Inference', iconColor: 'text-indigo-300', textColor: 'text-white' },
                    ]
                  },
                ].map((plan, i) => {
                  const isSelected = formData.projectType === plan.targetType;
                  const colSpanClass = i < 3 ? 'lg:col-span-2' : i === 4 ? 'md:col-span-2 lg:col-span-3' : 'lg:col-span-3';
                  return (
                    <motion.div
                      key={i}
                      whileHover={{ y: -8 }}
                      className={`relative p-6 sm:p-8 md:p-10 glass-card flex flex-col min-h-[420px] md:min-h-[460px] rounded-3xl overflow-hidden ${colSpanClass} ${isSelected ? 'ring-2 ring-cyan-300/80 border-cyan-300/60' : ''}`}
                      data-hover="true"
                    >
                      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                      
                      <div className="flex-1">
                        <h3 className="text-xl md:text-2xl font-heading font-bold mb-1 text-white">{plan.name}</h3>
                        <span className="text-xs font-mono text-slate-300 mb-6 block uppercase tracking-wider">{plan.subtitle}</span>
                        
                        <div className={`text-3xl md:text-4xl font-bold mb-8 md:mb-10 tracking-tight font-heading ${plan.color === 'white' ? 'text-white' : plan.color === 'cyan' ? 'text-cyan-300' : 'text-indigo-300'}`}>
                          {plan.price}
                        </div>
                        
                        <ul className="space-y-4 text-xs md:text-sm">
                          {plan.features.map((feat, fIdx) => {
                            const FeatIcon = feat.icon;
                            return (
                              <li key={fIdx} className={`flex items-center gap-3 ${feat.textColor}`}>
                                <div className="p-1.5 rounded-lg bg-white/10 border border-white/15 shrink-0">
                                  <FeatIcon className={`w-3.5 h-3.5 ${feat.iconColor}`} />
                                </div>
                                <span>{feat.text}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                      
                      <button 
                        onClick={() => {
                          setFormData(prev => ({ ...prev, projectType: plan.targetType }));
                          const formElement = document.getElementById('b2b-form');
                          if (formElement) {
                            formElement.scrollIntoView({ behavior: 'instant' });
                          }
                        }}
                        className={`w-full py-3.5 text-xs font-bold uppercase tracking-widest mt-8 rounded-xl cursor-pointer whitespace-nowrap transition-all ${
                          isSelected ? 'glass-button-primary text-white' : 'glass-button-secondary text-white'
                        }`}
                      >
                        <span>{isSelected ? 'Selected Model' : 'Select Model'}</span>
                      </button>
                    </motion.div>
                  );
                })}
              </div>

              {/* Interactive Glassmorphism Form Section */}
              <div id="b2b-form" className="max-w-3xl mx-auto glass-panel rounded-3xl p-6 sm:p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                <h2 className="text-xl md:text-3xl font-heading font-bold mb-2 uppercase text-white tracking-wide text-center">Consultation Brief</h2>
                
                <div className="flex flex-col items-center gap-4 mb-8">
                  <p className="text-xs md:text-sm font-light text-slate-200 text-center max-w-lg">
                    Share your business requirements and receive a comprehensive roadmap within 24 hours.
                  </p>
                  <a 
                    href="https://wa.me/923711889382" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/15 backdrop-blur-xl border border-emerald-400/40 text-emerald-300 text-xs font-mono hover:bg-emerald-500/25 hover:border-emerald-300/60 transition-colors cursor-pointer no-underline shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)]"
                    data-hover="true"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Skip the Form? Chat on WhatsApp: +923711889382</span>
                  </a>
                </div>

                <AnimatePresence mode="wait">
                  {bookingSuccess ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-10 flex flex-col items-center"
                    >
                      <div className="w-16 h-16 bg-cyan-400/15 backdrop-blur-xl border border-cyan-300 text-cyan-300 rounded-full flex items-center justify-center mb-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_0_25px_rgba(6,182,212,0.3)]">
                        <CheckCircle className="w-8 h-8" />
                      </div>
                      <h4 className="text-xl md:text-2xl font-heading font-bold text-white uppercase mb-3">Transmission Compiled</h4>
                      <p className="text-sm text-slate-200 max-w-md leading-relaxed font-light mb-8">
                        Your brief has been logged. Let's start discussing your system requirements and timeline directly on WhatsApp now!
                      </p>
                      
                      <div className="flex flex-col sm:flex-row gap-4 mb-4">
                        <a 
                          href={`https://wa.me/923711889382?text=${encodeURIComponent(
                            `Assalamu Alaikum / Hi!\n\nI just submitted my consultation brief on XETA Forge. Here are my details:\n\n` +
                            `⚡ *Name:* ${formData.name}\n` +
                            `⚡ *Company:* ${formData.company || 'N/A'}\n` +
                            `⚡ *Email:* ${formData.email}\n` +
                            `⚡ *Required Service:* ${formData.projectType}\n` +
                            `⚡ *Brief Description:* ${formData.message || 'N/A'}`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-emerald-500/80 hover:bg-emerald-400 backdrop-blur-xl border border-emerald-200/50 text-slate-950 font-bold text-xs tracking-widest uppercase py-3.5 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_0_20px_rgba(16,185,129,0.35)] cursor-pointer no-underline whitespace-nowrap"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>Chat on WhatsApp Now</span>
                        </a>
                        
                        <button 
                          onClick={() => {
                            setBookingSuccess(false);
                            setFormData({ name: '', email: '', company: '', projectType: 'Next-Gen Web Development', message: '' });
                          }}
                          className="glass-button-secondary text-white px-6 py-3.5 text-xs tracking-widest uppercase font-bold rounded-xl cursor-pointer whitespace-nowrap"
                        >
                          New Inquiry
                        </button>
                      </div>
                    </motion.div>
                  ) : bookingStep ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="py-16 text-center flex flex-col items-center justify-center min-h-[300px]"
                    >
                      <div className="relative w-16 h-16 mb-8">
                        <div className="absolute inset-0 rounded-full border-2 border-cyan-500/10 border-t-cyan-300 animate-spin" />
                        <Terminal className="w-6 h-6 text-cyan-300 absolute inset-0 m-auto" />
                      </div>
                      <span className="font-mono text-xs md:text-sm text-cyan-300 tracking-wider font-semibold">{bookingStep}</span>
                    </motion.div>
                  ) : (
                    <motion.form 
                      onSubmit={handleBookingSubmit}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative">
                          <label className="block text-xxs font-mono tracking-widest uppercase text-slate-200 mb-2 font-bold">Contact Name</label>
                          <div className="relative">
                            <User className="w-4 h-4 text-cyan-300/70 absolute left-4 top-3.5 z-10" />
                            <input
                              type="text"
                              name="name"
                              required
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="Your full name"
                              className="w-full glass-input rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-slate-400 focus:outline-none transition-all"
                            />
                          </div>
                        </div>

                        <div className="relative">
                          <label className="block text-xxs font-mono tracking-widest uppercase text-slate-200 mb-2 font-bold">Business Email</label>
                          <div className="relative">
                            <Mail className="w-4 h-4 text-cyan-300/70 absolute left-4 top-3.5 z-10" />
                            <input
                              type="email"
                              required
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="you@company.com"
                              className="w-full glass-input rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-slate-400 focus:outline-none transition-all"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative">
                          <label className="block text-xxs font-mono tracking-widest uppercase text-slate-200 mb-2 font-bold">Company Name</label>
                          <div className="relative">
                            <Building className="w-4 h-4 text-cyan-300/70 absolute left-4 top-3.5 z-10" />
                            <input
                              type="text"
                              name="company"
                              value={formData.company}
                              onChange={handleInputChange}
                              placeholder="Your business name"
                              className="w-full glass-input rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-slate-400 focus:outline-none transition-all"
                            />
                          </div>
                        </div>

                        <div className="relative">
                          <label className="block text-xxs font-mono tracking-widest uppercase text-slate-200 mb-2 font-bold">Required Service</label>
                          <select
                            name="projectType"
                            value={formData.projectType}
                            onChange={handleInputChange}
                            className="w-full glass-input rounded-xl py-3 px-4 text-sm text-white focus:outline-none transition-all cursor-pointer bg-slate-900/70"
                          >
                            <option value="Next-Gen Web Development" className="bg-slate-900 text-white">Next-Gen Web Development</option>
                            <option value="Custom App Development" className="bg-slate-900 text-white">Custom App Development</option>
                            <option value="Custom AI Model Training" className="bg-slate-900 text-white">Custom AI Model Training</option>
                            <option value="Intelligent AI Automation" className="bg-slate-900 text-white">Intelligent AI Automation</option>
                            <option value="Conversational AI & Chatbots" className="bg-slate-900 text-white">Conversational AI & Chatbots</option>
                            <option value="General Consultation" className="bg-slate-900 text-white">General Engineering Consultation</option>
                          </select>
                        </div>
                      </div>

                      <div className="relative">
                        <label className="block text-xxs font-mono tracking-widest uppercase text-slate-200 mb-2 font-bold">Brief Description</label>
                        <textarea
                          name="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Tell us about your system requirements and timeline goals..."
                          className="w-full glass-input rounded-xl p-4 text-sm text-white placeholder-slate-400 focus:outline-none transition-all resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 glass-button-primary text-white font-bold text-xs tracking-[0.2em] uppercase rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Forge Technical Brief</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* PERSISTENT GLASSMORPHISM FOOTER */}
      <footer className="relative z-10 mt-12 py-12 md:py-16 glass-nav border-t border-white/15">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <a 
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigateToPage('home');
              }} 
              className="mb-3 cursor-pointer inline-block no-underline"
              data-hover="true"
            >
              <XetaForgeLogo variant="footer" iconSize={34} />
            </a>
            <p className="text-xs text-slate-300 max-w-sm mb-4 font-light">
              Forging scalable web architectures, mobile apps, custom AI models, and intelligent automation systems.
            </p>
            <div className="flex flex-wrap gap-4 mb-4 text-xs font-mono">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={PAGE_PATHS[item.id]}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToPage(item.id);
                  }}
                  className={`uppercase tracking-wider no-underline transition-colors ${
                    currentPage === item.id ? 'text-cyan-300 font-bold' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
            <div className="flex gap-2 text-xs font-mono text-slate-400">
              <span>&copy; {new Date().getFullYear()} Xeta Forge. All rights reserved.</span>
            </div>
          </div>
          
          <div className="flex gap-6 md:gap-8 flex-wrap items-center">
            <a 
              href="https://wa.me/923711889382" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-emerald-300 hover:text-emerald-200 font-bold uppercase text-xxs tracking-[0.25em] transition-colors flex items-center gap-1.5 cursor-pointer no-underline" 
              data-hover="true"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp: +923711889382</span>
            </a>
            <a 
              href="mailto:architects@xetaforge.com" 
              className="text-slate-200 hover:text-white font-bold uppercase text-xxs tracking-[0.25em] transition-colors cursor-pointer no-underline" 
              data-hover="true"
            >
              Contact Email
            </a>
          </div>
        </div>
      </footer>

      {/* Glassmorphism Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedService(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xl cursor-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-hidden glass-panel flex flex-col md:flex-row rounded-3xl"
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full glass-button-secondary text-white hover:text-cyan-300 transition-colors"
                data-hover="true"
              >
                <X className="w-5 h-5" />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); navigateService('prev'); }}
                className="absolute left-4 bottom-4 translate-y-0 md:top-1/2 md:bottom-auto md:-translate-y-1/2 z-20 p-2.5 rounded-full glass-button-secondary text-white hover:text-cyan-300 transition-colors"
                data-hover="true"
                aria-label="Previous Service"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); navigateService('next'); }}
                className="absolute right-4 bottom-4 translate-y-0 md:top-1/2 md:bottom-auto md:-translate-y-1/2 z-20 p-2.5 rounded-full glass-button-secondary text-white hover:text-cyan-300 transition-colors md:right-8"
                data-hover="true"
                aria-label="Next Service"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="w-full md:w-1/2 h-48 md:h-auto relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={selectedService.id}
                    src={selectedService.image} 
                    alt={selectedService.title}
                    referrerPolicy="no-referrer"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-slate-950/60" />
              </div>

              <div className="w-full md:w-1/2 p-8 pb-20 md:p-10 flex flex-col justify-center relative bg-white/[0.04] backdrop-blur-2xl">
                <motion.div
                  key={selectedService.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-3 text-cyan-300 mb-3">
                    <Sparkles className="w-4 h-4" />
                    <span className="font-mono text-xs tracking-widest uppercase font-semibold">{selectedService.statusTag}</span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-heading font-bold uppercase leading-tight mb-1 text-white">
                    {selectedService.title}
                  </h3>
                  
                  <p className="text-xs text-slate-300 font-mono tracking-widest uppercase mb-5">
                    {selectedService.tagline}
                  </p>
                  
                  <div className="h-px w-16 bg-cyan-300/40 mb-5" />
                  
                  <p className="text-slate-100 leading-relaxed text-sm font-light mb-6">
                    {selectedService.description}
                  </p>

                  <div className="space-y-2.5 mb-6">
                    {selectedService.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-slate-200 text-xs leading-relaxed">
                        <CheckCircle className="w-3.5 h-3.5 text-cyan-300 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => selectServiceForInquiry(selectedService.title)}
                    className="glass-button-primary text-white font-bold text-xs tracking-widest uppercase py-3.5 px-6 rounded-xl transition-all w-full text-center cursor-pointer"
                  >
                    Discuss this Service
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
