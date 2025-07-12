import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Star, MapPin, Clock, MessageCircle, Heart, Share2, 
  User, Mail, Briefcase, FileText, Users, Calendar, Award
} from 'lucide-react';
import { userAPI } from '../services/api';
import ModernNavbar from '../components/ModernNavbar';
import ModernFooter from '../components/ModernFooter';
import SwapModal from '../components/SwapModal';

const UserProfilePage = ({ currentUser, onLogout, onLoginClick, onProfileClick }) => {
  const { userId } = useParams();
  const navigate = useNavigate();
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [showSwapModal, setShowSwapModal] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError('');
        const userData = await userAPI.getUserById(userId);
        setUser(userData);
      } catch (err) {
        setError('Failed to load user profile');
        console.error('Error fetching user:', err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      );
    }

    return stars;
  };

  const handleRequestSwap = () => {
    if (!currentUser) {
      onLoginClick();
      return;
    }
    setShowSwapModal(true);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleShare = () => {
    // Share functionality
    console.log('Share profile');
  };

  if (loading) {
  return (
      <div className="min-h-screen bg-gray-50">
        <ModernNavbar 
          currentUser={currentUser}
          onLogout={onLogout}
          onLoginClick={onLoginClick}
          onProfileClick={onProfileClick}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center space-x-6 mb-8">
                <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            </div>
          </div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ModernNavbar 
          currentUser={currentUser}
          onLogout={onLogout}
          onLoginClick={onLoginClick}
          onProfileClick={onProfileClick}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">User Not Found</h1>
            <p className="text-gray-600 mb-6">{error || 'The user profile you are looking for does not exist.'}</p>
              <button
              onClick={() => navigate('/explore')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Explore
              </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ModernNavbar 
        currentUser={currentUser}
        onLogout={onLogout}
        onLoginClick={onLoginClick}
        onProfileClick={onProfileClick}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/explore')}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Explore
        </motion.button>

        {/* Main Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-8 text-white relative">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center space-x-6">
                {/* Profile Photo */}
                <div className="relative">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-white/20 border-4 border-white shadow-lg flex items-center justify-center">
                      <User className="w-12 h-12 text-white" />
                    </div>
                  )}
                  <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-3 border-white shadow-sm"></div>
        </div>

                {/* User Info */}
                <div>
                  <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                  <div className="flex items-center space-x-4 text-white/90">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{user.location || 'Location not specified'}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{user.availability}</span>
                  </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleLike}
                  className={`p-3 rounded-full transition-all duration-200 ${
                    isLiked 
                      ? 'bg-red-500 text-white shadow-lg' 
                      : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={handleShare}
                  className="p-3 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm transition-all duration-200"
                >
                  <Share2 className="w-5 h-5" />
                </button>
          </div>
        </div>
      </div>

          {/* Content Section */}
          <div className="p-8">
            {/* Rating */}
            <div className="flex items-center mb-6">
              <div className="flex items-center space-x-1 mr-3">
                {renderStars(user.rating)}
              </div>
              <span className="text-lg font-semibold text-gray-700">({user.rating})</span>
              <span className="text-gray-500 ml-2">• {user.rating >= 4.5 ? 'Excellent' : user.rating >= 4 ? 'Very Good' : 'Good'} rating</span>
            </div>

            {/* Bio */}
            {user.bio && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-blue-500" />
                  About
                </h3>
                <p className="text-gray-600 leading-relaxed">{user.bio}</p>
              </div>
            )}

            {/* Skills Section */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Skills Offered */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  Skills Offered
                </h3>
                <div className="flex flex-wrap gap-2">
                  {user.skillsOffered && user.skillsOffered.length > 0 ? (
                    user.skillsOffered.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 rounded-full font-medium border border-green-200 hover:from-green-200 hover:to-emerald-200 transition-all duration-200"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 italic">No skills offered yet</span>
                  )}
                </div>
              </div>

              {/* Skills Wanted */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  Skills Wanted
                </h3>
                <div className="flex flex-wrap gap-2">
                  {user.skillsWanted && user.skillsWanted.length > 0 ? (
                    user.skillsWanted.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 rounded-full font-medium border border-blue-200 hover:from-blue-200 hover:to-indigo-200 transition-all duration-200"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 italic">No skills wanted yet</span>
                  )}
                </div>
              </div>
            </div>

            {/* Contact & Action Section */}
            <div className="border-t border-gray-200 pt-8">
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-6 text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Available: {user.availability}</span>
                  </div>
                  {user.email && (
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span>{user.email}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleRequestSwap}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Request Skill Swap</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        </div>

      <SwapModal
        isOpen={showSwapModal}
        onClose={() => setShowSwapModal(false)}
        user={user}
        currentUser={currentUser}
      />

      <ModernFooter />
    </div>
  );
};

export default UserProfilePage; 