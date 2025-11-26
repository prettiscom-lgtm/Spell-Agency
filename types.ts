import React from 'react';

export interface NavItem {
  label: string;
  id: string;
  type: 'link' | 'scroll'; // Added to distinguish between page nav and scroll nav
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
  content?: string; // Main paragraph text
  bullets?: string[];
  statValue?: string; // e.g. "90%"
  statLabel?: string; // e.g. "Reduction in wait time"
  quoteAuthor?: string; // For quote layout
  imagePrompt?: string; // Description for the visual placeholder
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
  userMood: string; // e.g. "Curious", "Frustrated"
  personalityType: string; // e.g. "Visionary", "Pragmatist"
  engagementLevel: number; // 0-100
  sentiment: Sentiment;
  harryThought: string; // Internal monologue / thought about the user
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