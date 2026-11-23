/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MessageCircle, ArrowUpRight } from 'lucide-react';
import { WHATSAPP_DISPLAY, WHATSAPP_URL } from '../data/studioData';

interface ChatMessageContentProps {
  text: string;
}

const renderInlineFormatting = (
  line: string,
  keyPrefix: string
): React.ReactNode[] => {
  const tokenRegex = /(\*\*[^*]+\*\*|`[^`]+`|https:\/\/wa\.me\/[0-9]+)/g;
  const parts = line.split(tokenRegex);

  return parts.map((part, idx) => {
    const key = `${keyPrefix}-${idx}`;
    if (!part) return null;

    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return (
        <strong key={key} className="font-semibold text-[#262A24]">
          {part.slice(2, -2)}
        </strong>
      );
    }

    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return (
        <code
          key={key}
          className="px-1.5 py-0.5 rounded bg-[#EEF2EC] border border-[#4E6D51]/20 font-mono text-[11px] text-[#3B553E]"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    if (part.startsWith('https://wa.me/')) {
      return (
        <a
          key={key}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-2.5 py-0.5 mx-0.5 rounded-full bg-[#EEF2EC] border border-[#4E6D51]/30 text-[#3B553E] hover:bg-[#E1EAE0] font-medium text-xs transition-colors"
        >
          <MessageCircle className="w-3 h-3" />
          WhatsApp ({WHATSAPP_DISPLAY})
          <ArrowUpRight className="w-3 h-3" />
        </a>
      );
    }

    return <React.Fragment key={key}>{part}</React.Fragment>;
  });
};

export const ChatMessageContent: React.FC<ChatMessageContentProps> = ({
  text,
}) => {
  const lines = text.split('\n');
  const hasWhatsAppMention =
    text.includes('wa.me/923711889382') || text.includes(WHATSAPP_DISPLAY);

  return (
    <div className="space-y-2 text-[13px] leading-relaxed text-[#343B31]">
      {lines.map((rawLine, index) => {
        const line = rawLine.trim();
        if (!line) {
          return <div key={`sp-${index}`} className="h-1" />;
        }

        if (line.startsWith('### ') || line.startsWith('## ')) {
          const clean = line.replace(/^#{2,3}\s+/, '');
          return (
            <div
              key={`h-${index}`}
              className="pt-1 font-sans text-xs font-semibold uppercase tracking-wider text-[#B24E30]"
            >
              {renderInlineFormatting(clean, `hi-${index}`)}
            </div>
          );
        }

        const bulletMatch = line.match(/^[-*•]\s+(.*)$/);
        if (bulletMatch) {
          return (
            <div
              key={`b-${index}`}
              className="flex items-start gap-2 pl-1.5 py-0.5"
            >
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#4E6D51] shrink-0" />
              <div className="flex-1">
                {renderInlineFormatting(bulletMatch[1], `bi-${index}`)}
              </div>
            </div>
          );
        }

        const numMatch = line.match(/^(\d+)\.\s+(.*)$/);
        if (numMatch) {
          return (
            <div
              key={`n-${index}`}
              className="flex items-start gap-2 pl-1 py-0.5"
            >
              <span className="font-mono text-[10px] font-semibold text-[#3B553E] bg-[#EEF2EC] rounded px-1.5 py-0.5 shrink-0 mt-0.5">
                {numMatch[1]}
              </span>
              <div className="flex-1">
                {renderInlineFormatting(numMatch[2], `ni-${index}`)}
              </div>
            </div>
          );
        }

        return (
          <p key={`p-${index}`} className="text-[#343B31]">
            {renderInlineFormatting(line, `pi-${index}`)}
          </p>
        );
      })}

      {hasWhatsAppMention && (
        <div className="pt-1.5">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-[#EEF2EC] hover:bg-[#E4ECE1] border border-[#4E6D51]/25 text-[#262A24] transition-colors group"
          >
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full sage-medallion flex items-center justify-center text-white shrink-0">
                <MessageCircle className="w-3.5 h-3.5" />
              </span>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-[#262A24]">
                  Chat on WhatsApp
                </span>
                <span className="text-[10px] text-[#4D5549]">
                  {WHATSAPP_DISPLAY}
                </span>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#4E6D51] group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      )}
    </div>
  );
};

export default ChatMessageContent;
