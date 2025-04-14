
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import BottomNav from "./components/BottomNav";

// Pages
import Home from "./pages/Home";
import Scenarios from "./pages/Scenarios";
import ScenarioDetail from "./pages/ScenarioDetail";
import Achievements from "./pages/Achievements";
import Mood from "./pages/Mood";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="px-4 min-h-screen pb-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/scenarios" element={<Scenarios />} />
              <Route path="/scenario/:scenarioId" element={<ScenarioDetail />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/mood" element={<Mood />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <BottomNav />
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
