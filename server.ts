import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";

// Sliding-window in-memory rate limiter for /api/chat
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 20;
const rateLimitStore = new Map<string, number[]>();

function isRateLimited(clientKey: string): { limited: boolean; retryAfterSec: number } {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const timestamps = (rateLimitStore.get(clientKey) || []).filter((ts) => ts > windowStart);

  if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    const oldestInWindow = timestamps[0];
    const retryAfterSec = Math.max(1, Math.ceil((oldestInWindow + RATE_LIMIT_WINDOW_MS - now) / 1000));
    rateLimitStore.set(clientKey, timestamps);
    return { limited: true, retryAfterSec };
  }

  timestamps.push(now);
  rateLimitStore.set(clientKey, timestamps);

  // Periodic pruning to avoid unbounded memory growth
  if (rateLimitStore.size > 5000) {
    for (const [key, list] of rateLimitStore.entries()) {
      const fresh = list.filter((ts) => ts > windowStart);
      if (fresh.length === 0) rateLimitStore.delete(key);
      else rateLimitStore.set(key, fresh);
    }
  }

  return { limited: false, retryAfterSec: 0 };
}

function getClientIp(req: express.Request): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.trim().length > 0) {
    return forwarded.split(",")[0].trim();
  }
  return req.ip || req.socket.remoteAddress || "unknown";
}

function validateChatMessage(body: unknown): { valid: true; message: string } | { valid: false; error: string } {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { valid: false, error: "Request body must be a JSON object." };
  }

  const rawMessage = (body as Record<string, unknown>).message;
  if (typeof rawMessage !== "string") {
    return { valid: false, error: "Please provide a valid text message." };
  }

  // Strip null bytes and ASCII control chars except newline/tab
  const sanitized = rawMessage.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "").trim();

  if (sanitized.length === 0) {
    return { valid: false, error: "Message cannot be empty." };
  }

  if (sanitized.length > 1000) {
    return { valid: false, error: "Message exceeds the 1,000-character limit." };
  }

  return { valid: true, message: sanitized };
}

// Built-in fallback knowledge engine (no external API required)
function getLocalConciergeResponse(message: string): string {
  const lower = message.toLowerCase().trim();

  if (lower.match(/\b(hi|hello|hey|salam|assalam|greetings|morning|afternoon|evening|who are you|what is xeta|what are you)\b/)) {
    return "Hello! I am the **Xeta Forge Helper**.\n\nWe build easy-to-use **Websites**, **Mobile Apps**, **Time-Saving Automations**, **Customer Chatbots**, and **Private Business AI Assistants** — all explained in plain English. How can we help?";
  }

  if (lower.match(/\b(service|services|offer|what do you do|capabilities|solutions|features|what you do)\b/)) {
    return "**How We Help Your Business:**\n\n- **Website Design & Building:** Clean, fast websites and booking pages tailored to your customers.\n- **Daily Task Automation:** Connect your emails, spreadsheets, and calendars so busywork runs automatically.\n- **Smart Customer Chatbots:** Instant website and WhatsApp answers trained strictly on your business FAQs.\n- **Mobile App Development:** Smooth apps for both iPhone and Android.\n- **Private AI Assistants:** Helpers trained privately on your company guides and tone.\n\nWhich one sounds closest to what you need?";
  }

  if (lower.match(/\b(mobile|ios|android|flutter|react native|native app|mobile app|app development|smartphone|play store|app store|iphone)\b/)) {
    return "**Mobile App Development:**\n\n- Built to work smoothly on both iPhone and Android phones.\n- Keeps key details saved even if someone loses internet signal.\n- We handle full help getting your app into the Apple App Store and Google Play.\n\nVisit our **Contact** page anytime to chat about your app idea.";
  }

  if (lower.match(/\b(model training|train|training|fine-tuning|fine tuning|finetune|lora|qlora|rlhf|dataset|datasets|weights|neural|machine learning|ml model|custom model|private ai|helper)\b/)) {
    return "**Private AI Assistants:**\n\n- Trained around your own company documents, pricing guides, and brand voice.\n- Tested carefully so answers stay helpful and accurate.\n- Kept private for your business alone.\n\nMessage us on the **Contact** page or WhatsApp to share what you have in mind.";
  }

  if (lower.match(/\b(web|website|frontend|backend|react|next|fullstack|development|developer|design|stack|tech)\b/)) {
    return "**Website Design & Building:**\n\n- Fast, modern websites built cleanly for phones, tablets, and computers.\n- Easy-to-use forms, booking pages, and clear layouts.\n- You receive full ownership of your website and files.\n\nClick **Book a Free Chat** anytime on the Contact page.";
  }

  if (lower.match(/\b(automation|automate|workflow|pipeline|pipelines|agents|orchestration|repetitive|tasks|sync|busywork|save time)\b/)) {
    return "**Daily Task Automation:**\n\n- Links your everyday forms, emails, calendars, and billing tools together.\n- Reduces manual copying and lets your team focus on customers instead of spreadsheets.\n\nTell us which daily chore takes too much time!";
  }

  if (lower.match(/\b(chatbot|chatbots|bot|bots|conversational|support|customer service|assistant|assistants|nlp)\b/)) {
    return "**Smart Customer Chatbots:**\n\n- Answers common customer questions 24/7 using only your approved business information.\n- Connects smoothly with your website and WhatsApp, and hands over to a real person whenever needed.\n\nReach out via our **Contact** page to get started.";
  }

  if (lower.match(/\b(price|pricing|cost|costs|rate|rates|quote|package|packages|budget|plan|plans|fee|fees|how much|dollar|dollars|\$)\b/)) {
    return "**Simple Ways to Work Together:**\n\n1. **Free Discovery Call:** A friendly chat to hear your goals and recommend the simplest setup.\n2. **Website or App Build:** Clear fixed steps with previews along the way.\n3. **Automation & Chatbots:** Tailored to the tools your team uses every day.\n\nClick **Book a Free Chat** or message us on WhatsApp (https://wa.me/923711889382) for a clear quote.";
  }

  if (lower.match(/\b(process|timeline|how long|how it works|steps|methodology|duration|delivery|turnaround|speed)\b/)) {
    return "**Our Four Simple Steps:**\n\n1. **Listen & Plan:** Talk through your goals in plain language and map a clear plan.\n2. **Design & Preview:** Review clickable previews and suggest changes early.\n3. **Build & Test:** Put everything together and check it carefully on phones and computers.\n4. **Launch & Handover:** Go live and hand over every login, file, and simple how-to guide.";
  }

  if (lower.match(/\b(contact|talk|call|meeting|consultation|book|whatsapp|email|hire|reach|phone|schedule)\b/)) {
    return "**Talk With Xeta Forge:**\n\n- **WhatsApp:** https://wa.me/923711889382\n- **Contact Form:** Visit our **Contact** page to tell us about your project\n- **Email:** architects@xetaforge.com\n\nWe reply within one business day.";
  }

  if (lower.match(/\b(about|who|team|company|experience|location|portfolio|agency|clients|guarantee)\b/)) {
    return "**About Xeta Forge:**\n\nWe build websites, mobile apps, and time-saving AI tools in plain everyday English—with full ownership handed directly to your business at launch.";
  }

  return "I can answer questions in plain English about **Websites**, **Mobile Apps**, **Daily Task Automation**, **Customer Chatbots**, **Private AI Assistants**, or getting a quote.\n\nYou can also message our team directly on WhatsApp: https://wa.me/923711889382";
}

