
import React, { createContext, useState, useContext, useEffect } from "react";
import { 
  Character, 
  CbtScenario, 
  UserProgress, 
  Achievement, 
  MoodEntry 
} from "@/types/cbt";
import { generateMockScenarios } from "@/data/scenarios";
import { generateMockAchievements } from "@/data/achievements";

interface AppContextType {
  character: Character;
  updateCharacter: (updates: Partial<Character>) => void;
  scenarios: CbtScenario[];
  progress: UserProgress;
  addMoodEntry: (mood: number, note: string) => void;
  completeScenario: (scenarioId: string, optionId: string) => void;
  unlockAchievement: (achievementId: string) => void;
  updateAchievementProgress: (achievementId: string, progress: number) => void;
}

const defaultCharacter: Character = {
  name: "Mindful Explorer",
  level: 1,
  exp: 0,
  expToNextLevel: 100,
  avatar: "default",
};

const defaultProgress: UserProgress = {
  completedScenarios: [],
  currentStreak: 0,
  longestStreak: 0,
  achievements: [],
  moodEntries: [],
};

const AppContext = createContext<AppContextType>({
  character: defaultCharacter,
  updateCharacter: () => {},
  scenarios: [],
  progress: defaultProgress,
  addMoodEntry: () => {},
  completeScenario: () => {},
  unlockAchievement: () => {},
  updateAchievementProgress: () => {},
});

export const useApp = () => useContext(AppContext);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [character, setCharacter] = useState<Character>(() => {
    const saved = localStorage.getItem("character");
    return saved ? JSON.parse(saved) : defaultCharacter;
  });
  
  const [scenarios, setScenarios] = useState<CbtScenario[]>(generateMockScenarios());
  
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem("progress");
    if (saved) {
      const parsed = JSON.parse(saved);
      // Convert string timestamps back to Date objects
      if (parsed.moodEntries) {
        parsed.moodEntries = parsed.moodEntries.map((entry: any) => ({
          ...entry,
          timestamp: new Date(entry.timestamp),
        }));
      }
      if (parsed.lastActiveDate) {
        parsed.lastActiveDate = new Date(parsed.lastActiveDate);
      }
      return parsed;
    }
    return {
      ...defaultProgress,
      achievements: generateMockAchievements(),
    };
  });

  useEffect(() => {
    console.log("Character updated:", character);
    localStorage.setItem("character", JSON.stringify(character));
  }, [character]);

  useEffect(() => {
    console.log("Progress updated:", progress);
    localStorage.setItem("progress", JSON.stringify(progress));
  }, [progress]);

  const updateCharacter = (updates: Partial<Character>) => {
    setCharacter(prev => {
      const updated = { ...prev, ...updates };
      
      // Handle level up if exp exceeds threshold
      if (updated.exp >= updated.expToNextLevel) {
        updated.level += 1;
        updated.exp = updated.exp - updated.expToNextLevel;
        updated.expToNextLevel = Math.round(updated.expToNextLevel * 1.5);
        console.log(`Level up! New level: ${updated.level}`);
      }
      
      return updated;
    });
  };
  
  const addMoodEntry = (mood: number, note: string) => {
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      mood,
      note,
      timestamp: new Date(),
    };
    
    setProgress(prev => {
      // Check if this is a new day and update streak
      const today = new Date().toDateString();
      const lastActiveDay = prev.lastActiveDate?.toDateString() || "";
      
      let updatedStreak = prev.currentStreak;
      let updatedLongestStreak = prev.longestStreak;
      
      // Log streak information to help with debugging
      console.log("Streak info - Current:", prev.currentStreak, "Longest:", prev.longestStreak);
      console.log("Date info - Today:", today, "Last active:", lastActiveDay);
      
      if (today !== lastActiveDay) {
        const isConsecutiveDay = new Date(lastActiveDay).getTime() + 86400000 >= new Date(today).getTime();
        
        updatedStreak = isConsecutiveDay ? prev.currentStreak + 1 : 1;
        updatedLongestStreak = Math.max(prev.longestStreak, updatedStreak);
        
        console.log(`Streak updated. New streak: ${updatedStreak}, Longest: ${updatedLongestStreak}`);
      }
      
      return {
        ...prev,
        moodEntries: [newEntry, ...prev.moodEntries],
        lastActiveDate: new Date(),
        currentStreak: updatedStreak,
        longestStreak: updatedLongestStreak
      };
    });
  };
  
  const completeScenario = (scenarioId: string, optionId: string) => {
    // Find the scenario and selected option
    const scenario = scenarios.find(s => s.id === scenarioId);
    if (!scenario) {
      console.error("Scenario not found:", scenarioId);
      return;
    }
    
    const selectedOption = scenario.options.find(o => o.id === optionId);
    if (!selectedOption) {
      console.error("Option not found:", optionId);
      return;
    }
    
    console.log(`Completing scenario: ${scenario.title} with option: ${selectedOption.text}`);
    
    // Award experience points
    updateCharacter({
      exp: character.exp + selectedOption.rewardPoints
    });
    
    // Update completed scenarios list
    if (!progress.completedScenarios.includes(scenarioId)) {
      setProgress(prev => ({
        ...prev,
        completedScenarios: [...prev.completedScenarios, scenarioId]
      }));
    }
    
    // Check for achievements (completing scenarios, using specific techniques)
    const scenarioCompletionAchievement = progress.achievements.find(
      a => a.id === "complete-scenarios"
    );
    
    if (scenarioCompletionAchievement) {
      updateAchievementProgress(
        "complete-scenarios", 
        progress.completedScenarios.length + 1
      );
    }
    
    const techniqueAchievement = progress.achievements.find(
      a => a.id === `master-${scenario.technique}`
    );
    
    if (techniqueAchievement) {
      updateAchievementProgress(
        `master-${scenario.technique}`, 
        (techniqueAchievement.progress || 0) + 1
      );
    }
  };
  
  const unlockAchievement = (achievementId: string) => {
    console.log("Unlocking achievement:", achievementId);
    
    setProgress(prev => ({
      ...prev,
      achievements: prev.achievements.map(a => 
        a.id === achievementId 
          ? { ...a, isUnlocked: true } 
          : a
      )
    }));
  };
  
  const updateAchievementProgress = (achievementId: string, progress: number) => {
    console.log(`Updating achievement ${achievementId} progress to ${progress}`);
    
    setProgress(prev => {
      const updatedAchievements = prev.achievements.map(a => {
        if (a.id === achievementId) {
          const updated = { ...a, progress };
          // Check if achievement should be unlocked
          if (a.goal && progress >= a.goal && !a.isUnlocked) {
            console.log(`Achievement "${a.title}" unlocked!`);
            updated.isUnlocked = true;
          }
          return updated;
        }
        return a;
      });
      
      return {
        ...prev,
        achievements: updatedAchievements
      };
    });
  };

  const value = {
    character,
    updateCharacter,
    scenarios,
    progress,
    addMoodEntry,
    completeScenario,
    unlockAchievement,
    updateAchievementProgress,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
