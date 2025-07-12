import { Star, User, MapPin, Clock, MessageCircle, Heart, Share2 } from 'lucide-react';
import { useState } from 'react';

const UserCard = ({ user, onRequestClick, isLoggedIn }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleRequestClick = () => {
    onRequestClick(user, isLoggedIn);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    // Share functionality would go here
    console.log('Share user profile');
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="w-3 h-3 fill-yellow-400/50 text-yellow-400" />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-3 h-3 text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <div 
      className={`relative group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient Header */}
      <div className="relative h-24 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={handleLike}
            className={`p-2 rounded-full transition-all duration-200 ${
              isLiked 
                ? 'bg-red-500 text-white shadow-lg' 
                : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm transition-all duration-200"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Profile Section */}
      <div className="relative px-6 pb-6">
        {/* Profile Photo */}
        <div className="relative -mt-12 mb-4">
          <div className="relative">
            {user.profilePhoto ? (
              <img
                src={user.profilePhoto}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-4 border-white shadow-lg flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
            )}
            {/* Online Status */}
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-3 border-white shadow-sm"></div>
          </div>
        </div>

        {/* User Info */}
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-1">{user.name}</h3>
          
          {/* Rating */}
          <div className="flex items-center justify-center gap-1 mb-2">
            {renderStars(user.rating)}
            <span className="text-sm text-gray-600 ml-1">({user.rating})</span>
          </div>

          {/* Location & Availability */}
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{user.location || 'Location'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{user.availability}</span>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="space-y-4">
          {/* Skills Offered */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Skills Offered
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {user.skillsOffered.slice(0, 4).map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 text-xs rounded-full font-medium border border-green-200 hover:from-green-200 hover:to-emerald-200 transition-all duration-200"
                >
                  {skill}
                </span>
              ))}
              {user.skillsOffered.length > 4 && (
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                  +{user.skillsOffered.length - 4} more
                </span>
              )}
            </div>
          </div>

          {/* Skills Wanted */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Skills Wanted
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {user.skillsWanted.slice(0, 4).map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 text-xs rounded-full font-medium border border-blue-200 hover:from-blue-200 hover:to-indigo-200 transition-all duration-200"
                >
                  {skill}
                </span>
              ))}
              {user.skillsWanted.length > 4 && (
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                  +{user.skillsWanted.length - 4} more
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 space-y-3">
          <button
            onClick={handleRequestClick}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <div className="flex items-center justify-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Request Skill Swap
            </div>
          </button>
          
          <button className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-xl transition-all duration-200 border border-gray-200">
            View Profile
          </button>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent pointer-events-none"></div>
      )}
    </div>
  );
};

export default UserCard;