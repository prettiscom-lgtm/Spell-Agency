import React from 'react';

export interface NavItem {
  label: string;
  id: string;
  type: 'link' | 'scroll';
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  linkText: string;
}

// --- AI & Chat Types ---

export type ContentType = 'text' | 'presentation' | 'video_concept' | 'case_study' | 'image_mock';

export type SlideLayout = 'title' | 'agenda' | 'bullet_list' | 'split_image_right' | 'big_stat' | 'quote' | 'case_study_slide';

export interface Slide {
  layout: SlideLayout;
  title: string;
  subtitle?: string;
  content?: string; 
  bullets?: string[];
  statValue?: string;
  statLabel?: string;
  quoteAuthor?: string;
  imagePrompt?: string;
}

export interface PresentationData {
  title: string;
  slides: Slide[];
}

export interface VideoData {
  title: string;
  duration: string;
  script: string;
  visualStyle: string;
}

export interface CaseStudyData {
  companyName: string;
  challenge: string;
  solution: string;
  results: string[];
}

export type Sentiment = 'neutral' | 'excited' | 'skeptical' | 'happy' | 'confused' | 'curious';

export interface Psychometrics {
  userMood: string; 
  personalityType: string;
  engagementLevel: number; 
  sentiment: Sentiment;
  harryThought: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'system' | 'assistant';
  type: ContentType;
  text: string;
  data?: PresentationData | VideoData | CaseStudyData | any;
  psychometrics?: Psychometrics;
  timestamp: number;
}

export interface AIResponse {
  type: string;
  content: {
    textResponse: string;
    presentationData?: PresentationData;
    videoData?: VideoData;
    caseStudyData?: CaseStudyData;
    psychometrics?: Psychometrics;
  };
}

export type Page = 'home' | 'contact' | 'privacy' | 'terms' | 'services';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMessage?: string; // Added for Hero input
}