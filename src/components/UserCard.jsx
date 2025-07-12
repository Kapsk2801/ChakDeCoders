import { Star, User, MapPin, Clock, MessageCircle, Heart, Share2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const getFavourites = () => {
  try {
    return JSON.parse(localStorage.getItem('favourite_user_ids') || '[]');
  } catch {
    return [];
  }
};
const setFavourites = (ids) => {
  localStorage.setItem('favourite_user_ids', JSON.stringify(ids));
  window.dispatchEvent(new Event('storage'));
};

const UserCard = ({ user, onRequestClick, isLoggedIn }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const favs = getFavourites();
    setIsLiked(favs.includes(user.id));
  }, [user.id]);

  const handleRequestClick = () => {
    onRequestClick(user, isLoggedIn);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleFavourite = (e) => {
    e.stopPropagation();
    const favs = getFavourites();
    let updated;
    if (favs.includes(user.id)) {
      updated = favs.filter(id => id !== user.id);
      setIsLiked(false);
    } else {
      updated = [...favs, user.id];
      setIsLiked(true);
    }
    setFavourites(updated);
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
      className={`relative group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center p-6">
        {/* Left Section - Profile Photo and Basic Info */}
        <div className="flex items-center space-x-4 flex-shrink-0">
          {/* Profile Photo */}
          <div className="relative">
            {(user.avatar || user.profilePhoto) ? (
              <img
                src={user.avatar || user.profilePhoto}
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover border-3 border-white shadow-md"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-3 border-white shadow-md flex items-center justify-center">
                <User className="w-7 h-7 text-white" />
              </div>
            )}
            {/* Online Status */}
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
          </div>

          {/* User Basic Info */}
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-gray-800 mb-1">{user.name}</h3>
            
            {/* Rating */}
            <div className="flex items-center gap-1 mb-2">
              {renderStars(user.rating)}
              <span className="text-sm text-gray-600 ml-1">({user.rating})</span>
            </div>

            {/* Location & Availability */}
            <div className="flex items-center gap-4 text-sm text-gray-500">
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
        </div>

        {/* Center Section - Skills */}
        <div className="flex-1 ml-8">
          <div className="grid grid-cols-2 gap-6">
            {/* Skills Offered */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Skills Offered
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {user.skillsOffered.slice(0, 3).map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 text-xs rounded-full font-medium border border-green-200"
                  >
                    {skill}
                  </span>
                ))}
                {user.skillsOffered.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                    +{user.skillsOffered.length - 3} more
                  </span>
                )}
              </div>
            </div>

            {/* Skills Wanted */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Skills Wanted ({user.skillsWanted ? user.skillsWanted.length : 0})
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {user.skillsWanted && user.skillsWanted.length > 0 ? (
                  <>
                    {user.skillsWanted.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 text-xs rounded-full font-medium border border-blue-200"
                      >
                        {skill}
                      </span>
                    ))}
                    {user.skillsWanted.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                        +{user.skillsWanted.length - 3} more
                      </span>
                    )}
                  </>
                ) : (
                  <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full font-medium">
                    No skills wanted
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Action Buttons */}
        <div className="flex flex-col items-end space-y-3 ml-6">
          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleFavourite}
              className={`p-2 rounded-full transition-all duration-200 ${
                isLiked 
                  ? 'bg-red-500 text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title={isLiked ? 'Remove from Favourites' : 'Add to Favourites'}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-200"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Main Action Button */}
          <button
            onClick={handleRequestClick}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Request Swap
            </div>
          </button>
          
          <button
            className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-xl transition-all duration-200 border border-gray-200"
            onClick={() => navigate(`/profile/${user._id}`)}
          >
            View Profile
          </button>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 pointer-events-none"></div>
      )}
    </div>
  );
};

export default UserCard;