import React from 'react';
import { Star, MapPin, Clock, MessageCircle } from 'lucide-react';
import { User } from '../types';

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
    <div className="glass-card p-6 card-hover animate-fade-in">
      <div className="flex flex-col items-center text-center mb-4">
        <div className="relative mb-4">
          <img
            src={user.profilePhoto || 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400'}
            alt={user.name}
            className="w-20 h-20 rounded-full object-cover border-3 border-primary-400 shadow-lg"
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
        
        <h3 className="text-xl font-semibold text-white mb-1">{user.name}</h3>
        
        {user.location && (
          <div className="flex items-center text-gray-300 text-sm mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            {user.location}
          </div>
        )}
        
        <div className="flex items-center mb-2">
          {renderStars(user.rating)}
          <span className="ml-2 text-sm text-gray-300">({user.rating})</span>
        </div>
        
        <div className="flex items-center text-gray-300 text-sm">
          <Clock className="w-4 h-4 mr-1" />
          {user.availability}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-primary-300 mb-2">Skills Offered</h4>
          <div className="flex flex-wrap gap-2">
            {user.skillsOffered.map((skill, index) => (
              <span key={index} className="skill-tag skill-offered">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-secondary-300 mb-2">Skills Wanted</h4>
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
        className="w-full mt-6 btn-primary flex items-center justify-center gap-2"
      >
        <MessageCircle className="w-4 h-4" />
        Request Swap
      </button>
    </div>
  );
};