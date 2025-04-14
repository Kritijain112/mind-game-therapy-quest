
import { Achievement } from "@/types/cbt";

export const generateMockAchievements = (): Achievement[] => {
  return [
    {
      id: "first-scenario",
      title: "First Steps",
      description: "Complete your first CBT scenario",
      icon: "award",
      isUnlocked: false,
      progress: 0,
      goal: 1
    },
    {
      id: "complete-scenarios",
      title: "Growth Mindset",
      description: "Complete 10 CBT scenarios",
      icon: "brain",
      isUnlocked: false,
      progress: 0,
      goal: 10
    },
    {
      id: "daily-streak-3",
      title: "Habit Builder",
      description: "Use the app for 3 consecutive days",
      icon: "flame",
      isUnlocked: false,
      progress: 0,
      goal: 3
    },
    {
      id: "daily-streak-7",
      title: "Weekly Warrior",
      description: "Use the app for 7 consecutive days",
      icon: "trophy",
      isUnlocked: false,
      progress: 0,
      goal: 7
    },
    {
      id: "master-cognitive-restructuring",
      title: "Thought Champion",
      description: "Complete 5 cognitive restructuring exercises",
      icon: "brain-circuit",
      isUnlocked: false,
      progress: 0,
      goal: 5
    },
    {
      id: "master-mindfulness",
      title: "Mindfulness Master",
      description: "Complete 5 mindfulness exercises",
      icon: "leaf",
      isUnlocked: false,
      progress: 0,
      goal: 5
    },
    {
      id: "mood-tracker",
      title: "Self-Awareness",
      description: "Track your mood for 5 days",
      icon: "heart",
      isUnlocked: false,
      progress: 0,
      goal: 5
    }
  ];
};
