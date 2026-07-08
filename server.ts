import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Limit incoming JSON payload to prevent denial of service (DoS) attacks
  app.use(express.json({ limit: "10kb" }));

  // API Route for Gemini Chat with Input Sanitization
  app.post("/api/chat", async (req, res) => {
    const { message } = req.body;
    
    // Security check: validate input presence, type, and length
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ text: "System Warning: Invalid transmission payload." });
    }
    
    if (message.length > 1000) {
      return res.status(400).json({ text: "System Warning: Payload exceeds maximum limit of 1000 characters." });
    }

    const API_KEY = process.env.GEMINI_API || process.env.GEMINI_API_KEY || '';

    if (!API_KEY) {
      return res.status(500).json({ text: "XETA AI is currently offline. (Missing API Key)" });
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
      const systemInstruction = `You are 'XETA AI', the intelligent conversational AI concierge for Xeta Forge, a next-gen digital agency specializing in custom Web Development, AI Automation, and Chatbots.

Your tone is professional, highly technical, visionary, and helpful. Use emojis like ⚡️, 🤖, 🌐, 💼.

Xeta Forge Services:
1. Web Development ("Next-Gen Web Development"):
   - Building scalable, high-performance, and visually stunning web applications.
   - Tech stack: React, Next.js, Vite, Tailwind CSS, TypeScript, Node.js, Cloud architectures.
2. AI Automation ("Intelligent AI Automation"):
   - Streamlining business workflows, data pipelines, and eliminating repetitive tasks.
   - Built using custom LLM agents, automated data pipelines, and third-party API integrations.
3. Chatbot Development ("Conversational AI & Chatbots"):
   - Custom-trained, context-aware AI chatbots engaging customers 24/7.
   - Tailored to specific business databases, CRM systems, and customer support.

Company Name: Xeta Forge
Call to Action: Users can "Book a Consultation" or "Get a Quote" directly on the page!

Keep responses under 70 words, punchy, and B2B professional. Guide users towards booking a consultation for their web or AI automation projects!`;

      const chat = ai.chats.create({
        model: "gemini-3.5-flash",
        config: {
          systemInstruction,
        }
      });

      const response = await chat.sendMessage({ message });
      const text = response.text || "Transmission interrupted.";

      return res.json({ text });
    } catch (error) {
      console.error("Gemini Server Error:", error);
      const errMsg = error instanceof Error ? error.message : String(error);
      
      // If permission is denied or project is restricted, provide a friendly instruction on how to add their Gemini API Key
      if (errMsg.includes("PERMISSION_DENIED") || errMsg.includes("denied access") || errMsg.includes("403")) {
        return res.status(500).json({ 
          text: `⚠️ **XETA AI Engine Offline (API Key Needed):**\n\n` +
                `This application uses Google Gemini, which requires a valid API Key. To activate XETA AI:\n\n` +
                `1. Click the **Settings (Gear Icon)** in the top-right of AI Studio.\n` +
                `2. Add a new Environment Variable / Secret:\n` +
                `   - Name: \`GEMINI_API\`\n` +
                `   - Value: (Paste your Gemini API key from Google AI Studio)\n\n` +
                `Once added, XETA AI will immediately start answering! ⚡`
        });
      }
      
      return res.status(500).json({ text: `Error contacting XETA AI engine: ${errMsg}` });
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
