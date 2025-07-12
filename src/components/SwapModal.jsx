import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, MessageCircle, Calendar, Clock, ArrowRight, Send, Users, Star, MapPin, Zap, Check
} from 'lucide-react';

const steps = [
  'What can you teach?',
  'What do you want to learn?',
  'When do you want to connect?',
  'Review & Send',
];

const SwapModal = ({ isOpen, onClose, user, currentUser }) => {
  const [step, setStep] = useState(0);
  const [selectedTeach, setSelectedTeach] = useState([]);
  const [selectedLearn, setSelectedLearn] = useState([]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  if (!isOpen || !user || !currentUser) return null;

  const resetState = () => {
    setStep(0);
    setSelectedTeach([]);
    setSelectedLearn([]);
    setDate('');
    setTime('');
    setMessage('');
    setIsSending(false);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleSkillToggle = (skill, type) => {
    if (type === 'teach') {
      setSelectedTeach(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]);
    } else {
      setSelectedLearn(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]);
    }
  };

  const canProceed = () => {
    if (step === 0) return selectedTeach.length > 0;
    if (step === 1) return selectedLearn.length > 0;
    if (step === 2) return date && time;
    return true;
  };

  const handleSendRequest = async () => {
    setIsSending(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert(`Skill swap request sent to ${user.name}!`);
      handleClose();
    } catch (error) {
      alert('Failed to send request. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  // Step content
  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-green-500" />
              What can you teach?
            </h3>
            <p className="mb-2 text-gray-600">Select one or more skills you can offer to {user.name}:</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {currentUser.skillsOffered?.length ? currentUser.skillsOffered.map((skill, idx) => {
                const isSelected = selectedTeach.includes(skill);
                return (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSkillToggle(skill, 'teach')}
                    className={`px-4 py-2 rounded-full border font-medium transition-all duration-200 flex items-center gap-2 ${
                      isSelected
                        ? 'bg-green-500 text-white border-green-500 shadow-lg'
                        : 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200'
                    }`}
                  >
                    {skill}
                    {isSelected && <Check className="w-4 h-4" />}
                  </motion.button>
                );
              }) : <span className="text-gray-400 italic">No skills added yet</span>}
            </div>
          </div>
        );
      case 1:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <ArrowRight className="w-5 h-5 text-blue-500" />
              What do you want to learn?
            </h3>
            <p className="mb-2 text-gray-600">Select one or more skills you want to learn from {user.name}:</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {user.skillsOffered?.length ? user.skillsOffered.map((skill, idx) => {
                const isSelected = selectedLearn.includes(skill);
                return (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSkillToggle(skill, 'learn')}
                    className={`px-4 py-2 rounded-full border font-medium transition-all duration-200 flex items-center gap-2 ${
                      isSelected
                        ? 'bg-blue-500 text-white border-blue-500 shadow-lg'
                        : 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200'
                    }`}
                  >
                    {skill}
                    {isSelected && <Check className="w-4 h-4" />}
                  </motion.button>
                );
              }) : <span className="text-gray-400 italic">No skills available</span>}
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-500" />
              When do you want to connect?
            </h3>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input
                  type="time"
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  value={time}
                  onChange={e => setTime(e.target.value)}
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              Review & Send
            </h3>
            <div className="mb-4">
              <div className="mb-2">
                <span className="font-medium text-gray-700">You will teach:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedTeach.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-green-500 text-white text-sm rounded-full font-medium">{skill}</span>
                  ))}
                </div>
              </div>
              <div className="mb-2">
                <span className="font-medium text-gray-700">You will learn:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedLearn.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full font-medium">{skill}</span>
                  ))}
                </div>
              </div>
              <div className="mb-2">
                <span className="font-medium text-gray-700">Date & Time:</span>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar className="w-4 h-4 text-purple-500" />
                  <span className="text-gray-700">{date} {time}</span>
                </div>
              </div>
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Message (optional)</label>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
                rows="3"
                placeholder={`Hi ${user.name}! I'd love to exchange skills with you. Let me know what you think and when you're available to connect...`}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

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
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Skill Exchange Request
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Connect and exchange skills with {user.name}
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Stepper */}
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

            {/* Content */}
            <div className="p-6 overflow-y-auto flex-1">{renderStep()}</div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50 flex-shrink-0">
              <button
                onClick={handleClose}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors duration-200 font-medium"
              >
                Cancel
              </button>
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
                    onClick={() => canProceed() && setStep(step + 1)}
                    disabled={!canProceed()}
                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSendRequest}
                    disabled={isSending}
                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSending ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Request
                      </>
                    )}
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SwapModal;