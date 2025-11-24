import React from 'react';

export interface InsectData {
  commonName: string;
  scientificName: string;
  description: string;
  toxicity: string;
  habitat: string;
  behavior: string;
  isPest: boolean;
  pestSolutions: string[];
  safetyTips: string[];
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  imageUrl: string;
  data: InsectData;
}

export enum AppView {
  IDENTIFY = 'IDENTIFY',
  HISTORY = 'HISTORY',
  SAFETY_GUIDE = 'SAFETY_GUIDE',
  GARDEN_SOLUTIONS = 'GARDEN_SOLUTIONS',
}

export interface NavItem {
  id: AppView;
  label: string;
  icon: React.ReactNode;
}