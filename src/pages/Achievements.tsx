
import React from 'react';
import { useApp } from '@/context/AppContext';
import AchievementItem from '@/components/AchievementItem';

const Achievements = () => {
  const { progress } = useApp();
  const { achievements } = progress;
  
  const unlockedAchievements = achievements.filter(a => a.isUnlocked);
  const lockedAchievements = achievements.filter(a => !a.isUnlocked);
  
  return (
    <div className="pb-20 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mt-4 mb-6 text-gray-800">Achievements</h1>
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3 text-gray-700">
          Unlocked ({unlockedAchievements.length}/{achievements.length})
        </h2>
        
        {unlockedAchievements.length > 0 ? (
          <div className="grid gap-3">
            {unlockedAchievements.map(achievement => (
              <AchievementItem key={achievement.id} achievement={achievement} />
            ))}
          </div>
        ) : (
          <p className="text-center py-8 bg-gray-50 rounded-lg text-gray-500">
            Complete challenges to unlock achievements
          </p>
        )}
      </div>
      
      <div>
        <h2 className="text-lg font-semibold mb-3 text-gray-700">Locked</h2>
        
        <div className="grid gap-3">
          {lockedAchievements.map(achievement => (
            <AchievementItem key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;
