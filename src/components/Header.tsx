import React from 'react';
import { Users, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-secondary-600/20 backdrop-blur-sm"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full blur-lg opacity-30 animate-pulse-soft"></div>
              <div className="relative bg-gradient-to-r from-primary-500 to-secondary-500 p-4 rounded-full">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent mb-4">
            SkillKarma
          </h1>
          
          <p className="text-xl text-gray-300 mb-2 max-w-2xl mx-auto">
            Exchange skills, grow together, build karma
          </p>
          
          <div className="flex items-center justify-center text-gray-400 text-sm">
            <Users className="w-4 h-4 mr-2" />
            <span>Connect with skilled professionals worldwide</span>
          </div>
        </div>
      </div>
    </header>
  );
};