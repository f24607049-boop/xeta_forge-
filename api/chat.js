/**
 * Vercel Serverless Function: /api/chat
 * Handles Gemini AI chat completions for Xeta Forge.
 */

// Concierge Knowledge Engine fallback in case API key is not configured or rate-limited
function getConciergeFallback(message) {
  const lower = (message || '').toLowerCase().trim();

  if (lower.match(/\b(hi|hello|hey|salam|assalam|greetings|morning|afternoon|evening|who are you|what is xeta|what are you)\b/)) {
    return "⚡ **Greetings!** I am **XETA AI**, the technical concierge for **Xeta Forge**.\n\nWe engineer production-grade **Web Applications**, **Mobile Apps**, **Custom AI Model Training**, and **Intelligent Automation Workflows**. How can we accelerate your roadmap today?";
  }

  if (lower.match(/\b(service|services|offer|what do you do|capabilities|solutions|features)\b/)) {
    return "⚡ **Core Capabilities at XETA Forge:**\n\n• **Next-Gen Web Development:** High-velocity React, Next.js, and TypeScript architectures with edge-level speed.\n• **Custom Mobile Applications:** High-performance iOS & Android apps with offline sync and biometric security.\n• **Custom AI Model Training:** Bespoke LLM fine-tuning (LoRA/QLoRA), dataset curation, and private inference.\n• **Intelligent AI Automation:** Multi-agent workflows eliminating repetitive daily tasks and data silos.\n• **Conversational AI & Chatbots:** Context-aware assistants engaging customers 24/7 across Web & WhatsApp.\n\nWhich solution would you like to explore?";
  }

  if (lower.match(/\b(mobile|ios|android|flutter|react native|native app|mobile app|app development)\b/)) {
    return "📱 **Custom App Development at XETA Forge:**\n\n• **Cross-Platform & Native:** iOS and Android apps built with React Native and Flutter.\n• **Experience:** 60fps fluid animations, offline-first data sync, and biometric authentication.\n• **Full Lifecycle:** Architecture, embedded AI features, and end-to-end App Store & Google Play deployment.\n\nWould you like to scope a mobile app project?";
  }

  if (lower.match(/\b(model training|train|training|fine-tuning|fine tuning|finetune|lora|qlora|dataset|datasets|ml model|custom model)\b/)) {
    return "🧠 **Custom AI Model Training & Fine-Tuning:**\n\n• **Domain Fine-Tuning:** LoRA, QLoRA, and full-weight LLM alignment on your proprietary enterprise data.\n• **Dataset Engineering:** Curated dataset pipelines, synthetic data generation, and RLHF alignment.\n• **Private Deployment:** Model quantization and low-latency inference on private cloud or on-prem.\n\nWhat kind of custom AI model are you looking to train?";
  }

  if (lower.match(/\b(web|website|frontend|backend|react|next|fullstack|development|developer|stack)\b/)) {
    return "🌐 **Next-Gen Web Development at XETA Forge:**\n\n• **Core Stack:** Production React, Next.js, Vite, TypeScript, Tailwind CSS, & cloud-native APIs.\n• **Performance:** Edge-optimized with sub-second load times and high Lighthouse/SEO ratings.\n• **Security:** Enterprise-grade sanitization and robust database integrations.\n\nWould you like to schedule a technical discovery call?";
  }

  if (lower.match(/\b(automation|automate|workflow|pipeline|pipelines|agents|orchestration)\b/)) {
    return "🤖 **Intelligent AI Automation:**\n\n• **Autonomous Agents:** Custom LLM orchestration aligned with your business logic.\n• **System Bridges:** Seamless integration between legacy databases, CRMs, and modern APIs.\n• **Data Pipelines:** Automated document parsing, indexing, and real-time synchronization.\n\nWhat bottlenecks would you like to automate?";
  }

  if (lower.match(/\b(price|pricing|cost|costs|rate|rates|quote|package|budget|plan|fee|fees)\b/)) {
    return "💼 **Engagement Models & Pricing Structure:**\n\n1. **Technical Discovery:** Architecture audit, workflow assessment, & scope proposal.\n2. **Dedicated Product Forge:** End-to-end full-stack Web, Mobile App, & AI Model engineering.\n3. **Turnkey AI Suite:** Complete agent & conversational chatbot integration.\n\nAll engagements are transparently scoped. Click **'Book a Consultation'** or message us directly on WhatsApp (+923711889382) for a custom quote!";
  }

  if (lower.match(/\b(contact|talk|call|meeting|consultation|book|whatsapp|email|hire|reach|phone)\b/)) {
    return "🚀 **Connect Directly with Our Engineering Leads:**\n\n• **WhatsApp Direct:** [Chat on WhatsApp: +923711889382](https://wa.me/923711889382)\n• **Consultation Form:** Fill out the **Consultation Brief** at the bottom of the page.\n• **Email:** architects@xetaforge.com\n\nWe review all technical inquiries and respond within 24 hours!";
  }

  return "⚡ **XETA Forge Systems Online:**\n\nI can answer questions about our **Web Engineering**, **Custom App Development**, **AI Model Training**, **AI Automation**, **Chatbot Systems**, or **Pricing Models**.\n\nHow can we help power your digital growth? (You can also reach our engineering leads directly on WhatsApp at +923711889382!)";
}

