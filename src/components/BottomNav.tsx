
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Award, BookOpen, BarChart, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const BottomNav = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: <Home size={24} />, label: 'Home' },
    { path: '/scenarios', icon: <BookOpen size={24} />, label: 'Scenarios' },
    { path: '/achievements', icon: <Award size={24} />, label: 'Achievements' },
    { path: '/mood', icon: <BarChart size={24} />, label: 'Mood' },
    { path: '/profile', icon: <User size={24} />, label: 'Profile' },
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10 px-2 py-1">
      <nav className="flex justify-between">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center px-3 py-2 text-xs rounded-lg transition-colors",
              location.pathname === item.path
                ? "text-theme-purple bg-theme-purple-light"
                : "text-gray-500 hover:bg-gray-100"
            )}
          >
            {item.icon}
            <span className="mt-1">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default BottomNav;
