/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, RotateCcw, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessage } from '../types';
import { saveChatSessionMessage } from '../services/firebase';
import { XetaForgeEmblem } from './XetaForgeLogo';
import { ChatMessageContent } from './ChatMessageContent';

const SUGGESTED_PROMPTS = [
  { label: '⚡ Core Services', query: 'What services do you offer?' },
  { label: '🌐 Web Dev', query: 'Tell me about Next-Gen Web Development & Tech Stack' },
  { label: '📱 Mobile Apps', query: 'What are your mobile app development capabilities?' },
  { label: '🧠 AI Training', query: 'How does your custom AI model training & fine-tuning work?' },
  { label: '🤖 AI Automation', query: 'What kind of AI automation pipelines can you build?' },
  { label: '💼 Pricing', query: 'What are your engagement models and pricing structure?' },
  { label: '💬 WhatsApp', query: 'How do I contact you on WhatsApp?' },
];

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId, setSessionId] = useState(() => 'session_' + Math.random().toString(36).substring(2, 11));
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: '⚡ **Welcome to XETA Forge Systems!**\n\nI am **XETA AI**, your technical concierge. Ask me anything about our **Web Engineering**, **Mobile Applications**, **Custom AI Model Training**, or **Workflow Automation**.\n\nHow can we accelerate your digital roadmap today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      chatContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: trimmed };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    // Save user message to Firestore
    saveChatSessionMessage(
      sessionId,
      updatedMessages.map((m) => ({
        role: m.role,
        text: m.text,
        timestamp: new Date().toISOString(),
      }))
    );

    setTimeout(scrollToBottom, 50);

    let responseText = "Signal lost. XETA AI is currently offline.";
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: trimmed }),
      });

      if (response.ok) {
        const data = await response.json();
        responseText = data.reply || data.text || "Transmission interrupted.";
      } else {
        try {
          const errData = await response.json();
          responseText = errData.reply || errData.text || `Server responded with status ${response.status}`;
        } catch {
          responseText = `Server responded with status ${response.status}`;
        }
      }
    } catch (error) {
      console.error("Chat API error:", error);
      responseText = "Signal lost. XETA AI is currently offline.";
    }

    const finalMessages: ChatMessage[] = [
      ...updatedMessages,
      { role: 'model', text: responseText },
    ];
    setMessages(finalMessages);
    setIsLoading(false);

    // Save final response to Firestore
    saveChatSessionMessage(
      sessionId,
      finalMessages.map((m) => ({
        role: m.role,
        text: m.text,
        timestamp: new Date().toISOString(),
      }))
    );
  };

  const handleResetChat = () => {
    const newSession = 'session_' + Math.random().toString(36).substring(2, 11);
    setSessionId(newSession);
    setMessages([
      {
        role: 'model',
        text: '⚡ **Conversation refreshed.**\n\nHow can **XETA Forge** engineer solutions for your product or enterprise today?',
      },
    ]);
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end pointer-events-auto">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.94 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className="mb-3 w-[calc(100vw-24px)] sm:w-[440px] h-[480px] sm:h-[520px] max-h-[75vh] glass-panel rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_30px_rgba(6,182,212,0.15)] border border-white/20"
          >
            {/* Header */}
            <div className="bg-slate-950/50 backdrop-blur-2xl p-3 sm:p-3.5 px-3.5 sm:px-4 flex justify-between items-center border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="relative p-1.5 bg-gradient-to-br from-cyan-400/25 to-blue-500/20 rounded-xl text-cyan-300 border border-cyan-300/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_0_15px_rgba(6,182,212,0.25)] flex items-center justify-center">
                  <XetaForgeEmblem size={20} className="w-5 h-5" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-slate-950 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-white tracking-wider text-xs flex items-center gap-1.5">
                    <span>XETA</span>
                    <span className="text-cyan-300">FORGE</span>
                    <span className="px-1.5 py-0.2 text-[9px] rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 font-mono">
                      AI 3.8
                    </span>
                  </h3>
                  <span className="text-[10px] font-mono text-cyan-300/80 tracking-wider block">
                    ONLINE · TECHNICAL CONCIERGE
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleResetChat}
                  title="Reset conversation"
                  className="p-1.5 text-white/50 hover:text-cyan-300 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth bg-slate-950/40 backdrop-blur-md"
            >
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-2.5 ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {/* Assistant Avatar for model messages */}
                  {msg.role === 'model' && (
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center shrink-0 mt-1 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                      <XetaForgeEmblem size={15} className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[84%] p-3.5 rounded-2xl ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-tr-none shadow-[0_4px_16px_rgba(6,182,212,0.3)] border border-cyan-300/30 font-medium'
                        : 'bg-white/[0.07] backdrop-blur-xl text-slate-100 rounded-tl-none border border-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_4px_20px_rgba(0,0,0,0.3)]'
                    }`}
                  >
                    <ChatMessageContent content={msg.text} isUser={msg.role === 'user'} />
                  </div>
                </div>
              ))}

              {/* Typing / Loading indicator */}
              {isLoading && (
                <div className="flex items-start gap-2.5 justify-start">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center shrink-0 mt-1">
                    <XetaForgeEmblem size={15} className="w-3.5 h-3.5 animate-pulse" />
                  </div>
                  <div className="bg-white/[0.07] backdrop-blur-xl px-4 py-3 rounded-2xl rounded-tl-none border border-white/15 flex items-center gap-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce shadow-[0_0_6px_rgba(6,182,212,0.8)]" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce shadow-[0_0_6px_rgba(6,182,212,0.8)]" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce shadow-[0_0_6px_rgba(6,182,212,0.8)]" style={{ animationDelay: '300ms' }} />
                    <span className="text-[11px] font-mono text-cyan-300/80 ml-1.5">Synthesizing...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Prompt Suggestions Row */}
            <div className="px-3 py-2 bg-slate-950/30 border-t border-white/10 overflow-x-auto no-scrollbar shrink-0">
              <div className="flex gap-1.5 w-max">
                {SUGGESTED_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(prompt.query)}
                    disabled={isLoading}
                    className="px-2.5 py-1 rounded-full bg-white/[0.05] hover:bg-cyan-500/15 text-slate-300 hover:text-cyan-200 border border-white/10 hover:border-cyan-400/30 text-[11px] font-medium transition-all whitespace-nowrap active:scale-95 disabled:opacity-40"
                  >
                    {prompt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <div className="p-3 border-t border-white/10 bg-slate-950/50 backdrop-blur-2xl shrink-0">
              <div className="flex items-center gap-2 bg-white/[0.05] border border-white/15 focus-within:border-cyan-400/60 rounded-2xl px-3 py-1.5 transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSendMessage(input);
                    }
                  }}
                  placeholder="Ask about Web Dev, AI Models, Pricing..."
                  className="flex-1 bg-transparent text-white placeholder-slate-400 text-base sm:text-sm focus:outline-none py-1"
                />
                <button
                  onClick={() => handleSendMessage(input)}
                  disabled={isLoading || !input.trim()}
                  className="p-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all disabled:opacity-30 disabled:pointer-events-none text-white shadow-[0_2px_10px_rgba(6,182,212,0.3)] active:scale-95"
                >
                  <Send className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-13 h-13 md:w-14 md:h-14 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 text-white flex items-center justify-center z-50 group shadow-[0_0_25px_rgba(6,182,212,0.4),0_8px_20px_rgba(0,0,0,0.5)] border border-cyan-300/40"
      >
        <span className="absolute -inset-0.5 rounded-full bg-cyan-400/30 blur-sm group-hover:bg-cyan-400/50 transition-all" />
        <div className="relative flex items-center justify-center">
          {isOpen ? (
            <X className="w-5 h-5 md:w-6 md:h-6 text-white" />
          ) : (
            <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:scale-110 transition-transform" />
          )}
        </div>
      </motion.button>
    </div>
  );
};

export default AIChat;
