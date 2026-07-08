/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';
import { saveChatSessionMessage } from '../services/firebase';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId] = useState(() => 'session_' + Math.random().toString(36).substring(2, 11));
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Welcome to XETA Forge! I am XETA AI. Ask me anything about our Next-Gen Web Development, AI Automation, or Custom Chatbot services! ⚡️' }
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
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    // Save user message to Firestore chat session
    saveChatSessionMessage(sessionId, updatedMessages.map(m => ({
      role: m.role,
      text: m.text,
      timestamp: new Date().toISOString()
    })));

    // Slight delay to allow state update to render before scrolling
    setTimeout(scrollToBottom, 100);

    const responseText = await sendMessageToGemini(input);
    
    const finalMessages: ChatMessage[] = [...updatedMessages, { role: 'model', text: responseText }];
    setMessages(finalMessages);
    setIsLoading(false);

    // Save final response from Gemini to Firestore chat session
    saveChatSessionMessage(sessionId, finalMessages.map(m => ({
      role: m.role,
      text: m.text,
      timestamp: new Date().toISOString()
    })));
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end pointer-events-auto">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-[90vw] md:w-96 bg-slate-950/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/10"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-950/80 to-slate-900/80 p-4 flex justify-between items-center border-b border-white/10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
                <h3 className="font-heading font-bold text-white tracking-wider text-sm">XETA AI</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white" data-hover="true">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={chatContainerRef}
              className="h-64 md:h-80 overflow-y-auto p-4 space-y-3 scroll-smooth bg-slate-950/40"
            >
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-lg text-sm ${
                      msg.role === 'user'
                        ? 'bg-cyan-500 text-slate-950 rounded-tr-none font-medium'
                        : 'bg-white/5 text-slate-200 rounded-tl-none border border-white/10'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-3 rounded-lg rounded-tl-none border border-white/10 flex gap-1">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/10 bg-slate-950">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Ask about Web Dev, AI Automation..."
                  className="flex-1 bg-transparent text-white placeholder-slate-500 text-sm focus:outline-none"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="bg-cyan-500 p-2 rounded-lg hover:bg-cyan-400 transition-colors disabled:opacity-50 text-slate-950"
                  data-hover="true"
                >
                  <Send className="w-4 h-4 text-slate-950" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 border border-white/20 z-50 group"
        data-hover="true"
      >
        {isOpen ? (
          <X className="w-5 h-5 md:w-6 md:h-6 text-white" />
        ) : (
          <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:animate-bounce" />
        )}
      </motion.button>
    </div>
  );
};

export default AIChat;
