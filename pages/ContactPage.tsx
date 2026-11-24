/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  Bot,
  Building2,
  CheckCircle2,
  Code2,
  Cpu,
  Mail,
  MessageCircle,
  Smartphone,
  User,
} from 'lucide-react';
import {
  ENGAGEMENT_SCOPES,
  STUDIO_EMAIL,
  WHATSAPP_DISPLAY,
  WHATSAPP_URL,
} from '../data/studioData';

interface ContactPageProps {
  initialScope?: string;
}

const SCOPE_ICONS = [Code2, BarChart3, Code2, Bot, Smartphone, Cpu];

const SERVICE_TO_SCOPE: Record<string, string> = {
  'Data Analysis': 'Data Analysis & Dashboards',
  'Website Development': 'New Website or Online Portal',
  'Web Development & Design': 'New Website or Online Portal',
  'Website Design & Building': 'New Website or Online Portal',
  'AI & Task Automation': 'Time-Saving Automation & Chat',
  'Daily Task Automation': 'Time-Saving Automation & Chat',
  'Smart Customer Chatbots': 'Time-Saving Automation & Chat',
  'Mobile App Development': 'iPhone & Android Mobile App',
  'AI Model Training': 'Custom AI Model Training',
  'Private AI Assistants': 'Custom AI Model Training',
};

const resolveScope = (value: string): string =>
  SERVICE_TO_SCOPE[value] || value;

