/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PageId = 'home' | 'services' | 'process' | 'about' | 'contact';

export type ServiceVisualId =
  | 'data'
  | 'web'
  | 'automation'
  | 'chatbot'
  | 'mobile'
  | 'training';

export interface Service {
  id: string;
  visualId: ServiceVisualId;
  image: string;
  imageAlt: string;
  title: string;
  category: string;
  outcome: string;
  description: string;
  deliverable: string;
  features: string[];
}

export interface ProcessStep {
  step: string;
  title: string;
  summary: string;
  details: string;
  artifact: string;
}

export interface EngagementScope {
  name: string;
  tag: string;
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}
