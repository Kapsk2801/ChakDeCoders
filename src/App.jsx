import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import ProfilePage from './components/ProfilePage';
import LandingPage from './components/LandingPage';
import PageTransition from './components/PageTransition';
import './App.css';

// Import new page components
import FeaturesPage from './pages/FeaturesPage';
import HowItWorksPage from './pages/HowItWorksPage';
import PricingPage from './pages/PricingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ExplorePage from './pages/ExplorePage';

// Main App Component
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (userData) => {
    setCurrentUser(userData);
  };

  const handleLogout = () => {
    setCurrentUser(null);
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

  return (
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
                onBack={handleBackToHome}
                onSave={handleProfileSave}
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
          path="/pricing" 
          element={
            <PageTransition>
              <PricingPage 
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
      </Routes>
    </AnimatePresence>
  );
}

// Wrapper component to provide Router context
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;