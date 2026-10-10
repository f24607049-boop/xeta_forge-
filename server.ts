import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";

// $0 Built-in Autonomous Concierge Knowledge Engine (Runs with zero external API calls)
function getLocalConciergeResponse(message: string): string {
  const lower = message.toLowerCase().trim();

  // Greetings & Identity
  if (lower.match(/\b(hi|hello|hey|salam|assalam|greetings|morning|afternoon|evening|who are you|what is xeta|what are you)\b/)) {
    return "Greetings! ⚡ I am **XETA AI**, the architectural assistant for **Xeta Forge**.\n\nWe engineer production-ready **Web Architectures**, **Mobile Apps**, **Custom AI Model Training**, **AI Automation Workflows**, and **Conversational Chatbots**. How can I assist your product roadmap today?";
  }

  // App Development (Mobile, iOS, Android, React Native, Flutter)
  if (lower.match(/\b(mobile|ios|android|flutter|react native|native app|mobile app|app development|smartphone|play store|app store)\b/)) {
    return "📱 **Custom App Development at XETA Forge:**\n\n• **Cross-Platform & Native:** High-performance iOS and Android apps built with React Native and Flutter.\n• **User Experience:** 60fps fluid animations, offline-first data sync, biometric security, and push notifications.\n• **Full Lifecycle:** Complete architecture, embedded AI features, and end-to-end App Store & Google Play deployment.\n\nWould you like to scope your mobile app project with our team?";
  }

  // AI Model Training & Fine-Tuning
  if (lower.match(/\b(model training|train|training|fine-tuning|fine tuning|finetune|lora|qlora|rlhf|dataset|datasets|weights|neural|machine learning|ml model|custom model)\b/)) {
    return "🧠 **Custom AI Model Training & Fine-Tuning:**\n\n• **Domain Fine-Tuning:** LoRA, QLoRA, and full-weight LLM alignment on your proprietary enterprise data.\n• **Dataset Engineering:** Curated dataset pipelines, cleaning, synthetic data generation, and RLHF alignment.\n• **Private Deployment:** Model quantization and low-latency inference on private cloud or on-prem infrastructure.\n\nWhat kind of custom AI model or domain dataset are you looking to train?";
  }

  // Web Development & Tech Stack
  if (lower.match(/\b(web|website|frontend|backend|react|next|fullstack|development|developer|design|stack|tech)\b/)) {
    return "🌐 **Next-Gen Web Development at XETA Forge:**\n\n• **Core Stack:** Production React, Next.js, Vite, TypeScript, Tailwind CSS, & cloud-native APIs.\n• **Performance:** Edge-optimized with sub-second load times and high Lighthouse/SEO ratings.\n• **Security:** Enterprise-grade sanitization and robust database integrations.\n\nWould you like to discuss a custom web build or schedule a technical discovery call?";
  }

  // AI Automation & Pipelines
  if (lower.match(/\b(automation|automate|workflow|pipeline|pipelines|agents|orchestration|repetitive|tasks|sync)\b/)) {
    return "🤖 **Intelligent AI Automation:**\n\n• **Autonomous Agents:** Custom LLM orchestration aligned with your business logic.\n• **System Bridges:** Seamless integration between legacy databases, CRMs, and modern APIs.\n• **Data Pipelines:** Automated document parsing, indexing, and real-time synchronization.\n\nWhat manual bottlenecks would you like to automate?";
  }

  // Chatbots & Conversational AI
  if (lower.match(/\b(chatbot|chatbots|bot|bots|conversational|support|customer service|assistant|assistants|nlp)\b/)) {
    return "💬 **Conversational AI & Chatbots:**\n\n• **Bespoke Intelligence:** Context-aware assistants trained on your proprietary knowledge bases.\n• **Multi-Platform:** Deployable across Web, Slack, and WhatsApp.\n• **Human Handoff:** Intelligent routing with automatic fallback to human team members.\n\nReady to engage your customers 24/7?";
  }

  // Pricing, Cost, Rates, & Plans
  if (lower.match(/\b(price|pricing|cost|costs|rate|rates|quote|package|packages|budget|plan|plans|fee|fees|how much|dollar|dollars|\$)\b/)) {
    return "💼 **Engagement Models & Pricing Structure:**\n\n1. **Technical Discovery:** Architecture audit, workflow assessment, & scope proposal.\n2. **Dedicated Product Forge:** End-to-end full-stack Web, Mobile App, & AI Model engineering.\n3. **Turnkey AI Suite:** Complete agent & conversational chatbot integration.\n\nAll engagements are transparently scoped for your project requirements. Click **'Book a Consultation'** or message us directly on WhatsApp for a custom roadmap!";
  }

  // Process, Timeline, & Methodology
  if (lower.match(/\b(process|timeline|how long|how it works|steps|methodology|duration|delivery|turnaround|speed)\b/)) {
    return "⚡ **The 3-Phase Forge Methodology:**\n\n1. **Discovery & Blueprinting:** Deep audit, system mapping, and scope synthesis.\n2. **Agile Product Forging:** High-velocity TypeScript & mobile development with strict test coverage.\n3. **Cognitive LLM Alignment:** Custom model training, prompt optimization, and production deployment.\n\nTypical turnaround is between 2 to 6 weeks depending on project scope.";
  }

  // Contact, WhatsApp, & Consultation
  if (lower.match(/\b(contact|talk|call|meeting|consultation|book|whatsapp|email|hire|reach|phone|schedule)\b/)) {
    return "🚀 **Connect Directly with Our Engineering Leads:**\n\n• **WhatsApp Direct:** [Chat on WhatsApp: +923711889382](https://wa.me/923711889382)\n• **Consultation Form:** Fill out the **Consultation Brief** at the bottom of the page.\n• **Email:** architects@xetaforge.com\n\nWe review all technical inquiries and respond within 24 hours!";
  }

  // About, Team, & Track Record
  if (lower.match(/\b(about|who|team|company|experience|location|portfolio|agency|clients|guarantee)\b/)) {
    return "🏢 **About Xeta Forge:**\n\nWe are a boutique engineering studio of full-stack web & mobile developers, ML engineers, and AI automation specialists. We have deployed 12+ custom LLM models, automated 50+ enterprise workflows, and maintained 100% client satisfaction.";
  }

  // Default intelligent assistant response
  return "⚡ **XETA Forge Systems Online:**\n\nI can answer any questions about our **Web Engineering**, **Custom App Development**, **AI Model Training**, **AI Automation**, **Chatbot Systems**, or **Pricing Models**.\n\nHow can we help power your digital growth? (You can also click **'Book a Consultation'** or reach us on WhatsApp at +923711889382!)";
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // Limit incoming JSON payload to prevent denial of service (DoS) attacks
  app.use(express.json({ limit: "10kb" }));

  // API Route for Gemini Chat with Input Sanitization & $0 Autonomous Fallback
  app.post("/api/chat", async (req, res) => {
    const { message } = req.body;
    
    // Security check: validate input presence, type, and length
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ text: "System Warning: Invalid transmission payload." });
    }
    
    if (message.length > 1000) {
      return res.status(400).json({ text: "System Warning: Payload exceeds maximum limit of 1000 characters." });
    }

    // Check GEMINI_API_KEY first (platform standard), then fallback to GEMINI_API
    const API_KEY = (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim())
      || (process.env.GEMINI_API && process.env.GEMINI_API.trim())
      || '';

    // If no valid API key is present (or if key is an invalid format like AQ. or ya29.),
    // immediately serve the $0 built-in autonomous concierge response!
    const isStandardApiKey = API_KEY.startsWith("AIza");

    if (!API_KEY || !isStandardApiKey) {
      const fallbackResponse = getLocalConciergeResponse(message);
      return res.json({ text: fallbackResponse });
    }

    try {
      const ai = new GoogleGenAI({
        apiKey: API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      // System instruction for XETA Forge AI Assistant
      const systemInstruction = `You are 'XETA AI', the intelligent conversational AI concierge for Xeta Forge, a next-gen digital agency specializing in custom Web Development, Mobile App Development, Custom AI Model Training, AI Automation, and Chatbots.

Your tone is professional, highly technical, visionary, and helpful. Use emojis like ⚡️, 🤖, 🌐, 📱, 🧠, 💼.

Xeta Forge Services:
1. Web Development ("Next-Gen Web Development"):
   - Building scalable, high-performance, and visually stunning web applications.
   - Tech stack: React, Next.js, Vite, Tailwind CSS, TypeScript, Node.js, Cloud architectures.
2. App Development ("Custom App Development"):
   - High-performance native and cross-platform mobile apps for iOS and Android.
   - Tech stack: React Native, Flutter, offline-first sync, biometric security, App Store & Google Play deployment.
3. AI Model Training ("Custom AI Model Training"):
   - Domain-specific LLM fine-tuning (LoRA, QLoRA, full-weight), dataset curation, RLHF alignment, computer vision/predictive ML models, and private cloud inference.
4. AI Automation ("Intelligent AI Automation"):
   - Streamlining business workflows, data pipelines, and eliminating repetitive tasks.
   - Built using custom LLM agents, automated data pipelines, and third-party API integrations.
5. Chatbot Development ("Conversational AI & Chatbots"):
   - Custom-trained, context-aware AI chatbots engaging customers 24/7.
   - Tailored to specific business databases, CRM systems, and customer support.

Company Name: Xeta Forge
WhatsApp Contact: +923711889382
Call to Action: Users can "Book a Consultation" or "Get a Quote" directly on the page!

Keep responses under 70 words, punchy, and B2B professional. Guide users towards booking a consultation for their web, app, model training, or AI automation projects!`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: message,
        config: {
          systemInstruction,
        }
      });

      const text = response.text || getLocalConciergeResponse(message);
      return res.json({ text });
    } catch (error) {
      console.warn("Live Gemini API call failed, activating built-in concierge fallback:", error);
      // Seamless $0 fallback: Never show error screens to users
      const fallbackResponse = getLocalConciergeResponse(message);
      return res.json({ text: fallbackResponse });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
