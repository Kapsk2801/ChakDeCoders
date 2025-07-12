import React from 'react';
import { Star, MapPin, Clock, MessageCircle, Award, TrendingUp } from 'lucide-react';
import type { User } from '../types';

interface UserCardProps {
  user: User;
  onRequestClick: (userId: string) => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onRequestClick }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? 'text-accent-400 fill-current'
            : index < rating
            ? 'text-accent-400 fill-current opacity-50'
            : 'text-gray-400'
        }`}
      />
    ));
  };

  return (
    <div className="glass-card p-6 card-hover animate-fade-in group glow-effect">
      <div className="flex flex-col items-center text-center mb-4">
        <div className="relative mb-4">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
          <img
            src={user.profilePhoto || 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400'}
            alt={user.name}
            className="relative w-24 h-24 rounded-full object-cover border-4 border-purple-400 shadow-2xl group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full border-3 border-white shadow-lg animate-pulse-soft">
            <div className="w-full h-full rounded-full bg-emerald-300 animate-ping opacity-75"></div>
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-200">{user.name}</h3>
        
        {user.location && (
          <div className="flex items-center text-gray-300 text-sm mb-3 group-hover:text-gray-200 transition-colors duration-200">
            <MapPin className="w-4 h-4 mr-2 text-purple-400" />
            {user.location}
          </div>
        )}
        
        <div className="flex items-center mb-3 bg-white/5 rounded-full px-3 py-1">
          {renderStars(user.rating)}
          <span className="ml-2 text-sm font-medium text-yellow-300">({user.rating})</span>
          <Award className="w-4 h-4 ml-2 text-yellow-400" />
        </div>
        
        <div className="flex items-center text-gray-300 text-sm bg-white/5 rounded-full px-3 py-1">
          <Clock className="w-4 h-4 mr-2 text-emerald-400" />
          <span className="font-medium">{user.availability}</span>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <div className="flex items-center mb-3">
            <TrendingUp className="w-4 h-4 mr-2 text-emerald-400" />
            <h4 className="text-sm font-semibold text-emerald-300">Skills Offered</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {user.skillsOffered.map((skill, index) => (
              <span key={index} className="skill-tag skill-offered">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center mb-3">
            <Star className="w-4 h-4 mr-2 text-purple-400" />
            <h4 className="text-sm font-semibold text-purple-300">Skills Wanted</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {user.skillsWanted.map((skill, index) => (
              <span key={index} className="skill-tag skill-wanted">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => onRequestClick(user.id)}
        className="w-full mt-6 btn-primary flex items-center justify-center gap-2 group/btn"
      >
        <MessageCircle className="w-5 h-5 group-hover/btn:scale-110 transition-transform duration-200" />
        Request Swap
      </button>
    </div>
  );
};