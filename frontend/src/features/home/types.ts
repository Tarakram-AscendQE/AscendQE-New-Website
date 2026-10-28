export interface StepItem {
  label: string;
  title: string;
  description: string;
  actors: string[];
  next: string[];
  parcel: string;
  checkpoint: string;
  branch: string;
}

export interface MapNode {
  cx: number;
  cy: number;
  textY: number;
  textX?: number;
  label: string;
}

export interface CrewBot {
  bot: string;
  role: string;
  className: string;
  idx: number;
}

export interface ModeData {
  title: string;
  description: string;
  checks: string[];
  mission: string;
  rows: [string, string][];
}

