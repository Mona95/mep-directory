import type { MEP } from './index';

export interface CampaignState {
  selectedMep: MEP | null;
  greeting: string;
  opening: string;
  customOpening: string;
  concerns: string[];
  customConcern: string;
  asks: string[];
  customAsk: string;
  closing: string;
  customClosing: string;
  personalMessage: string;
  senderName: string;
  currentStep: number;
  lastSaved: number | null;
  // Randomly assigned on first load
  templateIndex: number | null;
  subjectIndex: number | null;
}

export const initialCampaignState: CampaignState = {
  selectedMep: null,
  greeting: '',
  opening: '',
  customOpening: '',
  concerns: [],
  customConcern: '',
  asks: [],
  customAsk: '',
  closing: '',
  customClosing: '',
  personalMessage: '',
  senderName: '',
  currentStep: 1,
  lastSaved: null,
  templateIndex: null,
  subjectIndex: null,
};
