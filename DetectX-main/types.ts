export type ViewState = 'home' | 'cases' | 'dashboard' | 'about' | 'settings' | 'login' | 'profile' | 'help';

export interface AccessLog {
  timestamp: string;
  ip: string;
  device: string;
  location?: string;
}

export interface User {
  name: string;
  email: string;
  avatar: string;
  role: string;
  casesCount: number;
  exportsCount: number;
  accessLogs: AccessLog[];
}

export interface Case {
  id: string;
  title: string;
  status: 'Draft' | 'Refined' | 'Exported';
  date: string;
  confidence: number;
  thumbnail?: string;
  lastMessage?: string;
}

export interface ChatMessage {
  id: string;
  role: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export interface FacialAttributes {
  ageRange: string;
  gender: string;
  faceShape: string;
  hairStyle: string;
  facialHair: string;
  distinctMarks: string;
}

export interface TimelineEvent {
  id: string;
  type: 'generation' | 'refinement';
  description: string;
  timestamp: string;
  confidence: number;
  thumbnail?: string;
}

export interface Sketch {
  id: string;
  imageUrl: string;
  createdAt: string;
  baseDescription: string;
  refinements: string[];
}