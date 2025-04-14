
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import ScenarioCard from '@/components/ScenarioCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const Scenarios = () => {
  const { scenarios, progress } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  
  const completedScenarios = scenarios.filter(
    scenario => progress.completedScenarios.includes(scenario.id)
  );
  
  const uncompletedScenarios = scenarios.filter(
    scenario => !progress.completedScenarios.includes(scenario.id)
  );
  
  const filterScenarios = (scenariosToFilter: typeof scenarios) => {
    if (!searchQuery.trim()) return scenariosToFilter;
    
    const query = searchQuery.toLowerCase();
    return scenariosToFilter.filter(scenario => 
      scenario.title.toLowerCase().includes(query) ||
      scenario.description.toLowerCase().includes(query) ||
      scenario.technique.toLowerCase().includes(query)
    );
  };
  
  const filteredAll = filterScenarios(scenarios);
  const filteredCompleted = filterScenarios(completedScenarios);
  const filteredUncompleted = filterScenarios(uncompletedScenarios);
  
  return (
    <div className="pb-20 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mt-4 mb-6 text-gray-800">CBT Scenarios</h1>
      
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          placeholder="Search scenarios..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <Tabs defaultValue="all">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="all" className="flex-1">All ({filteredAll.length})</TabsTrigger>
          <TabsTrigger value="in-progress" className="flex-1">In Progress ({filteredUncompleted.length})</TabsTrigger>
          <TabsTrigger value="completed" className="flex-1">Completed ({filteredCompleted.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <div className="grid gap-4">
            {filteredAll.length > 0 ? (
              filteredAll.map(scenario => (
                <ScenarioCard key={scenario.id} scenario={scenario} />
              ))
            ) : (
              <p className="text-center py-8 text-gray-500">No scenarios match your search</p>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="in-progress" className="mt-0">
          <div className="grid gap-4">
            {filteredUncompleted.length > 0 ? (
              filteredUncompleted.map(scenario => (
                <ScenarioCard key={scenario.id} scenario={scenario} />
              ))
            ) : (
              <p className="text-center py-8 text-gray-500">
                {searchQuery ? 'No scenarios match your search' : 'All scenarios completed!'}
              </p>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="completed" className="mt-0">
          <div className="grid gap-4">
            {filteredCompleted.length > 0 ? (
              filteredCompleted.map(scenario => (
                <ScenarioCard key={scenario.id} scenario={scenario} />
              ))
            ) : (
              <p className="text-center py-8 text-gray-500">
                {searchQuery ? 'No scenarios match your search' : 'You haven\'t completed any scenarios yet'}
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Scenarios;
