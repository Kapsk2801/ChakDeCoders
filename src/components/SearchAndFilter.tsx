import React from 'react';
import { Search, Filter, Sparkles } from 'lucide-react';
import type { SearchFilters } from '../types';

interface SearchAndFilterProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  filters,
  onFiltersChange,
}) => {
  const availabilityOptions = ['All', 'Weekends', 'Evenings', 'Weekdays', 'Flexible'];

  return (
    <div className="glass-card p-8 mb-12 animate-slide-up glow-effect">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Search by skills (e.g., React, Python, Design...)"
            value={filters.searchTerm}
            onChange={(e) =>
              onFiltersChange({ ...filters, searchTerm: e.target.value })
            }
            className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 focus:bg-white/10 transition-all duration-300 text-lg backdrop-blur-sm"
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <Sparkles className="w-5 h-5 text-pink-400 animate-pulse-soft" />
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-400">
            <Filter className="w-5 h-5" />
          </div>
          <select
            value={filters.availability}
            onChange={(e) =>
              onFiltersChange({ ...filters, availability: e.target.value })
            }
            className="pl-12 pr-10 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-400 focus:bg-white/10 transition-all duration-300 appearance-none cursor-pointer min-w-[220px] text-lg backdrop-blur-sm font-medium"
          >
            {availabilityOptions.map((option) => (
              <option key={option} value={option} className="bg-slate-800 text-white font-medium">
                {option === 'All' ? 'All Availability' : option}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};