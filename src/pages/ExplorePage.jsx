import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserCard from '../components/UserCard';
import SearchAndFilter from '../components/SearchAndFilter';
import Pagination from '../components/Pagination';
import LoginModal from '../components/LoginModal';
import SwapModal from '../components/SwapModal';
import AIMatchingSystem from '../components/AIMatchingSystem';
import VoiceSkillRecognition from '../components/VoiceSkillRecognition';
import ARSkillPreview from '../components/ARSkillPreview';
import SmoothScrollSection from '../components/SmoothScrollSection';
import { availabilityOptions } from '../data/mockUsers';
import { userAPI } from '../services/api';
import ModernNavbar from '../components/ModernNavbar';
import ModernFooter from '../components/ModernFooter';

const ExplorePage = ({ currentUser, onLogout, onLoginClick, onProfileClick }) => {
  const navigate = useNavigate();
  
  // Modal states
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Data states
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalUsers: 0,
    usersPerPage: 6
  });
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('All');

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      
      const params = {
        page: pagination.currentPage,
        limit: pagination.usersPerPage,
        ...(searchTerm && { search: searchTerm }),
        ...(selectedAvailability !== 'All' && { availability: selectedAvailability })
      };
      
      const data = await userAPI.getUsers(params);
      setUsers(data.users);
      setPagination(data.pagination);
    } catch (err) {
      setError('Failed to load users. Please try again.');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch users when dependencies change
  useEffect(() => {
    fetchUsers();
  }, [searchTerm, selectedAvailability, pagination.currentPage]);

  // Reset to first page when filters change
  const handleSearchChange = (term) => {
    setSearchTerm(term);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleAvailabilityChange = (availability) => {
    setSelectedAvailability(availability);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  // Authentication handlers
  const handleLogin = (userData) => {
    onLoginClick(userData);
  };

  // Request button handler
  const handleRequestClick = (user, isLoggedIn) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
    } else {
      setSelectedUser(user);
      setShowSwapModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Navigation */}
      <ModernNavbar 
        currentUser={currentUser}
        onLogout={onLogout}
        onLoginClick={() => setShowLoginModal(true)}
        onProfileClick={onProfileClick}
      />

      {/* Main Content */}
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Discover Skill Exchange Partners
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect with talented individuals to exchange skills and grow together. 
            Find someone who can teach you what you want to learn, and share your expertise in return.
          </p>
        </div>

        {/* Search and Filter */}
        <SearchAndFilter
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          selectedAvailability={selectedAvailability}
          onAvailabilityChange={handleAvailabilityChange}
          availabilityOptions={availabilityOptions}
        />

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {loading ? 'Loading...' : `Showing ${users.length} of ${pagination.totalUsers} skill exchange partners`}
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-300 rounded"></div>
                  <div className="h-3 bg-gray-300 rounded w-4/5"></div>
                  <div className="h-3 bg-gray-300 rounded w-3/5"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* User Grid */}
        {!loading && users.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {users.map(user => (
              <UserCard
                key={user._id}
                user={user}
                onRequestClick={handleRequestClick}
                isLoggedIn={!!currentUser}
              />
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && users.length === 0 && !error && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No skill exchange partners found matching your criteria.
            </p>
            <p className="text-gray-400 mt-2">
              Try adjusting your search terms or filters.
            </p>
          </div>
        )}

        {/* Pagination */}
        {!loading && pagination.totalPages > 1 && (
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        )}

        {/* AI-Powered Features Section */}
        <SmoothScrollSection className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Experience the Future of Skill Exchange
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Powered by cutting-edge AI technology for seamless skill matching and voice recognition
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* AI Matching System */}
            <SmoothScrollSection id="ai-matching-section" className="transition-all duration-700 delay-100">
              <AIMatchingSystem 
                currentUser={currentUser}
                allUsers={users}
              />
            </SmoothScrollSection>

            {/* Voice Skill Recognition */}
            <SmoothScrollSection id="voice-recognition-section" className="transition-all duration-700 delay-200">
              <VoiceSkillRecognition 
                onSkillsDetected={(skills) => {
                  console.log('Voice skills detected:', skills);
                  // In a real app, this would update the user's skills
                }}
              />
            </SmoothScrollSection>
          </div>
        </SmoothScrollSection>

        {/* AR Preview Section */}
        <SmoothScrollSection id="ar-preview-section" className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Augmented Reality Skill Preview
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience your skills in stunning 3D visualization with interactive holographic displays
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <ARSkillPreview 
              skills={currentUser ? [...(currentUser.skillsOffered || []), ...(currentUser.skillsWanted || [])] : ['JavaScript', 'React', 'Python', 'Design', 'Marketing']}
              user={currentUser || { name: 'Demo User' }}
            />
          </div>
        </SmoothScrollSection>
      </main>

      {/* Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />

      <SwapModal
        isOpen={showSwapModal}
        onClose={() => setShowSwapModal(false)}
        user={selectedUser}
        currentUser={currentUser}
      />

      <ModernFooter />
    </div>
  );
};

export default ExplorePage; 