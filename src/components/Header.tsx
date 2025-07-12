import React from 'react';
import { Users, Sparkles, Zap, Heart } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="relative overflow-hidden min-h-[60vh] flex items-center">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse-soft"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-40 animate-glow"></div>
              <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-full shadow-2xl floating-element">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-emerald-400 bg-clip-text text-transparent mb-6 animate-fade-in">
            SkillKarma
          </h1>
          
          <p className="text-2xl text-gray-200 mb-6 max-w-3xl mx-auto font-light leading-relaxed">
            Exchange skills, grow together, build karma
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-8 text-gray-300 text-lg mb-8">
            <div className="flex items-center group">
              <Users className="w-6 h-6 mr-3 text-purple-400 group-hover:scale-110 transition-transform duration-200" />
              <span>Global Community</span>
            </div>
            <div className="flex items-center group">
              <Zap className="w-6 h-6 mr-3 text-emerald-400 group-hover:scale-110 transition-transform duration-200" />
              <span>Instant Matching</span>
            </div>
            <div className="flex items-center group">
              <Heart className="w-6 h-6 mr-3 text-pink-400 group-hover:scale-110 transition-transform duration-200" />
              <span>Karma System</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="btn-primary text-lg px-8 py-4 group">
              <span className="flex items-center">
                Start Swapping
                <Sparkles className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform duration-200" />
              </span>
            </button>
            <button className="btn-secondary text-lg px-8 py-4">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};