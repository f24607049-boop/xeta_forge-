/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { EngagementScope, ProcessStep, Service } from '../types';
import websiteImg from '../src/assets/images/service_website_building_1795462495585.webp';
import automationImg from '../src/assets/images/service_workflow_automation_1795462496490.webp';
import chatbotImg from '../src/assets/images/service_customer_chatbots_1795462496980.webp';
import mobileImg from '../src/assets/images/service_mobile_apps_1795462498379.webp';
import customAiImg from '../src/assets/images/service_custom_ai_1795462496866.webp';

export const WHATSAPP_URL = 'https://wa.me/923711889382';
export const WHATSAPP_DISPLAY = '+92 371 1889382';
export const STUDIO_EMAIL = 'architects@xetaforge.com';

export const SERVICES: Service[] = [
  {
    id: 'web-dev',
    visualId: 'web',
    image: websiteImg,
    imageAlt: 'A modern website displayed on a laptop resting on a warm sunlit oak desk',
    title: 'Website Design & Building',
    category: 'Websites & Online Tools',
    outcome: 'A clear, fast website built around your visitors and business goals.',
    description:
      'We design and build clean websites, customer portals, and booking pages that look great on every phone and computer—and belong completely to you.',
    deliverable: 'Complete website, launch setup, and clear guide',
    features: [
      'Loads quickly on phones, tablets, and laptops',
      'Custom look tailored to your brand and customers',
      'Simple contact forms, booking pages, and product showcases',
      'You keep full ownership of your website and all files',
    ],
  },
  {
    id: 'ai-automation',
    visualId: 'automation',
    image: automationImg,
    imageAlt: 'A calm office monitor and tablet showing automated daily tasks and order steps',
    title: 'Daily Task Automation',
    category: 'Save Time on Busywork',
    outcome: 'Connect your everyday tools so repetitive office work runs automatically.',
    description:
      'Stop copying details by hand between emails, spreadsheets, calendars, and invoices. We link your apps together so inquiries, orders, and updates flow smoothly.',
    deliverable: 'Connected business tools with simple team alerts',
    features: [
      'Send new website leads straight to your email or team chat',
      'Read incoming forms and invoices without manual typing',
      'Optional quick approval steps before important emails go out',
      'Clear notifications if anything ever needs a human review',
    ],
  },
  {
    id: 'ai-chatbots',
    visualId: 'chatbot',
    image: chatbotImg,
    imageAlt: 'A business owner smiling while reading helpful customer messages on a smartphone',
    title: 'Smart Customer Chatbots',
    category: '24/7 Customer Help',
    outcome: 'Give visitors instant, helpful answers on your website and WhatsApp.',
    description:
      'Offer friendly support around the clock using an assistant trained strictly on your own business hours, pricing, and FAQs—with easy handoff to your team.',
    deliverable: 'Website chat assistant and WhatsApp handoff setup',
    features: [
      'Answers strictly based on your approved business information',
      'Works smoothly on your website and connects with WhatsApp',
      'Helps collect inquiries and guide customers to booking',
      'Passes tricky questions smoothly to a real person on your team',
    ],
  },
  {
    id: 'app-dev',
    visualId: 'mobile',
    image: mobileImg,
    imageAlt: 'Two smartphones on warm stone displaying clean, friendly mobile app screens',
    title: 'Mobile App Development',
    category: 'iPhone & Android',
    outcome: 'One smooth mobile app for your customers across iPhone and Android.',
    description:
      'We create easy-to-use mobile apps for phones and tablets that work reliably even on spotty connections, with full guidance to launch on the app stores.',
    deliverable: 'Working iPhone and Android app ready for app stores',
    features: [
      'Built to run smoothly on both iPhone and Android phones',
      'Saves key details so the app stays usable on weak signal',
      'Supports safe customer sign-ins and helpful notifications',
      'Full assistance publishing to Apple App Store and Google Play',
    ],
  },
  {
    id: 'ai-training',
    visualId: 'training',
    image: customAiImg,
    imageAlt: 'A digital tablet and neatly organized cream notebooks on a sunlit travertine table',
    title: 'Private AI Assistants',
    category: 'Tailored Company Knowledge',
    outcome: 'A private helper trained on your own business guides, tone, and files.',
    description:
      'Give your staff a private digital helper that understands your company policies, product details, and writing style—kept secure for your business alone.',
    deliverable: 'Your private business assistant with accuracy checks',
    features: [
      'Organized around your own company documents and handbooks',
      'Writes clearly in your brand voice and everyday wording',
      'Tested carefully to keep answers accurate and dependable',
      'Kept private so your company information stays yours',
    ],
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'Listen & Plan',
    summary: 'We learn about your business, spot what slows you down, and map a clear plan.',
    details:
      'Before writing any code, we talk through your goals in plain language, look at the tools you already use, and give you a clear step-by-step plan and timeline.',
    artifact: 'Simple written plan and clear timeline',
  },
  {
    step: '02',
    title: 'Design & Preview',
    summary: 'You see how your pages and tools look and feel before we build the final version.',
    details:
      'We share early clickable previews of screens, wording, and customer flows so your team can give feedback and request changes easily.',
    artifact: 'Interactive preview to review together',
  },
  {
    step: '03',
    title: 'Build & Test',
    summary: 'We build everything carefully and check that it works smoothly on phones and computers.',
    details:
      'We put your website, app, or automation together cleanly, double-check all forms and privacy rules, and test everything across screens before launch.',
    artifact: 'Private test version ready for your approval',
  },
  {
    step: '04',
    title: 'Launch & Handover',
    summary: 'We go live smoothly and hand every account, file, and guide directly to you.',
    details:
      'Once launched, you own everything we created. We walk your team through how to use and update it so you never feel locked in or confused.',
    artifact: 'Full ownership and easy how-to guide',
  },
];

export const ENGAGEMENT_SCOPES: EngagementScope[] = [
  {
    name: 'Free Discovery Call',
    tag: 'Friendly Advice',
    description:
      'A relaxed chat about your ideas, current website or tools, and the simplest path forward.',
  },
  {
    name: 'New Website or Online Portal',
    tag: 'Design & Launch',
    description:
      'A fast, custom-designed website built cleanly and handed over completely to you.',
  },
  {
    name: 'Time-Saving Automation & Chat',
    tag: 'Helpful Assistants',
    description:
      'Connect your everyday tools and add a smart chatbot that answers customers on your site or WhatsApp.',
  },
  {
    name: 'iPhone & Android Mobile App',
    tag: 'Phones & Tablets',
    description:
      'A smooth mobile app built for both iPhone and Android with app store setup included.',
  },
  {
    name: 'Private Business AI Assistant',
    tag: 'Your Company Knowledge',
    description:
      'A private AI helper trained on your team guides, manuals, and business tone.',
  },
];
