/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { EngagementScope, ProcessStep, Service } from '../types';
import dataAnalysisImg from '../src/assets/images/service_data_analysis_1795513141951.jpg';
import websiteImg from '../src/assets/images/website_dev_recolor_1795465624878.webp';
import automationImg from '../src/assets/images/automation_studio_recolor_1795465321341.webp';
import chatbotImg from '../src/assets/images/studio_chat_assistant_1795464744975.webp';
import mobileImg from '../src/assets/images/studio_mobile_apps_1795464744880.webp';
import customAiImg from '../src/assets/images/ai_training_recolor_1795465838222.webp';

export const WHATSAPP_URL = 'https://wa.me/923711889382';
export const WHATSAPP_DISPLAY = '+92 371 1889382';
export const STUDIO_EMAIL = 'xetaforge@gmail.com';

export const SERVICES: Service[] = [
  {
    id: 'data-analysis',
    visualId: 'data',
    image: dataAnalysisImg,
    imageAlt: 'Sunlit studio monitor showing clear business data analysis bar charts, trend lines, and pie graphs on a cream stone desk',
    title: 'Data Analysis',
    category: 'Clear Reports & Insights',
    outcome: 'Turn messy spreadsheets and business numbers into easy-to-read dashboards and decisions.',
    description:
      'Stop guessing from scattered spreadsheets. We clean up your sales, customer, and operations numbers and organize them into clear visual reports so you can see what is working at a glance.',
    deliverable: 'Interactive analytics dashboard and clean reporting setup',
    features: [
      'Cleans and organizes spreadsheets, orders, and customer records',
      'Turns raw numbers into clear visual charts and daily summaries',
      'Highlights trends, top-selling areas, and slow spots early',
      'Automated weekly summaries without manual copy-and-paste',
    ],
  },
  {
    id: 'web-dev',
    visualId: 'web',
    image: websiteImg,
    imageAlt: 'Studio desktop monitor showing clean website code, charts, and interface layouts in sage green and cobalt blue tones',
    title: 'Website Development',
    category: 'Custom Websites & Portals',
    outcome: 'Fast, reliable websites and customer portals built cleanly around your business goals.',
    description:
      'We build complete websites, booking pages, and custom online portals from the ground up—loading quickly on every screen, simple to manage, and owned completely by you.',
    deliverable: 'Full custom website, speed setup, and owner guide',
    features: [
      'Clean layouts mapped around how your customers browse and book',
      'Loads smoothly across phones, tablets, and desktop monitors',
      'Built-in contact forms, customer portals, and clear dashboards',
      'You keep full ownership of your website, domain, and files',
    ],
  },
  {
    id: 'ai-automation',
    visualId: 'automation',
    image: automationImg,
    imageAlt: 'Split visual pairing sage green AI thinking with precision automation gears',
    title: 'AI & Task Automation',
    category: 'Smart Thinking + Automatic Work',
    outcome: 'Combine smart AI understanding with steady automatic workflows that run on their own.',
    description:
      'Bring smart AI reading together with reliable step-by-step automation so customer inquiries, emails, spreadsheets, and invoices get sorted and updated without manual typing.',
    deliverable: 'Connected AI and daily workflow automation',
    features: [
      'Reads incoming forms, messages, and invoices without manual typing',
      'Routes new website leads straight to your email or team chat',
      'Optional quick approval steps before important emails go out',
      'Clear notifications if anything ever needs a human review',
    ],
  },
  {
    id: 'ai-chatbots',
    visualId: 'chatbot',
    image: chatbotImg,
    imageAlt: 'Smartphone on a frosted glass stand showing sage green and blue chat bubbles in soft morning sunlight',
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
    imageAlt: 'Two sleek mobile phones floating above stacked cream and sage fluted plinths showing clean app interfaces',
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
    imageAlt: 'Cream ceramic humanoid robot studying glowing cream, sage green, and warm mathematical models on a dark olive board',
    title: 'AI Model Training',
    category: 'Custom Trained Models',
    outcome: 'Teach an AI model your own business examples, rules, and style so it works accurately for you.',
    description:
      'We train and fine-tune dedicated AI models on your company examples, product catalogs, and real-world workflows—tested carefully so answers stay consistent and accurate.',
    deliverable: 'Custom-trained AI model with accuracy checks',
    features: [
      'Organized training examples built cleanly from your business files',
      'Tuned to match your exact industry terms, tasks, and writing tone',
      'Checked carefully against real questions to keep results reliable',
      'Private setup so your training data and model belong solely to you',
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
    name: 'Data Analysis & Dashboards',
    tag: 'Clear Insights',
    description:
      'Organize business spreadsheets and sales records into clear visual charts and reports.',
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
    name: 'Custom AI Model Training',
    tag: 'Trained on Your Data',
    description:
      'Teach a dedicated AI model your business examples, product details, and tone for accurate results.',
  },
];
