
import React from 'react';
import { useApp } from '@/context/AppContext';
import CharacterDisplay from '@/components/CharacterDisplay';
import ScenarioCard from '@/components/ScenarioCard';
import MoodTracker from '@/components/MoodTracker';
import TestPanel from '@/components/TestPanel';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { BookOpen, BarChart4, Award } from 'lucide-react';

const Home = () => {
  const { scenarios, progress } = useApp();
  const navigate = useNavigate();
  
  // Get uncompleted scenarios first, then limit to 2
  const upcomingScenarios = scenarios
    .filter(scenario => !progress.completedScenarios.includes(scenario.id))
    .slice(0, 2);
  
  // If there aren't enough uncompleted scenarios, add completed ones
  if (upcomingScenarios.length < 2) {
    const completedScenarios = scenarios
      .filter(scenario => progress.completedScenarios.includes(scenario.id))
      .slice(0, 2 - upcomingScenarios.length);
    
    upcomingScenarios.push(...completedScenarios);
  }
  
  // Get recently unlocked achievements
  const recentAchievements = progress.achievements
    .filter(a => a.isUnlocked)
    .slice(0, 3);
  
  return (
    <div className="pb-20 max-w-lg mx-auto">
      <div className="mb-6 pt-4">
        <CharacterDisplay />
      </div>
      
      {/* Test Panel - Remove this before publishing */}
      <div className="mb-6">
        <TestPanel />
      </div>
      
      <section className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold text-gray-800">Continue Learning</h2>
          <Button variant="ghost" size="sm" onClick={() => navigate('/scenarios')}>
            View all
          </Button>
        </div>
        
        {upcomingScenarios.length > 0 ? (
          <div className="grid gap-4">
            {upcomingScenarios.map(scenario => (
              <ScenarioCard key={scenario.id} scenario={scenario} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-2" />
            <p className="text-gray-500">All scenarios completed!</p>
            <Button className="mt-4" onClick={() => navigate('/scenarios')}>
              Review Scenarios
            </Button>
          </div>
        )}
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-3 text-gray-800">Track Your Mood</h2>
        <MoodTracker />
      </section>
      
      <section className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold text-gray-800">Your Achievements</h2>
          <Button variant="ghost" size="sm" onClick={() => navigate('/achievements')}>
            View all
          </Button>
        </div>
        
        {recentAchievements.length > 0 ? (
          <div className="bg-white p-4 rounded-lg shadow-sm">
            {recentAchievements.map(achievement => (
              <div key={achievement.id} className="flex items-center py-2">
                <div className="bg-theme-purple-light p-2 rounded-full mr-3">
                  <Award className="h-5 w-5 text-theme-purple" />
                </div>
                <div>
                  <h3 className="font-medium">{achievement.title}</h3>
                  <p className="text-xs text-gray-500">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <Award className="mx-auto h-12 w-12 text-gray-400 mb-2" />
            <p className="text-gray-500">Complete scenarios to earn achievements!</p>
            <Button className="mt-4" onClick={() => navigate('/scenarios')}>
              Start Scenarios
            </Button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