const SYSTEM_INSTRUCTION = `You are 'XETA AI', the intelligent conversational AI concierge for Xeta Forge, a next-gen digital agency specializing in custom Web Development, Mobile App Development, Custom AI Model Training, AI Automation, and Chatbots.

Your tone is professional, highly technical, visionary, and helpful. Use emojis like ⚡️, 🤖, 🌐, 📱, 🧠, 💼.

Xeta Forge Services:
1. Web Development ("Next-Gen Web Development"):
   - High-performance, scalable web applications using React, Next.js, Vite, Tailwind CSS, TypeScript, Node.js, and cloud architectures.
2. App Development ("Custom App Development"):
   - High-performance native and cross-platform mobile apps for iOS and Android using React Native and Flutter.
3. AI Model Training ("Custom AI Model Training"):
   - Domain-specific LLM fine-tuning (LoRA, QLoRA, full-weight), dataset curation, RLHF alignment, and private cloud inference.
4. AI Automation ("Intelligent AI Automation"):
   - Streamlining business workflows, multi-agent pipelines, and eliminating repetitive tasks.
5. Chatbot Development ("Conversational AI & Chatbots"):
   - Custom-trained, context-aware AI chatbots engaging customers 24/7.

Company Name: Xeta Forge
WhatsApp Contact: +923711889382
Direct WhatsApp Link: [Chat on WhatsApp](https://wa.me/923711889382)

FORMATTING RULES:
- Keep answers concise, scannable, and attractive (under 80 words).
- Use bold **Title** for key concepts.
- Use clean bullet points (•) for lists, with each item on its own separate line.
- Always include an encouraging call to action.`;

export default async function handler(req, res) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ reply: 'Method not allowed. Please send a POST request.' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        // use raw body
      }
    }

    const message = body && typeof body.message === 'string' ? body.message.trim() : '';

    if (!message) {
      return res.status(400).json({ reply: 'Please provide a message in the request body.' });
    }

    // Read Gemini API Key from GEMINI_API_KEY with fallback to GEMINI_API
    const apiKey = (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim())
      || (process.env.GEMINI_API && process.env.GEMINI_API.trim())
      || '';

    // If API key is missing or not configured on Vercel, respond with intelligent concierge fallback
    if (!apiKey) {
      const fallbackReply = getConciergeFallback(message);
      return res.status(200).json({ reply: fallbackReply });
    }

    // Call Gemini 1.5 Flash via REST API
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const payload = {
      contents: [
        {
          role: 'user',
          parts: [{ text: `${SYSTEM_INSTRUCTION}\n\nUser Question: ${message}` }]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 350
      }
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      console.warn(`Gemini API error status: ${response.status}`);
      const fallbackReply = getConciergeFallback(message);
      return res.status(200).json({ reply: fallbackReply });
    }

    const data = await response.json();
    const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (replyText) {
      return res.status(200).json({ reply: replyText });
    }

    const fallbackReply = getConciergeFallback(message);
    return res.status(200).json({ reply: fallbackReply });
  } catch (error) {
    console.error('Error handling chat request in /api/chat:', error);
    const fallbackReply = getConciergeFallback(req.body?.message || '');
    return res.status(200).json({ reply: fallbackReply });
  }
}
