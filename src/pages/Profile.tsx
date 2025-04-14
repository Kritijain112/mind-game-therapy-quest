
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Award, Calendar, Target, RefreshCw } from 'lucide-react';
import { toast } from "sonner";

const Profile = () => {
  const { character, updateCharacter, progress } = useApp();
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState(character.name);
  
  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newName.trim().length === 0) {
      toast.error("Name cannot be empty");
      return;
    }
    
    updateCharacter({ name: newName.trim() });
    setEditingName(false);
    toast.success("Character name updated");
  };
  
  const resetProgress = () => {
    if (confirm("Are you sure you want to reset all progress? This cannot be undone.")) {
      localStorage.clear();
      window.location.reload();
    }
  };
  
  return (
    <div className="pb-20 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mt-4 mb-6 text-gray-800">Your Profile</h1>
      
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 border-2 border-theme-purple">
              <AvatarFallback className="bg-theme-purple-light text-theme-purple-dark text-xl">
                {character.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            <div>
              {editingName ? (
                <form onSubmit={handleNameSubmit} className="flex gap-2">
                  <Input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="max-w-[200px]"
                    autoFocus
                  />
                  <Button type="submit" size="sm">Save</Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      setEditingName(false);
                      setNewName(character.name);
                    }}
                  >
                    Cancel
                  </Button>
                </form>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold">{character.name}</h2>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setEditingName(true)}
                      className="h-7 p-0 px-2"
                    >
                      Edit
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground">Level {character.level} CBT Practitioner</div>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 flex flex-col items-center">
            <Award className="h-6 w-6 text-theme-purple mb-1" />
            <div className="text-2xl font-bold">{progress.achievements.filter(a => a.isUnlocked).length}</div>
            <div className="text-sm text-gray-500">Achievements</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex flex-col items-center">
            <Target className="h-6 w-6 text-theme-purple mb-1" />
            <div className="text-2xl font-bold">{progress.completedScenarios.length}</div>
            <div className="text-sm text-gray-500">Scenarios Completed</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex flex-col items-center">
            <Calendar className="h-6 w-6 text-theme-purple mb-1" />
            <div className="text-2xl font-bold">{progress.currentStreak}</div>
            <div className="text-sm text-gray-500">Current Streak</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex flex-col items-center">
            <Calendar className="h-6 w-6 text-theme-purple mb-1" />
            <div className="text-2xl font-bold">{progress.longestStreak}</div>
            <div className="text-sm text-gray-500">Longest Streak</div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="font-bold flex items-center gap-2 mb-4">
            <RefreshCw className="h-5 w-5" />
            Reset Progress
          </h3>
          
          <p className="text-gray-600 text-sm mb-4">
            This will reset all your progress, including achievements, completed scenarios, and character level.
            This action cannot be undone.
          </p>
          
          <Button variant="destructive" onClick={resetProgress}>
            Reset All Progress
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
