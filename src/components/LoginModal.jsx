import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Mail, Lock, User, Loader2, Briefcase, FileText, 
  Eye, EyeOff, AlertCircle, CheckCircle, Plus, X as XIcon
} from 'lucide-react';
import { authAPI, tokenManager } from '../services/api';
import SkillTagInput from './SkillTagInput';

const steps = [
  'Account Details',
  'Your Skills',
];

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    skillsOffered: [],
    skillsWanted: [],
    bio: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        skillsOffered: [],
        skillsWanted: [],
        bio: ''
      });
      setErrors({});
      setError('');
      setSuccess('');
      setShowPassword(false);
      setStep(0);
    }
  }, [isOpen]);

  const validateStep = () => {
    const newErrors = {};
    if (isSignUp) {
      if (step === 0) {
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email address';
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
      }
      if (step === 1) {
        if (formData.skillsOffered.length === 0) newErrors.skillsOffered = 'Add at least one skill you can teach';
        if (formData.skillsWanted.length === 0) newErrors.skillsWanted = 'Add at least one skill you want to learn';
      }
    } else {
      if (!formData.email) newErrors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email address';
      if (!formData.password) newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;
    setIsLoading(true);
    setError('');
    setSuccess('');
    try {
      let userData;
      if (isSignUp) {
        userData = await authAPI.signup({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          skillsOffered: formData.skillsOffered,
          skillsWanted: formData.skillsWanted,
          bio: formData.bio.trim()
        });
      } else {
        userData = await authAPI.login({
          email: formData.email.trim().toLowerCase(),
          password: formData.password
        });
      }
      tokenManager.saveToken(userData.token);
      setSuccess(isSignUp ? 'Account created successfully!' : 'Login successful!');
      onLogin(userData);
      setTimeout(() => {
        onClose();
        setFormData({ 
          name: '', 
          email: '', 
          password: '', 
          confirmPassword: '', 
          skillsOffered: [],
          skillsWanted: [],
          bio: '' 
        });
        setSuccess('');
        setErrors({});
      }, 1500);
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSkillsOfferedChange = (skills) => {
    setFormData(prev => ({ ...prev, skillsOffered: skills }));
    if (errors.skillsOffered) setErrors(prev => ({ ...prev, skillsOffered: '' }));
  };
  const handleSkillsWantedChange = (skills) => {
    setFormData(prev => ({ ...prev, skillsWanted: skills }));
    if (errors.skillsWanted) setErrors(prev => ({ ...prev, skillsWanted: '' }));
  };

  const canProceed = () => {
    if (!isSignUp) return true;
    if (step === 0) {
      return formData.name && formData.email && formData.password && formData.confirmPassword && Object.keys(errors).length === 0;
    }
    if (step === 1) {
      return formData.skillsOffered.length > 0 && formData.skillsWanted.length > 0 && Object.keys(errors).length === 0;
    }
    return true;
  };

  const renderStep = () => {
    if (!isSignUp) {
      // Login form
      return (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
                placeholder="Email address"
                autoComplete="email"
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
                placeholder="Password"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <button
            type="submit"
            className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Login'}
          </button>
        </form>
      );
    }
    // Signup steps
    if (step === 0) {
      return (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
                placeholder="Full name"
                autoComplete="name"
              />
            </div>
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
                placeholder="Email address"
                autoComplete="email"
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
                placeholder="Password"
                autoComplete="new-password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
                placeholder="Confirm password"
                autoComplete="new-password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>
        </div>
      );
    }
    if (step === 1) {
      return (
        <div className="space-y-6">
          <SkillTagInput
            skills={formData.skillsOffered}
            onSkillsChange={handleSkillsOfferedChange}
            placeholder="Add a skill you can teach..."
            label="Skills I Can Teach"
            error={errors.skillsOffered}
          />
          <SkillTagInput
            skills={formData.skillsWanted}
            onSkillsChange={handleSkillsWantedChange}
            placeholder="Add a skill you want to learn..."
            label="Skills I Want to Learn"
            error={errors.skillsWanted}
          />
        </div>
      );
    }
    return null;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {isSignUp ? 'Create Your Account' : 'Sign In'}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {isSignUp ? 'Start your skill swap journey!' : 'Welcome back!'}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Stepper */}
            {isSignUp && (
              <div className="flex items-center justify-center gap-2 py-4 bg-white border-b border-gray-100">
                {steps.map((label, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      idx === step
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {idx + 1}
                    </div>
                    {idx < steps.length - 1 && <div className="w-8 h-1 rounded bg-gray-200" />}
                  </div>
                ))}
              </div>
            )}

            {/* Content */}
            <div className="p-6 overflow-y-auto flex-1">{renderStep()}</div>

            {/* Footer Actions */}
            {isSignUp && (
              <div className="flex items-center justify-end p-6 border-t border-gray-200 bg-gray-50 flex-shrink-0">
                <div className="flex gap-2">
                  {step > 0 && (
                    <button
                      onClick={() => setStep(step - 1)}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors duration-200 font-medium"
                    >
                      Back
                    </button>
                  )}
                  {step < steps.length - 1 ? (
                    <button
                      onClick={() => {
                        if (validateStep()) setStep(step + 1);
                      }}
                      disabled={!canProceed()}
                      className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSubmit}
                      disabled={isLoading || !canProceed()}
                      className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Register
                        </>
                      )}
                    </motion.button>
                  )}
                </div>
              </div>
            )}
            {error && <div className="px-6 pb-4 text-red-500 text-sm flex items-center gap-2"><AlertCircle className="w-4 h-4" />{error}</div>}
            {success && <div className="px-6 pb-4 text-green-600 text-sm flex items-center gap-2"><CheckCircle className="w-4 h-4" />{success}</div>}
            {/* Toggle between login/signup */}
            <div className="px-6 pb-6 text-center">
              <p className="text-sm text-gray-600">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setErrors({});
                    setError('');
                    setSuccess('');
                    setStep(0);
                  }}
                  className="ml-1 text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200"
                >
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </motion.button>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;