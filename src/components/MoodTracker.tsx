
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Smile, Frown, Meh, SmilePlus, Angry } from 'lucide-react';
import { toast } from "sonner";

const MoodTracker = () => {
  const { addMoodEntry } = useApp();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [note, setNote] = useState('');
  
  const moodIcons = [
    { value: 1, icon: <Angry className="w-8 h-8" />, label: 'Very Bad' },
    { value: 2, icon: <Frown className="w-8 h-8" />, label: 'Bad' },
    { value: 3, icon: <Meh className="w-8 h-8" />, label: 'Okay' },
    { value: 4, icon: <Smile className="w-8 h-8" />, label: 'Good' },
    { value: 5, icon: <SmilePlus className="w-8 h-8" />, label: 'Great' },
  ];
  
  const handleSubmit = () => {
    if (selectedMood === null) {
      toast.error("Please select your mood");
      return;
    }
    
    addMoodEntry(selectedMood, note);
    toast.success("Mood tracked successfully!");
    setSelectedMood(null);
    setNote('');
  };
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">How are you feeling today?</h2>
      
      <div className="flex justify-between mb-6">
        {moodIcons.map((mood) => (
          <button
            key={mood.value}
            onClick={() => setSelectedMood(mood.value)}
            className={`flex flex-col items-center p-3 rounded-lg transition-all ${
              selectedMood === mood.value 
                ? 'bg-theme-purple text-white scale-110' 
                : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
            }`}
          >
            {mood.icon}
            <span className="text-xs mt-1">{mood.label}</span>
          </button>
        ))}
      </div>
      
      <div className="mb-4">
        <Textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a note about how you're feeling... (optional)"
          className="resize-none"
          rows={3}
        />
      </div>
      
      <Button 
        onClick={handleSubmit}
        className="w-full bg-theme-purple hover:bg-theme-purple-dark"
      >
        Save Mood
      </Button>
    </div>
  );
};

export default MoodTracker;
