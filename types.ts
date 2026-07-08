/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export interface Service {
  id: string;
  title: string;
  tagline: string;
  image: string;
  statusTag: string; // e.g., "Scalable", "Efficient", "24/7 Smart"
  description: string;
  features: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum Section {
  HERO = 'hero',
  SERVICES = 'services',
  PROCESS = 'process',
  ABOUT = 'about',
  CONTACT = 'contact',
}

