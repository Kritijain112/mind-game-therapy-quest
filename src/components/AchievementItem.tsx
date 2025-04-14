
import React from 'react';
import { Achievement } from '@/types/cbt';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Award, Brain, Flame, Trophy, Heart, Leaf, CircuitBoard } from 'lucide-react';

interface AchievementItemProps {
  achievement: Achievement;
}

const AchievementItem: React.FC<AchievementItemProps> = ({ achievement }) => {
  const renderIcon = () => {
    switch (achievement.icon) {
      case 'award':
        return <Award className="h-6 w-6" />;
      case 'brain':
        return <Brain className="h-6 w-6" />;
      case 'flame':
        return <Flame className="h-6 w-6" />;
      case 'trophy':
        return <Trophy className="h-6 w-6" />;
      case 'heart':
        return <Heart className="h-6 w-6" />;
      case 'leaf':
        return <Leaf className="h-6 w-6" />;
      case 'brain-circuit':
        return <CircuitBoard className="h-6 w-6" />;
      default:
        return <Award className="h-6 w-6" />;
    }
  };

  const progressPercentage = achievement.goal
    ? Math.round((achievement.progress || 0) / achievement.goal * 100)
    : 100;

  return (
    <Card className={`transition-all ${
      achievement.isUnlocked 
        ? 'border-theme-purple bg-theme-purple-light/30' 
        : 'opacity-80'
    }`}>
      <CardContent className="p-4 flex items-center gap-4">
        <div className={`p-3 rounded-full ${
          achievement.isUnlocked 
            ? 'bg-theme-purple text-white' 
            : 'bg-gray-200 text-gray-500'
        }`}>
          {renderIcon()}
        </div>
        
        <div className="flex-1">
          <h3 className="font-bold">{achievement.title}</h3>
          <p className="text-sm text-gray-600 mb-1">{achievement.description}</p>
          
          {achievement.goal && (
            <div className="flex items-center gap-2">
              <Progress value={progressPercentage} className="h-2 flex-1" />
              <span className="text-xs text-gray-500">
                {achievement.progress || 0}/{achievement.goal}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementItem;
