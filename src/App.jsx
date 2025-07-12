import { useState, useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import ProfilePage from './components/ProfilePage';
import LandingPage from './components/LandingPage';
import PageTransition from './components/PageTransition';
import HeroSection from './components/HeroSection';
import AIMatchingSystem from './components/AIMatchingSystem';
import VoiceSkillRecognition from './components/VoiceSkillRecognition';
import { mockUsers, availabilityOptions } from './data/mockUsers';
import { authAPI, tokenManager } from './services/api';
import './App.css';

// Import new page components
import FeaturesPage from './pages/FeaturesPage';
import HowItWorksPage from './pages/HowItWorksPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ExplorePage from './pages/ExplorePage';
import ScrollToTop from './components/ScrollToTop';
import UserProfilePage from './pages/UserProfilePage';
import RequestsDashboard from './components/RequestsDashboard';
import FavouritesPage from './pages/FavouritesPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Main App Component
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check for existing token on app load
  useEffect(() => {
    const checkAuth = async () => {
      const token = tokenManager.getToken();
      if (token) {
        try {
          const userData = await authAPI.getProfile(token);
          setCurrentUser(userData);
        } catch (error) {
          console.error('Token validation failed:', error);
          tokenManager.removeToken();
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogin = (userData) => {
    setCurrentUser(userData);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    tokenManager.removeToken();
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleProfileSave = async (updatedProfile) => {
    // In a real app, you would save to your backend here
    setCurrentUser(updatedProfile);
    navigate('/');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={2500} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss pauseOnHover />
      <AnimatePresence mode="wait">
        <Routes>
          <Route 
            path="/" 
            element={
              <PageTransition>
                <LandingPage 
                  currentUser={currentUser}
                  onLogout={handleLogout}
                  onLoginClick={handleLogin}
                  onProfileClick={handleProfileClick}
                />
              </PageTransition>
            } 
          />
          <Route 
            path="/explore" 
            element={
              <PageTransition>
                <ExplorePage 
                  currentUser={currentUser}
                  onLogout={handleLogout}
                  onLoginClick={handleLogin}
                  onProfileClick={handleProfileClick}
                />
              </PageTransition>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <PageTransition>
                <ProfilePage 
                  currentUser={currentUser}
                  onBack={() => navigate('/explore')}
                  onSave={handleProfileSave}
                />
              </PageTransition>
            } 
          />
          <Route 
            path="/profile/:userId" 
            element={
              <PageTransition>
                <UserProfilePage 
                  currentUser={currentUser}
                  onLogout={handleLogout}
                  onLoginClick={handleLogin}
                  onProfileClick={handleProfileClick}
                />
              </PageTransition>
            } 
          />
          <Route 
            path="/features" 
            element={
              <PageTransition>
                <FeaturesPage 
                  currentUser={currentUser}
                  onLogout={handleLogout}
                  onLoginClick={handleLogin}
                  onProfileClick={handleProfileClick}
                />
              </PageTransition>
            } 
          />
          <Route 
            path="/how-it-works" 
            element={
              <PageTransition>
                <HowItWorksPage 
                  currentUser={currentUser}
                  onLogout={handleLogout}
                  onLoginClick={handleLogin}
                  onProfileClick={handleProfileClick}
                />
              </PageTransition>
            } 
          />
          <Route 
            path="/about" 
            element={
              <PageTransition>
                <AboutPage 
                  currentUser={currentUser}
                  onLogout={handleLogout}
                  onLoginClick={handleLogin}
                  onProfileClick={handleProfileClick}
                />
              </PageTransition>
            } 
          />
          <Route 
            path="/contact" 
            element={
              <PageTransition>
                <ContactPage 
                  currentUser={currentUser}
                  onLogout={handleLogout}
                  onLoginClick={handleLogin}
                  onProfileClick={handleProfileClick}
                />
              </PageTransition>
            } 
          />
          <Route 
            path="/requests" 
            element={
              <PageTransition>
                <RequestsDashboard currentUser={currentUser} />
              </PageTransition>
            } 
          />
          <Route 
            path="/favourites" 
            element={
              <PageTransition>
                <FavouritesPage 
                  currentUser={currentUser}
                  onRequestClick={() => {}}
                  isLoggedIn={!!currentUser}
                />
              </PageTransition>
            } 
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}

// Wrapper component to provide Router context
function AppWrapper() {
  return (
    <Router>
      <ScrollToTop />
      <App />
    </Router>
  );
}

export default AppWrapper;