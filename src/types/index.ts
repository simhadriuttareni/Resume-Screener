export interface ResumeAnalysis {
  role: string;
  confidence: number;
  skills: string[];
  experience: string;
  education: string;
  topPredictions?: RolePrediction[];
  matchedKeywords?: number;
}

export interface RolePrediction {
  role: string;
  roleId: string;
  confidence: number;
  matchedKeywords: number;
  color: string;
  description: string;
}

export interface JobRole {
  id: string;
  name: string;
  color: string;
  description: string;
}