import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Bell } from 'lucide-react';
import { requestAPI, tokenManager } from '../services/api';

const ModernNavbar = ({ currentUser, onLogout, onLoginClick, onProfileClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [notifLoading, setNotifLoading] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Explore', href: '/explore' },
    { name: 'Favourites', href: '/favourites' },
    { name: 'Features', href: '/features' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  const isActivePage = (href) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname === href;
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!currentUser) return;
      setNotifLoading(true);
      try {
        const token = tokenManager.getToken();
        const data = await requestAPI.getReceived(token);
        // Only show pending requests as notifications
        setNotifications((data.requests || data || []).filter(r => r.status === 'pending'));
      } catch (err) {
        setNotifications([]);
      } finally {
        setNotifLoading(false);
      }
    };
    fetchNotifications();
    // Optionally, poll every 30s
    const interval = setInterval(fetchNotifications, 3000);
    return () => clearInterval(interval);
  }, [currentUser]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SK</span>
              </div>
              <span className="font-bold text-xl text-gray-900">
                SkillKarma
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -2 }}
              >
                <Link
                  to={item.href}
                  className={`text-sm font-medium transition-colors ${
                    isActivePage(item.href)
                      ? 'text-purple-600'
                      : 'text-gray-700 hover:text-purple-600'
                  }`}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Notification Bell */}
          {currentUser && (
            <div className="relative mr-4">
              <button
                className="relative focus:outline-none"
                onClick={() => setShowNotifDropdown((v) => !v)}
                aria-label="Notifications"
              >
                <Bell className="w-6 h-6 text-gray-700 hover:text-purple-600 transition-colors" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 font-bold animate-pulse">
                    {notifications.length}
                  </span>
                )}
              </button>
              {/* Dropdown */}
              {showNotifDropdown && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 font-semibold text-gray-800 border-b">New Requests</div>
                  {notifLoading ? (
                    <div className="px-4 py-4 text-gray-500">Loading...</div>
                  ) : notifications.length === 0 ? (
                    <div className="px-4 py-4 text-gray-500">No new requests</div>
                  ) : (
                    notifications.slice(0, 5).map((req) => (
                      <div key={req._id} className="px-4 py-3 hover:bg-gray-50 flex items-center gap-3 border-b last:border-b-0">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
                          {req.sender?.name ? req.sender.name[0] : 'U'}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-800">{req.sender?.name || 'Unknown User'}</div>
                          <div className="text-xs text-gray-500 truncate">{req.sender?.email}</div>
                          <div className="text-xs text-blue-600 mt-1">{req.skillsOffered?.join(', ')}</div>
                        </div>
                        <a
                          href="/requests"
                          className="text-xs text-purple-600 font-semibold underline ml-2"
                          onClick={() => setShowNotifDropdown(false)}
                        >View</a>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                >
                  <img
                    src={currentUser.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'}
                    alt={currentUser.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-sm font-medium">{currentUser.name}</span>
                  <ChevronDown className="w-4 h-4" />
                </motion.button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2"
                    >
                      <button
                        onClick={() => {
                          onProfileClick();
                          setIsDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Profile
                      </button>
                      <button
                        onClick={() => {
                          window.location.href = '/requests';
                          setIsDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Requests
                      </button>
                      <button
                        onClick={() => {
                          onLogout();
                          setIsDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onLoginClick}
                  className="px-6 py-2 text-gray-700 font-medium hover:text-purple-600 transition-colors"
                >
                  Sign In
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onLoginClick}
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                >
                  Get Started
                </motion.button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-gray-900" />
            ) : (
              <Menu className="w-6 h-6 text-gray-900" />
            )}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white rounded-xl mt-4 p-4 border border-gray-200 shadow-lg"
            >
              <div className="space-y-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block w-full text-left font-medium py-2 ${
                        isActivePage(item.href)
                          ? 'text-purple-600'
                          : 'text-gray-700 hover:text-purple-600'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                
                <div className="pt-4 border-t border-gray-200">
                  {currentUser ? (
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          onProfileClick();
                          setIsOpen(false);
                        }}
                        className="block w-full text-left text-gray-700 hover:text-purple-600 font-medium py-2"
                      >
                        Profile
                      </button>
                      <button
                        onClick={() => {
                          window.location.href = '/requests';
                          setIsOpen(false);
                        }}
                        className="block w-full text-left text-gray-700 hover:text-purple-600 font-medium py-2"
                      >
                        Requests
                      </button>
                      <button
                        onClick={() => {
                          onLogout();
                          setIsOpen(false);
                        }}
                        className="block w-full text-left text-gray-700 hover:text-purple-600 font-medium py-2"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          onLoginClick();
                          setIsOpen(false);
                        }}
                        className="block w-full text-left text-gray-700 hover:text-purple-600 font-medium py-2"
                      >
                        Sign In
                      </button>
                      <button
                        onClick={() => {
                          onLoginClick();
                          setIsOpen(false);
                        }}
                        className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                      >
                        Get Started
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default ModernNavbar; 