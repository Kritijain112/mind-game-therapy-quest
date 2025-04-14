
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CbtScenario } from '@/types/cbt';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { CheckCircle2 } from 'lucide-react';

interface ScenarioCardProps {
  scenario: CbtScenario;
}

const techniqueLabels: Record<string, string> = {
  'cognitive-restructuring': 'Thought Challenge',
  'behavioral-activation': 'Behavior Change',
  'mindfulness': 'Mindfulness',
  'exposure': 'Exposure',
  'problem-solving': 'Problem Solving'
};

const difficultyColors: Record<string, string> = {
  'easy': 'bg-green-100 text-green-800',
  'medium': 'bg-yellow-100 text-yellow-800',
  'hard': 'bg-red-100 text-red-800'
};

const ScenarioCard: React.FC<ScenarioCardProps> = ({ scenario }) => {
  const navigate = useNavigate();
  const { progress } = useApp();
  const isCompleted = progress.completedScenarios.includes(scenario.id);
  
  return (
    <Card className={`${isCompleted ? 'border-theme-purple bg-theme-purple-light/30' : ''} overflow-hidden`}>
      <div className="relative h-32 bg-theme-blue">
        {scenario.imageUrl && (
          <img
            src={scenario.imageUrl}
            alt={scenario.title}
            className="w-full h-full object-cover"
          />
        )}
        
        {isCompleted && (
          <div className="absolute top-2 right-2">
            <CheckCircle2 className="h-6 w-6 text-theme-purple bg-white rounded-full" />
          </div>
        )}
      </div>
      
      <CardContent className="pt-6">
        <div className="flex gap-2 mb-2">
          <Badge variant="outline" className="bg-theme-purple-light text-theme-purple border-0">
            {techniqueLabels[scenario.technique]}
          </Badge>
          <Badge variant="outline" className={difficultyColors[scenario.difficulty]}>
            {scenario.difficulty.charAt(0).toUpperCase() + scenario.difficulty.slice(1)}
          </Badge>
        </div>
        
        <h3 className="font-bold text-lg mb-1">{scenario.title}</h3>
        <p className="text-gray-600 text-sm">{scenario.description}</p>
      </CardContent>
      
      <CardFooter>
        <Button 
          variant="outline" 
          className={`w-full ${
            isCompleted 
              ? 'border-theme-purple text-theme-purple hover:bg-theme-purple-light' 
              : ''
          }`}
          onClick={() => navigate(`/scenario/${scenario.id}`)}
        >
          {isCompleted ? 'Review Scenario' : 'Start Scenario'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ScenarioCard;
