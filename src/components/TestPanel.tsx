
import React from 'react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from "sonner";

const TestPanel = () => {
  const { 
    character, 
    progress, 
    addMoodEntry, 
    updateCharacter, 
    completeScenario, 
    unlockAchievement 
  } = useApp();

  // Test functions
  const testAddMood = () => {
    const moods = [1, 2, 3, 4, 5];
    const randomMood = moods[Math.floor(Math.random() * moods.length)];
    addMoodEntry(randomMood, `Test mood entry ${new Date().toLocaleTimeString()}`);
    toast.success(`Test mood added: ${randomMood}`);
  };

  const testAddXP = () => {
    updateCharacter({ exp: character.exp + 50 });
    toast.success("Added 50 XP");
  };

  const testUnlockAchievement = () => {
    const lockedAchievements = progress.achievements.filter(a => !a.isUnlocked);
    if (lockedAchievements.length > 0) {
      const randomAchievement = lockedAchievements[Math.floor(Math.random() * lockedAchievements.length)];
      unlockAchievement(randomAchievement.id);
      toast.success(`Unlocked: ${randomAchievement.title}`);
    } else {
      toast.error("No locked achievements to unlock");
    }
  };

  const testLocalStorage = () => {
    try {
      const savedCharacter = localStorage.getItem("character");
      const savedProgress = localStorage.getItem("progress");
      
      console.log("Saved character:", savedCharacter ? JSON.parse(savedCharacter) : null);
      console.log("Saved progress:", savedProgress ? JSON.parse(savedProgress) : null);
      
      toast.success("Local storage data logged to console");
    } catch (error) {
      console.error("Local storage error:", error);
      toast.error("Error reading local storage");
    }
  };

  const clearLocalStorage = () => {
    try {
      localStorage.clear();
      toast.success("Local storage cleared. Reload the app to see the effect.");
    } catch (error) {
      console.error("Error clearing storage:", error);
      toast.error("Failed to clear local storage");
    }
  };

  return (
    <Card className="p-4 bg-gray-50 border-dashed">
      <h3 className="text-lg font-medium mb-3">Test Panel</h3>
      <div className="grid grid-cols-2 gap-2">
        <Button size="sm" variant="outline" onClick={testAddMood}>
          Test Add Mood
        </Button>
        <Button size="sm" variant="outline" onClick={testAddXP}>
          Test Add XP
        </Button>
        <Button size="sm" variant="outline" onClick={testUnlockAchievement}>
          Test Achievement
        </Button>
        <Button size="sm" variant="outline" onClick={testLocalStorage}>
          Check Storage
        </Button>
        <Button size="sm" variant="outline" onClick={clearLocalStorage} className="col-span-2 bg-red-50 hover:bg-red-100 text-red-600">
          Reset Storage
        </Button>
      </div>
    </Card>
  );
};

export default TestPanel;
