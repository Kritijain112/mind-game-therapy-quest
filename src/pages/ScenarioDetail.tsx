
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { toast } from "sonner";
import { cn } from '@/lib/utils';

const techniqueLabels: Record<string, string> = {
  'cognitive-restructuring': 'Thought Challenge',
  'behavioral-activation': 'Behavior Change',
  'mindfulness': 'Mindfulness',
  'exposure': 'Exposure',
  'problem-solving': 'Problem Solving'
};

const ScenarioDetail = () => {
  const { scenarioId } = useParams<{ scenarioId: string }>();
  const { scenarios, completeScenario, progress } = useApp();
  const navigate = useNavigate();
  
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  
  const scenario = scenarios.find(s => s.id === scenarioId);
  
  if (!scenario) {
    return (
      <div className="p-4 max-w-lg mx-auto text-center">
        <h1 className="text-2xl font-bold mb-4">Scenario Not Found</h1>
        <Button onClick={() => navigate('/scenarios')}>
          Back to Scenarios
        </Button>
      </div>
    );
  }
  
  const isCompleted = progress.completedScenarios.includes(scenarioId);
  const selectedOption = scenario.options.find(o => o.id === selectedOptionId);
  
  const handleOptionSelect = (optionId: string) => {
    setSelectedOptionId(optionId);
    setShowFeedback(true);
    
    if (!isCompleted) {
      completeScenario(scenarioId, optionId);
      
      const option = scenario.options.find(o => o.id === optionId);
      if (option?.isHealthy) {
        toast.success(`+${option.rewardPoints} XP gained!`);
      }
    }
  };
  
  const handleBackClick = () => {
    navigate(-1);
  };
  
  const handleContinue = () => {
    navigate('/scenarios');
  };
  
  return (
    <div className="pb-20 max-w-lg mx-auto">
      <div className="flex items-center mb-6 mt-4">
        <Button variant="ghost" size="icon" onClick={handleBackClick} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold text-gray-800">{scenario.title}</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex gap-2 mb-4">
          <Badge variant="outline" className="bg-theme-purple-light text-theme-purple border-0">
            {techniqueLabels[scenario.technique]}
          </Badge>
        </div>
        
        <p className="mb-6 text-gray-700">{scenario.situation}</p>
        
        <h2 className="font-bold mb-4 text-gray-800">
          {showFeedback ? "Your Response" : "How would you respond?"}
        </h2>
        
        <div className="grid gap-3">
          {scenario.options.map((option) => (
            <Button
              key={option.id}
              variant="outline"
              className={cn(
                "justify-start h-auto p-4 font-normal text-left",
                selectedOptionId === option.id && "border-2 border-theme-purple",
                showFeedback && option.isHealthy && "border-2 border-green-500",
                showFeedback && !option.isHealthy && "border-2 border-red-500"
              )}
              onClick={() => !showFeedback && handleOptionSelect(option.id)}
              disabled={showFeedback && selectedOptionId !== option.id}
            >
              {option.text}
            </Button>
          ))}
        </div>
      </div>
      
      {showFeedback && selectedOption && (
        <div className="mb-6">
          <Alert className={cn(
            selectedOption.isHealthy ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"
          )}>
            <div className="flex items-center gap-2">
              {selectedOption.isHealthy ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              <AlertTitle className={selectedOption.isHealthy ? "text-green-700" : "text-red-700"}>
                {selectedOption.isHealthy ? "Healthy Response" : "Unhealthy Response"}
              </AlertTitle>
            </div>
            <AlertDescription className="mt-2 text-gray-700">
              {selectedOption.explanation}
            </AlertDescription>
          </Alert>
        </div>
      )}
      
      {showFeedback && (
        <div className="flex justify-end">
          <Button onClick={handleContinue}>
            Continue
          </Button>
        </div>
      )}
    </div>
  );
};

export default ScenarioDetail;
