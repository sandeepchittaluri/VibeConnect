export enum Gender {
  Male = 'Male',
  Female = 'Female',
  NonBinary = 'Non-binary',
  Other = 'Other'
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
  gender: Gender;
  age: number;
  about: string;
  interests: string[];
  location?: Location;
  credits: number;
  isVisible: boolean;
  isPaused: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  content: string; // Text or URL for media
  type: 'text' | 'image' | 'video' | 'audio' | 'emoji';
  timestamp: number;
}

export interface ChatSession {
  id: string;
  participantId: string;
  messages: Message[];
  lastMessageTimestamp: number;
  unreadCount: number;
}

export interface CreditPackage {
  id: string;
  credits: number;
  price: number;
  label: string;
}

export type AppView = 'auth' | 'profile-setup' | 'nearby' | 'chat-list' | 'chat-room' | 'store' | 'settings';
