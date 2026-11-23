/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { ChatMessage } from '../types';
import { WHATSAPP_URL } from '../data/studioData';
import { XetaForgeEmblem } from './XetaForgeLogo';
import ChatMessageContent from './ChatMessageContent';

const SUGGESTED_PROMPTS = [
  { label: 'What You Build', prompt: 'What services does Xeta Forge offer?' },
  { label: 'Websites', prompt: 'Tell me about your Website Design and Building service.' },
  { label: 'Mobile Apps', prompt: 'Can you build a mobile app for iPhone and Android?' },
  { label: 'Save Time', prompt: 'How can you automate daily repetitive tasks for my business?' },
  { label: 'How It Works', prompt: 'How does your four-step process work?' },
  { label: 'WhatsApp', prompt: 'How can I contact Xeta Forge on WhatsApp?' },
];

interface AIChatProps {
  defaultOpen?: boolean;
}

const AIChat: React.FC<AIChatProps> = ({ defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: `Hello! I am the **Xeta Forge Assistant**.\n\nAsk anything about **Websites**, **Mobile Apps**, **Time-Saving Automations**, or **Customer Chatbots** in plain English — or message our team anytime on WhatsApp: ${WHATSAPP_URL}`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(
    () => `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
  );
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const sendMessageText = async (userMessage: string) => {
    const trimmed = userMessage.trim();
    if (!trimmed || isLoading) return;

    setInput('');
    const newMessages: ChatMessage[] = [
      ...messages,
      { role: 'user', text: trimmed },
    ];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: trimmed }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Unable to process message.');
      }

      const updatedMessages: ChatMessage[] = [
        ...newMessages,
        { role: 'model', text: data.reply },
      ];
      setMessages(updatedMessages);

      import('../services/firebase')
        .then(({ saveChatSessionMessage }) =>
          saveChatSessionMessage(
            sessionId,
            updatedMessages.map((m) => ({
              role: m.role,
              text: m.text,
              timestamp: new Date().toISOString(),
            }))
          )
        )
        .catch((err) => {
          console.warn('Chat session sync skipped:', err);
        });
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          text: `We could not send that message right now. Please message our team directly on WhatsApp: ${WHATSAPP_URL}`,
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => {
    void sendMessageText(input);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-3 sm:mb-4 w-[calc(100vw-2rem)] sm:w-96 max-w-sm frosted-glass rounded-[26px] overflow-hidden flex flex-col max-h-[82vh]">
          <div className="px-4 py-3.5 border-b border-[#262A24]/10 flex items-center justify-between shrink-0 bg-[#FBF7F0]/80">
            <div className="flex items-center gap-2.5">
              <XetaForgeEmblem className="w-8 h-8 rounded-full shadow-xs" />
              <div>
                <h3 className="font-sans text-xs font-semibold tracking-[0.14em] text-[#262A24] uppercase">
                  Xeta Forge Helper
                </h3>
                <p className="text-[11px] text-[#4E6D51]">
                  Ask Any Question
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#4D5549] hover:text-[#262A24] p-1.5 rounded-full hover:bg-[#262A24]/5 transition-colors cursor-pointer"
              aria-label="Close Assistant"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="px-3 py-2 border-b border-[#262A24]/10 bg-[#EEF2EC]/70 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
            {SUGGESTED_PROMPTS.map((item) => (
              <button
                key={item.label}
                onClick={() => sendMessageText(item.prompt)}
                disabled={isLoading}
                className="shrink-0 px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/90 hover:bg-white border border-[#4E6D51]/25 hover:border-[#B24E30]/45 text-[#262A24] transition-colors cursor-pointer disabled:opacity-50 whitespace-nowrap"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div
            ref={chatContainerRef}
            className="flex-1 min-h-[240px] max-h-[340px] overflow-y-auto p-4 space-y-3 bg-[#FBF7F0]/75"
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#A6482C] text-white rounded-br-sm shadow-xs'
                      : 'bg-white/95 text-[#262A24] border border-[#4E6D51]/15 rounded-bl-sm shadow-xs'
                  }`}
                >
                  {msg.role === 'user' ? (
                    msg.text
                  ) : (
                    <ChatMessageContent text={msg.text} />
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/95 border border-[#4E6D51]/15 rounded-2xl rounded-bl-sm px-3.5 py-2.5 text-xs text-[#4D5549]">
                  Writing reply...
                </div>
              </div>
            )}
          </div>

          <div className="p-3 bg-[#FBF7F0]/85 border-t border-[#262A24]/10 flex items-center gap-2 shrink-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about websites, apps, or pricing..."
              aria-label="Ask Xeta Forge Helper"
              className="flex-1 studio-input rounded-full px-4 py-2 text-xs"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="w-9 h-9 rounded-full btn-terracotta flex items-center justify-center disabled:opacity-45 disabled:cursor-not-allowed cursor-pointer shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-13 h-13 rounded-full btn-terracotta flex items-center justify-center cursor-pointer"
        aria-label={isOpen ? 'Close Assistant' : 'Open Assistant'}
      >
        {isOpen ? (
          <X className="w-5 h-5 text-white" />
        ) : (
          <MessageSquare className="w-5 h-5 text-white" />
        )}
      </button>
    </div>
  );
};

export default AIChat;
