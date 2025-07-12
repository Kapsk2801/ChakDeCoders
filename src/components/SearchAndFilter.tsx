import React from 'react';
import { Search, Filter } from 'lucide-react';
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
    <div className="glass-card p-6 mb-8 animate-slide-up">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by skills (e.g., React, Python, Design...)"
            value={filters.searchTerm}
            onChange={(e) =>
              onFiltersChange({ ...filters, searchTerm: e.target.value })
            }
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
          />
        </div>
        
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={filters.availability}
            onChange={(e) =>
              onFiltersChange({ ...filters, availability: e.target.value })
            }
            className="pl-10 pr-8 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer min-w-[200px]"
          >
            {availabilityOptions.map((option) => (
              <option key={option} value={option} className="bg-dark-800 text-white">
                {option === 'All' ? 'All Availability' : option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};