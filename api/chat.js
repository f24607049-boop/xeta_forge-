/**
 * Vercel Serverless Function: /api/chat
 * Handles chat completions with input validation and rate limiting for Xeta Forge.
 */

const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 20;
const rateLimitStore = new Map();

function isRateLimited(clientKey) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const timestamps = (rateLimitStore.get(clientKey) || []).filter((ts) => ts > windowStart);

  if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    const oldest = timestamps[0];
    const retryAfterSec = Math.max(1, Math.ceil((oldest + RATE_LIMIT_WINDOW_MS - now) / 1000));
    rateLimitStore.set(clientKey, timestamps);
    return { limited: true, retryAfterSec };
  }

  timestamps.push(now);
  rateLimitStore.set(clientKey, timestamps);
  return { limited: false, retryAfterSec: 0 };
}

function getConciergeFallback(message) {
  const lower = (message || '').toLowerCase().trim();

  if (lower.match(/\b(hi|hello|hey|salam|assalam|greetings|morning|afternoon|evening|who are you|what is xeta|what are you)\b/)) {
    return "Hello. I am the **Xeta Forge Assistant**.\n\nWe build custom **Web Applications**, **Mobile Apps**, **Workflow & AI Automation**, **Conversational Support Agents**, and **Fine-Tuned Language Models**. How can we help with your project?";
  }

  if (lower.match(/\b(service|services|offer|what do you do|capabilities|solutions|features)\b/)) {
    return "**Core Capabilities at Xeta Forge:**\n\n- **Web Application Engineering:** React, Next.js, and TypeScript builds.\n- **Workflow & AI Automation:** Connect CRMs, documents, and internal APIs.\n- **Conversational Support Agents:** Grounded in your documentation.\n- **Mobile & Cross-Platform Apps:** Unified iOS and Android builds.\n- **Custom Model Fine-Tuning:** Domain datasets and private deployment.";
  }

  if (lower.match(/\b(contact|talk|call|meeting|consultation|book|whatsapp|email|hire|reach|phone)\b/)) {
    return "**Connect with Xeta Forge:**\n\n- **WhatsApp:** https://wa.me/923711889382\n- **Email:** architects@xetaforge.com\n- **Consultation Form:** Open the **Contact** page to submit your project brief.";
  }

  return "Ask me about **Web Application Engineering**, **Mobile Apps**, **Workflow & AI Automation**, **Conversational Agents**, or **Custom Model Fine-Tuning**.\n\nDirect WhatsApp: https://wa.me/923711889382";
}

const SYSTEM_INSTRUCTION = `You are the assistant for Xeta Forge, a software engineering studio specializing in Web Application Engineering, Mobile Apps, Workflow & AI Automation, Conversational Support Agents, and Custom Model Fine-Tuning.

Keep replies concise (under 90 words), grounded, and never invent client counts or unverified metrics.
WhatsApp: https://wa.me/923711889382 | Email: architects@xetaforge.com`;

export default async function handler(req, res) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ reply: 'Method not allowed. Please send a POST request.' });
  }

  const forwarded = req.headers['x-forwarded-for'];
  const clientIp = typeof forwarded === 'string' && forwarded.trim()
    ? forwarded.split(',')[0].trim()
    : req.socket?.remoteAddress || 'unknown';

  const rateCheck = isRateLimited(clientIp);
  if (rateCheck.limited) {
    res.setHeader('Retry-After', String(rateCheck.retryAfterSec));
    return res.status(429).json({
      reply: `Too many requests. Please wait ${rateCheck.retryAfterSec} seconds before retrying.`,
    });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        return res.status(400).json({ reply: 'Invalid JSON request body.' });
      }
    }

    if (!body || typeof body !== 'object' || Array.isArray(body) || typeof body.message !== 'string') {
      return res.status(400).json({ reply: 'Please provide a valid text message.' });
    }

    const message = body.message.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '').trim();
    if (!message) {
      return res.status(400).json({ reply: 'Message cannot be empty.' });
    }
    if (message.length > 1000) {
      return res.status(400).json({ reply: 'Message exceeds the 1,000-character limit.' });
    }

    const apiKey = (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim())
      || (process.env.GEMINI_API && process.env.GEMINI_API.trim())
      || '';

    if (!apiKey || !apiKey.startsWith('AIza')) {
      return res.status(200).json({ reply: getConciergeFallback(message) });
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: `${SYSTEM_INSTRUCTION}\n\nUser Question: ${message}` }]
          }
        ],
        generationConfig: {
          temperature: 0.6,
          maxOutputTokens: 350
        }
      })
    });

    if (!response.ok) {
      return res.status(200).json({ reply: getConciergeFallback(message) });
    }

    const data = await response.json();
    const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return res.status(200).json({ reply: replyText || getConciergeFallback(message) });
  } catch (error) {
    console.error('Error handling chat request in /api/chat:', error);
    return res.status(200).json({ reply: getConciergeFallback('') });
  }
}