const ContactPage: React.FC<ContactPageProps> = ({
  initialScope = 'Free Discovery Call',
}) => {
  const [selectedScope, setSelectedScope] = useState<string>(() =>
    resolveScope(initialScope)
  );

  useEffect(() => {
    setSelectedScope(resolveScope(initialScope));
  }, [initialScope]);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [whatsappHandoffUrl, setWhatsappHandoffUrl] = useState<string>(WHATSAPP_URL);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();

    if (!trimmedName || !trimmedEmail) {
      setSubmissionError('Please enter your name and email address.');
      return;
    }

    setSubmissionError(null);
    setIsSubmitting(true);

    try {
      const { saveConsultation } = await import('../services/firebase');
      await saveConsultation({
        name: trimmedName,
        company: formData.company.trim(),
        email: trimmedEmail,
        projectType: selectedScope,
        message: formData.message.trim(),
      });

      const whatsappMessage = encodeURIComponent(
        `*New XETA FORGE Project Inquiry*\n` +
          `• *Name:* ${trimmedName}\n` +
          `• *Business:* ${formData.company.trim() || 'N/A'}\n` +
          `• *Email:* ${trimmedEmail}\n` +
          `• *Looking For:* ${selectedScope}\n` +
          `• *Details:* ${formData.message.trim() || 'N/A'}`
      );
      setWhatsappHandoffUrl(`${WHATSAPP_URL}?text=${whatsappMessage}`);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Failed to save consultation:', error);
      setSubmissionError(
        'We could not save your request right now. Please message us directly on WhatsApp or email.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="pt-28 sm:pt-36 pb-20 px-4 sm:px-6 max-w-7xl mx-auto w-full space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#4E6D51]">
          Get in Touch
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl font-semibold text-[#262A24] tracking-tight">
          Tell us what you want to build
        </h1>
        <p className="text-sm sm:text-base text-[#4D5549]">
          Pick what fits best below and share a few notes. We reply within one
          business day, or you can message us directly on WhatsApp.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Option Selection */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#4E6D51] mb-2">
            1. Choose What You Need
          </div>

          {ENGAGEMENT_SCOPES.map((tier, idx) => {
            const isSelected = selectedScope === tier.name;
            const Icon = SCOPE_ICONS[idx % SCOPE_ICONS.length];
            return (
              <button
                key={tier.name}
                type="button"
                onClick={() => setSelectedScope(tier.name)}
                className={`w-full text-left rounded-[22px] p-5 transition-all cursor-pointer ${
                  isSelected
                    ? 'frosted-glass border-[#4E6D51]/50'
                    : 'studio-card'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'sage-medallion text-white'
                          : 'bg-[#EEF2EC] border border-[#4E6D51]/20 text-[#4E6D51]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </span>
                    <div>
                      <h2 className="font-heading text-xl font-semibold text-[#262A24]">
                        {tier.name}
                      </h2>
                      <div className="text-[11px] font-medium text-[#155EEF]">
                        {tier.tag}
                      </div>
                    </div>
                  </div>
                  {isSelected && (
                    <CheckCircle2 className="w-5 h-5 text-[#4E6D51] shrink-0" />
                  )}
                </div>
                <p className="text-xs text-[#4D5549] leading-relaxed mt-3">
                  {tier.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Right: Contact Form */}
        <div className="lg:col-span-7 frosted-glass rounded-[28px] p-6 sm:p-9">
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#4E6D51] mb-6">
            2. Your Details
          </div>

          {isSubmitted ? (
            <div className="py-8 text-center space-y-5">
              <span className="w-14 h-14 rounded-full sage-medallion flex items-center justify-center text-white mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </span>
              <div className="space-y-2">
                <h2 className="font-heading text-3xl font-semibold text-[#262A24]">
                  Thank You — Message Received
                </h2>
                <p className="text-sm text-[#4D5549] max-w-md mx-auto">
                  We saved your request for{' '}
                  <span className="font-semibold text-[#262A24]">
                    {selectedScope}
                  </span>
                  . Want a quicker answer? Open WhatsApp below to chat with our
                  team right away:
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={whatsappHandoffUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cobalt w-full sm:w-auto px-6 py-3 rounded-full text-xs font-semibold tracking-wide inline-flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4" />
                  Message on WhatsApp ({WHATSAPP_DISPLAY})
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      name: '',
                      company: '',
                      email: '',
                      message: '',
                    });
                  }}
                  className="btn-cream w-full sm:w-auto px-6 py-3 rounded-full text-xs font-semibold tracking-wide cursor-pointer whitespace-nowrap"
                >
                  Send Another Request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="brief-name"
                    className="text-xs font-medium text-[#262A24] flex items-center gap-1.5"
                  >
                    <User className="w-3.5 h-3.5 text-[#4E6D51]" /> Your Name *
                  </label>
                  <input
                    id="brief-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Alex Mercer"
                    className="w-full studio-input rounded-xl px-4 py-3 text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="brief-company"
                    className="text-xs font-medium text-[#262A24] flex items-center gap-1.5"
                  >
                    <Building2 className="w-3.5 h-3.5 text-[#4E6D51]" />{' '}
                    Business Name (Optional)
                  </label>
                  <input
                    id="brief-company"
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    placeholder="Greenleaf Bakery"
                    className="w-full studio-input rounded-xl px-4 py-3 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="brief-email"
                  className="text-xs font-medium text-[#262A24] flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-[#4E6D51]" /> Email Address *
                </label>
                <input
                  id="brief-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="you@example.com"
                  className="w-full studio-input rounded-xl px-4 py-3 text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="brief-notes"
                  className="text-xs font-medium text-[#262A24]"
                >
                  How Can We Help?
                </label>
                <textarea
                  id="brief-notes"
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Tell us in your own words what you would like to build or improve..."
                  className="w-full studio-input rounded-xl px-4 py-3 text-sm resize-none"
                />
              </div>

              {submissionError && (
                <div className="p-3.5 rounded-xl bg-[#EFF5FF] border border-[#155EEF]/35 text-[#0D3FA8] text-xs leading-relaxed">
                  {submissionError}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-cobalt w-full py-3.5 rounded-full text-sm font-semibold tracking-wide inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-55"
              >
                {isSubmitting ? (
                  'Sending Request...'
                ) : (
                  <>
                    Send Request &amp; Message on WhatsApp
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-5 text-xs text-[#4D5549]">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#155EEF] underline-offset-4 hover:underline"
                >
                  WhatsApp: {WHATSAPP_DISPLAY}
                </a>
                <span className="hidden sm:inline text-[#262A24]/25">·</span>
                <a
                  href={`mailto:${STUDIO_EMAIL}`}
                  className="hover:text-[#155EEF] underline-offset-4 hover:underline"
                >
                  {STUDIO_EMAIL}
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
