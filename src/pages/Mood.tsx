
import React from 'react';
import { useApp } from '@/context/AppContext';
import MoodTracker from '@/components/MoodTracker';
import { Card, CardContent } from '@/components/ui/card';
import { Smile, Frown, Meh, SmilePlus, FrownOpen } from 'lucide-react';
import { format } from 'date-fns';

const MoodPage = () => {
  const { progress } = useApp();
  const { moodEntries } = progress;
  
  const renderMoodIcon = (mood: number) => {
    switch (mood) {
      case 1:
        return <FrownOpen className="h-6 w-6 text-red-500" />;
      case 2:
        return <Frown className="h-6 w-6 text-orange-500" />;
      case 3:
        return <Meh className="h-6 w-6 text-yellow-500" />;
      case 4:
        return <Smile className="h-6 w-6 text-green-500" />;
      case 5:
        return <SmilePlus className="h-6 w-6 text-emerald-500" />;
      default:
        return <Meh className="h-6 w-6 text-gray-500" />;
    }
  };
  
  const getMoodLabel = (mood: number) => {
    switch (mood) {
      case 1: return 'Very Bad';
      case 2: return 'Bad';
      case 3: return 'Okay';
      case 4: return 'Good';
      case 5: return 'Great';
      default: return 'Unknown';
    }
  };
  
  const getDateLabel = (date: Date) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return format(date, 'MMMM d, yyyy');
    }
  };
  
  return (
    <div className="pb-20 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mt-4 mb-6 text-gray-800">Mood Tracker</h1>
      
      <div className="mb-6">
        <MoodTracker />
      </div>
      
      <h2 className="text-lg font-semibold mb-3 text-gray-700">Your Mood History</h2>
      
      {moodEntries.length > 0 ? (
        <div className="grid gap-3">
          {moodEntries.map((entry) => (
            <Card key={entry.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {renderMoodIcon(entry.mood)}
                      <span className="font-medium">{getMoodLabel(entry.mood)}</span>
                    </div>
                    
                    <p className="text-sm text-gray-500 mb-2">
                      {getDateLabel(entry.timestamp)} - {format(entry.timestamp, 'h:mm a')}
                    </p>
                    
                    {entry.note && (
                      <p className="text-gray-700 bg-gray-50 p-2 rounded-md mt-2">{entry.note}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center py-8 bg-gray-50 rounded-lg text-gray-500">
          No mood entries yet. Track your first mood above!
        </p>
      )}
    </div>
  );
};

export default MoodPage;
