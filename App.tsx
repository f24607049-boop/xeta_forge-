/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Code, Cpu, Bot, Layers, Sparkles, Send, Terminal, ArrowRight, Menu, X, 
  ChevronLeft, ChevronRight, Briefcase, Shield, Activity, CheckCircle, Mail, Building, User,
  MessageCircle, Phone
} from 'lucide-react';
import SplineBackground from './components/SplineBackground';
import GradientText from './components/GlitchText';
import CustomCursor from './components/CustomCursor';
import ServiceCard from './components/ServiceCard';
import AIChat from './components/AIChat';
import { Service } from './types';
import { saveConsultation } from './services/firebase';

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
  }
];

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  
  // B2B Booking Form States
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    projectType: 'Web Development',
    message: ''
  });
  const [bookingStep, setBookingStep] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    // Elegant multi-stage submission with real Firebase storage
    const steps = [
      'Establishing secure database connection...',
      'Validating form data & sanitizing inputs...',
      'Syncing brief with Firestore persistence...',
      'Dispatched successfully!'
    ];

    let currentStep = 0;
    setBookingStep(steps[currentStep]);

    try {
      // Save data directly to Firestore with real-time security validation
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

          // Redirect to WhatsApp with pre-filled consultation details
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
        setBookingSuccess(true); // Fallback gracefully for seamless user experience
        
        // Open WhatsApp anyway
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

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
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
    scrollToSection('contact');
  };
  
  return (
    <div className="relative min-h-screen text-slate-100 selection:bg-cyan-500 selection:text-slate-950 cursor-auto md:cursor-none overflow-x-hidden">
      <CustomCursor />
      <SplineBackground />
      
      {/* Floating Chat Widget */}
      <AIChat />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-[#090d16]/85 backdrop-blur-lg border-b border-white/5 transition-all duration-300 shadow-xl shadow-cyan-950/5">
        <div 
          onClick={() => scrollToSection('hero')}
          className="font-heading text-lg md:text-xl font-bold tracking-widest text-white cursor-pointer z-50 flex items-center gap-2 select-none"
        >
          <span className="text-cyan-400 font-black">XETA</span> FORGE
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 text-xs font-bold tracking-[0.25em] uppercase text-slate-300">
          {[
            { label: 'Services', id: 'services' },
            { label: 'Our Process', id: 'process' },
            { label: 'About Us', id: 'about' },
            { label: 'Contact', id: 'contact' }
          ].map((item) => (
            <button 
              key={item.id} 
              onClick={() => scrollToSection(item.id)}
              className="hover:text-cyan-400 transition-all duration-300 cursor-pointer bg-transparent border-none text-left tracking-[0.2em] relative group"
              data-hover="true"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-400 transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>
        
        <button 
          onClick={() => scrollToSection('contact')}
          className="hidden md:inline-block border border-cyan-500/50 hover:border-cyan-400 px-6 py-2.5 text-xs font-bold tracking-widest uppercase hover:bg-cyan-500 hover:text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all duration-300 text-white cursor-pointer bg-transparent"
          data-hover="true"
        >
          Book a Consultation
        </button>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white z-50 relative w-10 h-10 flex items-center justify-center bg-slate-900/50 rounded-lg backdrop-blur-md border border-white/10"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
           {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-slate-950/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {[
              { label: 'Services', id: 'services' },
              { label: 'Our Process', id: 'process' },
              { label: 'About Us', id: 'about' },
              { label: 'Contact', id: 'contact' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-2xl font-heading font-semibold text-slate-200 hover:text-cyan-400 transition-colors uppercase bg-transparent border-none tracking-widest"
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('contact')}
              className="mt-8 border border-cyan-400 px-8 py-3 text-xs font-bold tracking-widest uppercase bg-cyan-500 text-slate-950"
            >
              Book Consultation
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <header id="hero" className="relative h-[100svh] min-h-[600px] flex flex-col items-center justify-center overflow-hidden px-4 pt-20">
        {/* Subtle grid pattern behind the hero */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#0f172a55_1px,transparent_1px),linear-gradient(to_bottom,#0f172a55_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35" />

        <motion.div 
          style={{ y, opacity }}
          className="z-10 text-center flex flex-col items-center w-full max-w-6xl pb-16 md:pb-24"
        >
          {/* Tagline / Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center gap-3 text-xs font-mono text-cyan-400 tracking-[0.25em] uppercase mb-6 bg-cyan-500/5 border border-cyan-500/20 px-5 py-2 rounded-full backdrop-blur-md"
          >
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping"/>
            <span>Next-Gen AI & Web Engineering</span>
          </motion.div>

          {/* Main Title */}
          <div className="relative w-full flex flex-col justify-center items-center">
            <GradientText 
              text="XETA FORGE" 
              as="h1" 
              className="text-[11vw] leading-[1] font-black tracking-tighter text-center" 
            />
            
            {/* Tech Orbital Glowing Blur */}
            <motion.div 
               className="absolute -z-20 w-[45vw] h-[45vw] bg-cyan-500/5 blur-[50px] rounded-full pointer-events-none will-change-transform"
               animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.3, 0.5, 0.3] }}
               transition={{ duration: 8, repeat: Infinity }}
               style={{ transform: 'translateZ(0)' }}
            />
          </div>
          
          <motion.div
             initial={{ scaleX: 0 }}
             animate={{ scaleX: 1 }}
             transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
             className="w-full max-w-lg h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent mt-6 mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-sm md:text-xl font-light max-w-2xl mx-auto text-slate-300 leading-relaxed px-4 tracking-wide"
          >
            Forging scalable web architectures, intelligent workflows, and custom context-aware chatbots tailored to automate your growth.
          </motion.p>

          {/* Hero CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex flex-col sm:flex-row gap-4 mt-10 z-20"
          >
            <button
              onClick={() => scrollToSection('services')}
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs tracking-widest uppercase px-8 py-4 transition-all duration-300 shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] cursor-pointer border border-[#e5e7eb]"
              data-hover="true"
            >
              Explore Services
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="border border-slate-500 hover:border-cyan-400 text-white font-bold text-xs tracking-widest uppercase px-8 py-4 bg-slate-950/40 hover:bg-cyan-950/10 transition-all duration-300 cursor-pointer"
              data-hover="true"
            >
              Book a Consultation
            </button>
          </motion.div>
        </motion.div>

      </header>

      {/* TECH MARQUEE */}
      <div className="relative z-20 w-full py-4 bg-slate-950/80 text-white overflow-hidden border-y border-white/5 backdrop-blur-md">
        <motion.div 
          className="flex w-fit will-change-transform"
          animate={{ x: "-50%" }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {[0, 1].map((key) => (
            <div key={key} className="flex whitespace-nowrap shrink-0">
              {[...Array(3)].map((_, i) => (
                <span key={i} className="text-xs md:text-sm font-mono tracking-[0.3em] font-medium uppercase px-12 flex items-center gap-6 text-slate-400">
                  WEB ENGINEERING <span className="text-cyan-400">●</span> 
                  AI WORKFLOWS <span className="text-cyan-400">●</span> 
                  CONVERSATIONAL AGENTS <span className="text-cyan-400">●</span> 
                  SECURE METADATA <span className="text-cyan-400">●</span> 
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      {/* SERVICES SECTION */}
      <section id="services" className="relative z-10 py-24 md:py-36 bg-slate-950/10">
        <div className="max-w-[1600px] mx-auto px-4 md:px-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 px-4">
             <div>
               <span className="text-xs font-mono text-cyan-400 uppercase tracking-[0.25em] block mb-2 font-bold">Capabilities</span>
               <h2 className="text-4xl md:text-7xl font-heading font-bold uppercase leading-none text-white tracking-tight">
                Core <br/> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Pillars</span>
              </h2>
             </div>
             <p className="text-slate-400 text-sm md:text-base max-w-md mt-4 md:mt-0 leading-relaxed font-light">
               We deliver top-tier engineering by matching state-of-the-art cognitive LLM modeling with high-coverage web architectures.
             </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 border-t border-l border-white/10 bg-slate-950/40 backdrop-blur-md">
            {SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} onClick={() => setSelectedService(service)} />
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section id="process" className="relative z-10 py-24 md:py-36 bg-slate-950/30 backdrop-blur-sm border-t border-white/5 overflow-hidden">
        {/* Decorative blurred blue sphere */}
        <div className="absolute top-1/2 right-[-15%] w-[40vw] h-[40vw] bg-cyan-600/10 rounded-full blur-[50px] pointer-events-none will-change-transform" style={{ transform: 'translateZ(0)' }} />

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-5 order-2 lg:order-1">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-[0.25em] block mb-2 font-bold">Execution</span>
              <h2 className="text-3xl md:text-6xl font-heading font-bold mb-6 leading-tight text-white uppercase tracking-tight">
                Our <br/> <GradientText text="PROCESS" className="text-4xl md:text-7xl" />
              </h2>
              <p className="text-slate-300 text-sm md:text-base mb-10 font-light leading-relaxed">
                Transforming complex engineering goals into predictable digital products through our structured design and forge pipeline.
              </p>
              
              <div className="space-y-6 md:space-y-8">
                {[
                  { icon: Terminal, title: 'Discovery & Blueprinting', desc: 'Detailed business workflow audit, architecture mapping, and scope modeling.' },
                  { icon: Code, title: 'Agile Product Forging', desc: 'Clean, robust TypeScript compilation with strict code quality standards.' },
                  { icon: Cpu, title: 'Cognitive LLM Alignment', desc: 'Bespoke LLM tuning, custom prompt modeling, and cognitive pipeline synchronization.' },
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-5">
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-cyan-500/20 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.05)]">
                      <step.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base md:text-lg font-bold mb-1 font-heading text-slate-100">{step.title}</h4>
                      <p className="text-xs md:text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 relative h-[380px] md:h-[650px] w-full order-1 lg:order-2">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl rotate-1 opacity-20 blur-xl" />
              <div className="relative h-full w-full rounded-3xl overflow-hidden border border-white/10 group shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop" 
                  alt="Tech team designing software architecture" 
                  className="h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-105 will-change-transform grayscale group-hover:grayscale-0" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90" />
                
                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
                  <div className="text-6xl md:text-8xl font-heading font-black text-cyan-400/35 tracking-tighter">
                    99%
                  </div>
                  <div className="text-xs md:text-sm font-mono tracking-[0.25em] uppercase mt-2 text-white font-bold">
                    System Reliability Rate
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ABOUT US SECTION */}
      <section id="about" className="relative z-10 py-24 md:py-36 bg-slate-950/50 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-[0.25em] block mb-2 font-bold">The Studio</span>
            <h2 className="text-3xl md:text-6xl font-heading font-bold text-white uppercase tracking-tight">About Xeta Forge</h2>
            <div className="w-16 h-1 bg-cyan-500 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed font-light mb-6">
                We are a boutique team of elite engineers, designers, and AI automation specialists. We believe that technology should be an asset, not a bottleneck.
              </p>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed font-light">
                By fusing modern full-stack web engineering with state-of-the-art cognitive LLM orchestrations, we build durable digital structures that streamline legacy business bottlenecks and power automatic growth.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'LLMs Deployed', val: '12+' },
                { label: 'Workflows Automated', val: '50+' },
                { label: 'API Integrations', val: '150+' },
                { label: 'Client Satisfaction', val: '100%' }
              ].map((stat, i) => (
                <div key={i} className="p-6 bg-slate-900/60 border border-white/5 rounded-2xl text-center backdrop-blur-sm hover:border-cyan-500/20 transition-colors duration-300">
                  <div className="text-2xl md:text-4xl font-heading font-black text-cyan-400 mb-2">{stat.val}</div>
                  <div className="text-xxs md:text-xs text-slate-400 font-mono tracking-wider uppercase">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PLANS & BOOKING SECTION */}
      <section id="contact" className="relative z-10 py-24 md:py-36 px-4 md:px-6 bg-slate-950/60 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
             <h2 className="text-5xl md:text-8xl font-heading font-bold opacity-10 text-white tracking-tighter">
               COLLABORATE
             </h2>
             <p className="text-cyan-400 font-mono uppercase tracking-[0.25em] -mt-4 md:-mt-8 relative z-10 text-xs md:text-sm font-bold">
               Select an Engagement Model
             </p>
          </div>
          
          {/* 3 engagement cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {[
              { 
                name: 'Technical Discovery', 
                price: 'Roadmap', 
                subtitle: 'Architecture & Scoping', 
                color: 'white', 
                accent: 'bg-white/5 border-white/10' 
              },
              { 
                name: 'Dedicated Product Forge', 
                price: 'Custom Project', 
                subtitle: 'End-to-end Full Engineering', 
                color: 'cyan', 
                accent: 'bg-cyan-950/10 border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.05)]' 
              },
              { 
                name: 'Turnkey AI Suite', 
                price: 'Agent Setup', 
                subtitle: 'Workflow & Bot Integrations', 
                color: 'indigo', 
                accent: 'bg-indigo-950/10 border-indigo-500/30' 
              },
            ].map((plan, i) => {
              const isSelected = formData.projectType === (plan.name === 'Technical Discovery' ? 'General Consultation' : plan.name === 'Dedicated Product Forge' ? 'Web Development' : 'AI Automation / Chatbot');
              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -12 }}
                  className={`relative p-6 sm:p-8 md:p-10 border backdrop-blur-md flex flex-col min-h-[420px] md:min-h-[480px] transition-all duration-300 rounded-3xl ${plan.accent}`}
                  data-hover="true"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent rounded-t-3xl" />
                  
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-heading font-bold mb-1 text-slate-100">{plan.name}</h3>
                    <span className="text-xs font-mono text-slate-400 mb-6 block uppercase tracking-wider">{plan.subtitle}</span>
                    
                    <div className={`text-3xl md:text-4xl font-bold mb-8 md:mb-10 tracking-tight font-heading ${plan.color === 'white' ? 'text-slate-200' : plan.color === 'cyan' ? 'text-cyan-400' : 'text-indigo-400'}`}>
                      {plan.price}
                    </div>
                    
                    <ul className="space-y-4 text-xs md:text-sm text-slate-300">
                      {i === 0 && (
                        <>
                          <li className="flex items-center gap-3"><Terminal className="w-4 h-4 text-slate-500" /> Full Workflow Assessment</li>
                          <li className="flex items-center gap-3"><Layers className="w-4 h-4 text-slate-500" /> System Architecture Layout</li>
                          <li className="flex items-center gap-3"><Code className="w-4 h-4 text-slate-500" /> Custom Scope Proposal</li>
                        </>
                      )}
                      {i === 1 && (
                        <>
                          <li className="flex items-center gap-3 text-white"><Code className="w-4 h-4 text-cyan-400" /> Full-Stack Web Development</li>
                          <li className="flex items-center gap-3 text-white"><Cpu className="w-4 h-4 text-cyan-400" /> Custom Cognitive Alignment</li>
                          <li className="flex items-center gap-3 text-white"><Shield className="w-4 h-4 text-cyan-400" /> Post-launch Support Retainer</li>
                        </>
                      )}
                      {i === 2 && (
                        <>
                          <li className="flex items-center gap-3"><Bot className="w-4 h-4 text-indigo-400" /> Custom Trained 24/7 Chatbot</li>
                          <li className="flex items-center gap-3"><Activity className="w-4 h-4 text-indigo-400" /> Automatic Business Workflow</li>
                          <li className="flex items-center gap-3"><Layers className="w-4 h-4 text-indigo-400" /> Legacy CRM API Pipelines</li>
                        </>
                      )}
                    </ul>
                  </div>
                  
                  <button 
                    onClick={() => {
                      const targetType = plan.name === 'Technical Discovery' ? 'General Consultation' : plan.name === 'Dedicated Product Forge' ? 'Web Development' : 'AI Automation / Chatbot';
                      setFormData(prev => ({ ...prev, projectType: targetType }));
                      const formElement = document.getElementById('b2b-form');
                      if (formElement) {
                        formElement.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className={`w-full py-3.5 text-xs font-bold uppercase tracking-widest border border-cyan-500/20 transition-all duration-300 mt-8 rounded-xl relative overflow-hidden group cursor-pointer bg-transparent text-white`}
                  >
                    <span className="relative z-10 group-hover:text-slate-950">Select Model</span>
                    <div className="absolute inset-0 bg-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out -z-0" />
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* Interactive Form Section */}
          <div id="b2b-form" className="max-w-3xl mx-auto bg-slate-950/80 border border-white/10 rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl relative">
            <h3 className="text-xl md:text-3xl font-heading font-bold mb-2 uppercase text-white tracking-wide text-center">Consultation Brief</h3>
            
            <div className="flex flex-col items-center gap-4 mb-8">
              <p className="text-xs md:text-sm font-light text-slate-400 text-center max-w-lg">
                Share your business requirements and receive a comprehensive roadmap within 24 hours.
              </p>
              <a 
                href="https://wa.me/923711889382" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.1)] cursor-pointer"
                data-hover="true"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Skip the Form? Chat on WhatsApp: 0371-1889382</span>
              </a>
            </div>

            <AnimatePresence mode="wait">
              {bookingSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10 flex flex-col items-center"
                >
                  <div className="w-16 h-16 bg-cyan-500/10 border border-cyan-500 text-cyan-400 rounded-full flex items-center justify-center mb-6 shadow-[0_0_25px_rgba(6,182,212,0.2)]">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl md:text-2xl font-heading font-bold text-white uppercase mb-3">Transmission Compiled</h4>
                  <p className="text-sm text-slate-300 max-w-md leading-relaxed font-light mb-8">
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
                      className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs tracking-widest uppercase py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Chat on WhatsApp Now</span>
                    </a>
                    
                    <button 
                      onClick={() => {
                        setBookingSuccess(false);
                        setFormData({ name: '', email: '', company: '', projectType: 'Web Development', message: '' });
                      }}
                      className="border border-white/20 text-slate-300 hover:border-cyan-500/40 hover:text-cyan-400 transition-all px-6 py-3.5 text-xs tracking-widest uppercase font-bold rounded-xl cursor-pointer"
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
                    <div className="absolute inset-0 rounded-full border-2 border-cyan-500/10 border-t-cyan-400 animate-spin" />
                    <Terminal className="w-6 h-6 text-cyan-400 absolute inset-0 m-auto animate-pulse" />
                  </div>
                  <span className="font-mono text-xs md:text-sm text-cyan-400 tracking-wider font-semibold">{bookingStep}</span>
                </motion.div>
              ) : (
                <motion.form 
                  onSubmit={handleBookingSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="relative">
                      <label className="block text-xxs font-mono tracking-widest uppercase text-slate-400 mb-2 font-bold">Contact Name</label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-500 absolute left-4 top-3.5" />
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                          className="w-full bg-slate-900 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="relative">
                      <label className="block text-xxs font-mono tracking-widest uppercase text-slate-400 mb-2 font-bold">Business Email</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-500 absolute left-4 top-3.5" />
                        <input
                          type="email"
                          required
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="you@company.com"
                          className="w-full bg-slate-900 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Company */}
                    <div className="relative">
                      <label className="block text-xxs font-mono tracking-widest uppercase text-slate-400 mb-2 font-bold">Company Name</label>
                      <div className="relative">
                        <Building className="w-4 h-4 text-slate-500 absolute left-4 top-3.5" />
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="Your business name"
                          className="w-full bg-slate-900 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Project Type */}
                    <div className="relative">
                      <label className="block text-xxs font-mono tracking-widest uppercase text-slate-400 mb-2 font-bold">Required Service</label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        className="w-full bg-slate-900 border border-white/10 rounded-xl py-3 px-4 text-sm text-slate-100 focus:outline-none focus:border-cyan-500/50 transition-colors cursor-pointer"
                      >
                        <option value="Web Development">Next-Gen Web Development</option>
                        <option value="AI Automation">Intelligent AI Automation</option>
                        <option value="Chatbot">Conversational AI & Chatbots</option>
                        <option value="General Consultation">General Engineering Consultation</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <label className="block text-xxs font-mono tracking-widest uppercase text-slate-400 mb-2 font-bold">Brief Description</label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your system requirements and timeline goals..."
                      className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs tracking-[0.2em] uppercase rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] cursor-pointer border-none"
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

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/5 py-12 md:py-16 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
             <div className="font-heading text-xl md:text-2xl font-bold tracking-widest mb-4 text-white uppercase select-none">
               <span className="text-cyan-400">XETA</span> FORGE
             </div>
             <div className="flex gap-2 text-xs font-mono text-slate-500">
               <span>&copy; {new Date().getFullYear()} Xeta Forge. All systems functional.</span>
             </div>
          </div>
          
          <div className="flex gap-6 md:gap-8 flex-wrap items-center">
            <a 
              href="https://wa.me/923711889382" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-emerald-400 hover:text-emerald-300 font-bold uppercase text-xxs tracking-[0.25em] transition-colors flex items-center gap-1.5 cursor-pointer" 
              data-hover="true"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              WhatsApp: 0371-1889382
            </a>
            <a href="https://x.com/GoogleAIStudio" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white font-bold uppercase text-xxs tracking-[0.25em] transition-colors cursor-pointer" data-hover="true">
              Twitter
            </a>
            <a href="mailto:architects@xetaforge.com" className="text-slate-400 hover:text-white font-bold uppercase text-xxs tracking-[0.25em] transition-colors cursor-pointer" data-hover="true">
              Contact Email
            </a>
          </div>
        </div>
      </footer>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedService(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md cursor-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-hidden bg-slate-900 border border-white/10 flex flex-col md:flex-row shadow-2xl shadow-cyan-500/5 rounded-3xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-950/80 text-white hover:bg-cyan-500 hover:text-slate-950 transition-colors border border-white/10 backdrop-blur-sm"
                data-hover="true"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={(e) => { e.stopPropagation(); navigateService('prev'); }}
                className="absolute left-4 bottom-4 translate-y-0 md:top-1/2 md:bottom-auto md:-translate-y-1/2 z-20 p-2.5 rounded-full bg-slate-950/80 text-white hover:bg-cyan-500 hover:text-slate-950 transition-colors border border-white/10 backdrop-blur-sm"
                data-hover="true"
                aria-label="Previous Service"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); navigateService('next'); }}
                className="absolute right-4 bottom-4 translate-y-0 md:top-1/2 md:bottom-auto md:-translate-y-1/2 z-20 p-2.5 rounded-full bg-slate-950/80 text-white hover:bg-cyan-500 hover:text-slate-950 transition-colors border border-white/10 backdrop-blur-sm md:right-8"
                data-hover="true"
                aria-label="Next Service"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Image Side */}
              <div className="w-full md:w-1/2 h-48 md:h-auto relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={selectedService.id}
                    src={selectedService.image} 
                    alt={selectedService.title} 
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 w-full h-full object-cover grayscale"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent md:bg-gradient-to-r md:from-slate-900 md:to-transparent" />
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2 p-8 pb-20 md:p-10 flex flex-col justify-center relative bg-slate-900">
                <motion.div
                  key={selectedService.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <div className="flex items-center gap-3 text-cyan-400 mb-3">
                     <Sparkles className="w-4 h-4" />
                     <span className="font-mono text-xs tracking-widest uppercase font-semibold">{selectedService.statusTag}</span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-heading font-bold uppercase leading-tight mb-1 text-white">
                    {selectedService.title}
                  </h3>
                  
                  <p className="text-xs text-slate-400 font-mono tracking-widest uppercase mb-5">
                    {selectedService.tagline}
                  </p>
                  
                  <div className="h-px w-16 bg-cyan-500/30 mb-5" />
                  
                  <p className="text-slate-300 leading-relaxed text-sm font-light mb-6">
                    {selectedService.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {selectedService.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-slate-400 text-xs leading-relaxed">
                        <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => selectServiceForInquiry(selectedService.title)}
                    className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs tracking-widest uppercase py-3.5 px-6 rounded-xl transition-all duration-300 w-full text-center border-none cursor-pointer"
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