async function startServer() {
  const app = express();
  app.set("trust proxy", true);
  const PORT = Number(process.env.PORT) || 3000;

  app.use((_req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    next();
  });

  app.use(express.json({ limit: "10kb" }));

  // Chat endpoint with rate limiting, strict input validation, and graceful fallback
  app.post("/api/chat", async (req, res) => {
    const clientIp = getClientIp(req);
    const rateCheck = isRateLimited(clientIp);
    if (rateCheck.limited) {
      res.setHeader("Retry-After", String(rateCheck.retryAfterSec));
      return res.status(429).json({
        reply: `Too many requests. Please wait ${rateCheck.retryAfterSec} seconds before sending another message.`,
        error: "Rate limit exceeded",
      });
    }

    const validation = validateChatMessage(req.body);
    if ("error" in validation) {
      return res.status(400).json({
        reply: validation.error,
        error: validation.error,
      });
    }

    const cleanMessage = validation.message;
    const API_KEY =
      (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim()) ||
      (process.env.GEMINI_API && process.env.GEMINI_API.trim()) ||
      "";

    const isStandardApiKey = API_KEY.startsWith("AIza");

    if (!API_KEY || !isStandardApiKey) {
      const fallbackResponse = getLocalConciergeResponse(cleanMessage);
      return res.json({ reply: fallbackResponse, text: fallbackResponse });
    }

    try {
      const ai = new GoogleGenAI({
        apiKey: API_KEY,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const systemInstruction = `You are a friendly helper for Xeta Forge, a studio that builds Websites, Mobile Apps (iPhone & Android), Daily Task Automation, Smart Customer Chatbots, and Private Business AI Assistants.

Tone: warm, clear, simple everyday English so non-technical business owners understand easily. Avoid tech jargon and never invent fake stats, client numbers, or uptime claims.

Process:
1. Listen & Plan
2. Design & Preview
3. Build & Test
4. Launch & Handover (full ownership given to client)

Contact:
- WhatsApp: +923711889382 (https://wa.me/923711889382)
- Email: architects@xetaforge.com
- Contact page on the website

Formatting:
- Keep answers short and clear (under 85 words).
- Use **Bold** lightly for titles and bullet points (- item) for lists.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: cleanMessage,
        config: {
          systemInstruction,
        },
      });

      const text = response.text || getLocalConciergeResponse(cleanMessage);
      return res.json({ reply: text, text });
    } catch (error) {
      console.warn("Gemini API call unavailable, using built-in response:", error);
      const fallbackResponse = getLocalConciergeResponse(cleanMessage);
      return res.json({ reply: fallbackResponse, text: fallbackResponse });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
