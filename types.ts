
export enum ValidationStatus {
  VALID = "Valid",
  INVALID = "Invalid",
  NEEDS_REFINEMENT = "Needs Refinement"
}

export interface SWOT {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface RoadmapPhase {
  phase: string;
  description: string;
  steps: string[];
}

export interface StartupAnalysis {
  isStartupRelated: boolean;
  refusalMessage?: string;
  
  // The 'Answer All' field
  detailedResponse?: string; 

  problemAnalysis?: string;
  marketGap?: string;
  competitiveLandscape?: string;
  validationStatus?: ValidationStatus;
  reasoning?: string;
  targetAudience?: string[];
  improvements?: string[];
  
  swotAnalysis?: SWOT;
  elevatorPitch?: string;
  monetizationStrategies?: string[];
  mvpFeatures?: string[];
  techStack?: string[];
  
  legalCompliance?: {
    regulations: string[];
    governmentSchemes: string[];
    ipStrategy: string[];
  };
  executionRoadmap?: RoadmapPhase[];
  videoSearchQueries?: string[]; 
  suggestedQuestions?: string[];
}

export interface HistoryItem {
  id: string;
  idea: string;
  analysis: StartupAnalysis;
  timestamp: number;
}
