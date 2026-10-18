/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ExternalLink, MessageSquare, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface ChatMessageContentProps {
  content: string;
  isUser: boolean;
}

/**
 * Parses inline formatting like **bold**, `code`, and [label](url)
 */
function renderInlineFormattedText(text: string): React.ReactNode[] {
  // Regex pattern matching:
  // 1. [link text](url)
  // 2. **bold text**
  // 3. `inline code`
  const tokenRegex = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|`[^`]+`)/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, index) => {
    if (!part) return null;

    // Check markdown link: [label](url)
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, url] = linkMatch;
      const isWhatsApp = url.includes('wa.me') || url.includes('whatsapp');
      return (
        <a
          key={index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1 font-medium transition-colors px-1.5 py-0.5 rounded-md ${
            isWhatsApp
              ? 'text-emerald-300 bg-emerald-500/15 border border-emerald-400/30 hover:bg-emerald-500/25'
              : 'text-cyan-300 bg-cyan-500/15 border border-cyan-400/30 hover:bg-cyan-500/25'
          }`}
        >
          <span>{label}</span>
          <ArrowUpRight className="w-3 h-3 opacity-80" />
        </a>
      );
    }

    // Check bold: **bold text**
    const boldMatch = part.match(/^\*\*([^*]+)\*\*$/);
    if (boldMatch) {
      return (
        <strong key={index} className="text-white font-semibold tracking-wide">
          {boldMatch[1]}
        </strong>
      );
    }

    // Check inline code: `code`
    const codeMatch = part.match(/^`([^`]+)`$/);
    if (codeMatch) {
      return (
        <code
          key={index}
          className="px-1.5 py-0.5 rounded bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 font-mono text-xs"
        >
          {codeMatch[1]}
        </code>
      );
    }

    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}

export const ChatMessageContent: React.FC<ChatMessageContentProps> = ({ content, isUser }) => {
  if (isUser) {
    return <div className="text-sm font-medium leading-relaxed whitespace-pre-wrap">{content}</div>;
  }

  // Normalize line endings and split into lines
  const lines = content.replace(/\r\n/g, '\n').split('\n');

  // Group lines into blocks: header, list-item, numbered-item, or paragraph
  type BlockType =
    | { type: 'header'; text: string }
    | { type: 'bullet'; items: string[] }
    | { type: 'numbered'; items: { num: string; text: string }[] }
    | { type: 'paragraph'; text: string };

  const blocks: BlockType[] = [];
  let currentBullets: string[] = [];
  let currentNumbered: { num: string; text: string }[] = [];
  let currentParagraphLines: string[] = [];

  const flushLists = () => {
    if (currentBullets.length > 0) {
      blocks.push({ type: 'bullet', items: [...currentBullets] });
      currentBullets = [];
    }
    if (currentNumbered.length > 0) {
      blocks.push({ type: 'numbered', items: [...currentNumbered] });
      currentNumbered = [];
    }
    if (currentParagraphLines.length > 0) {
      const text = currentParagraphLines.join(' ').trim();
      if (text) {
        blocks.push({ type: 'paragraph', text });
      }
      currentParagraphLines = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      // Empty line -> flush lists and paragraphs
      flushLists();
      continue;
    }

    // Bullet line test (* item, • item, - item)
    if (trimmed.startsWith('* ') || trimmed.startsWith('• ') || trimmed.startsWith('- ')) {
      if (currentNumbered.length > 0 || currentParagraphLines.length > 0) {
        flushLists();
      }
      currentBullets.push(trimmed.slice(2).trim());
      continue;
    }

    // Numbered list test (1. item, 2. item)
    const numberedMatch = trimmed.match(/^(\d+)[\.\)]\s+(.*)$/);
    if (numberedMatch) {
      if (currentBullets.length > 0 || currentParagraphLines.length > 0) {
        flushLists();
      }
      currentNumbered.push({ num: numberedMatch[1], text: numberedMatch[2] });
      continue;
    }

    // Check if line looks like a header/section title (e.g. "**Title:**" or "### Title")
    const isMarkdownHeading = /^#{1,4}\s+/.test(trimmed);
    const isBoldHeaderLine =
      trimmed.includes('**') &&
      (trimmed.endsWith(':') ||
        (trimmed.startsWith('**') && trimmed.endsWith('**')) ||
        (trimmed.length < 80 && !trimmed.includes('. ')));

    if (isMarkdownHeading || isBoldHeaderLine) {
      flushLists();
      const cleanHeader = trimmed.replace(/^#{1,4}\s+/, '');
      blocks.push({ type: 'header', text: cleanHeader });
      continue;
    }

    // Normal paragraph text
    if (currentBullets.length > 0 || currentNumbered.length > 0) {
      flushLists();
    }
    currentParagraphLines.push(trimmed);
  }

  flushLists();

  // Check if message references WhatsApp
  const hasWhatsApp =
    content.includes('wa.me') ||
    content.toLowerCase().includes('whatsapp') ||
    content.includes('+923711889382');

  return (
    <div className="space-y-3 text-slate-200 text-sm leading-relaxed">
      {blocks.map((block, idx) => {
        if (block.type === 'header') {
          return (
            <div
              key={idx}
              className="pt-1.5 pb-0.5 border-b border-white/10 flex items-center gap-1.5"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              <div className="font-heading font-semibold text-cyan-200 tracking-wide text-[13px]">
                {renderInlineFormattedText(block.text)}
              </div>
            </div>
          );
        }

        if (block.type === 'bullet') {
          return (
            <div key={idx} className="space-y-1.5 my-1">
              {block.items.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  className="flex items-start gap-2.5 p-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0 shadow-[0_0_6px_rgba(6,182,212,0.7)]" />
                  <div className="flex-1 text-[13px] leading-snug text-slate-200">
                    {renderInlineFormattedText(item)}
                  </div>
                </div>
              ))}
            </div>
          );
        }

        if (block.type === 'numbered') {
          return (
            <div key={idx} className="space-y-1.5 my-1">
              {block.items.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  className="flex items-start gap-2.5 p-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 transition-colors"
                >
                  <span className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 text-[10px] font-mono flex items-center justify-center shrink-0 mt-0.5">
                    {item.num}
                  </span>
                  <div className="flex-1 text-[13px] leading-snug text-slate-200">
                    {renderInlineFormattedText(item.text)}
                  </div>
                </div>
              ))}
            </div>
          );
        }

        return (
          <p key={idx} className="text-[13px] text-slate-200 leading-relaxed">
            {renderInlineFormattedText(block.text)}
          </p>
        );
      })}

      {/* Interactive Quick Action Pill if WhatsApp is mentioned */}
      {hasWhatsApp && (
        <div className="pt-2 border-t border-white/10 flex flex-wrap gap-2">
          <a
            href="https://wa.me/923711889382"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-medium hover:bg-emerald-500/30 transition-all shadow-[0_0_12px_rgba(16,185,129,0.2)]"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat on WhatsApp (+92 371 1889382)</span>
            <ArrowUpRight className="w-3 h-3 opacity-70" />
          </a>
        </div>
      )}
    </div>
  );
};
