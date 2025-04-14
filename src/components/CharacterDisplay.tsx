
import React from 'react';
import { useApp } from '@/context/AppContext';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CharacterDisplay = () => {
  const { character } = useApp();
  
  // Calculate progress percentage for level
  const progressPercentage = Math.round((character.exp / character.expToNextLevel) * 100);
  
  return (
    <div className="bg-white rounded-xl p-4 shadow-md text-center animate-float">
      <div className="mb-2">
        <Avatar className="w-24 h-24 mx-auto border-4 border-theme-purple">
          <AvatarFallback className="bg-theme-purple-light text-theme-purple-dark text-4xl">
            {character.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </div>
      
      <h2 className="text-xl font-bold text-gray-800 mb-1">{character.name}</h2>
      
      <div className="bg-theme-purple-light rounded-full px-3 py-1 text-sm font-semibold text-theme-purple-dark inline-block mb-3">
        Level {character.level}
      </div>
      
      <div className="text-sm text-gray-600 mb-2">
        {character.exp} / {character.expToNextLevel} XP
      </div>
      
      <Progress className="h-2 bg-gray-100" value={progressPercentage} />
    </div>
  );
};

export default CharacterDisplay;
