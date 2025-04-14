
export interface Character {
  name: string;
  level: number;
  exp: number;
  expToNextLevel: number;
  avatar: string;
}

export interface MoodEntry {
  id: string;
  mood: number; // 1-5 scale
  note: string;
  timestamp: Date;
}

export type CbtTechnique = 
  | "cognitive-restructuring" 
  | "behavioral-activation" 
  | "mindfulness"
  | "exposure"
  | "problem-solving";

export interface CbtScenario {
  id: string;
  title: string;
  description: string;
  situation: string;
  options: ScenarioOption[];
  technique: CbtTechnique;
  difficulty: "easy" | "medium" | "hard";
  imageUrl?: string;
}

export interface ScenarioOption {
  id: string;
  text: string;
  isHealthy: boolean;
  explanation: string;
  rewardPoints: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  progress?: number;
  goal?: number;
}

export interface UserProgress {
  completedScenarios: string[];
  currentStreak: number;
  longestStreak: number;
  lastActiveDate?: Date;
  achievements: Achievement[];
  moodEntries: MoodEntry[];
}
