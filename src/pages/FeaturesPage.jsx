import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Brain, Mic, Eye, Shield, Zap,
  Search, MessageCircle, Calendar, Star,
  BarChart3, Lightbulb, Play, ArrowRight,
  ChevronDown, ChevronUp
} from 'lucide-react';
import ModernNavbar from '../components/ModernNavbar';
import ModernFooter from '../components/ModernFooter';
import AIMatchingSystem from '../components/AIMatchingSystem';
import VoiceSkillRecognition from '../components/VoiceSkillRecognition';
import ARSkillPreview from '../components/ARSkillPreview';
import { mockUsers } from '../data/mockUsers';

const FeaturesPage = ({ currentUser, onLogout, onLoginClick, onProfileClick }) => {
  const [selectedAITool, setSelectedAITool] = useState(null);
  const [expandedTool, setExpandedTool] = useState(null);

  const scrollToAITool = (toolName) => {
    setSelectedAITool(toolName);
    const element = document.getElementById(`ai-${toolName.toLowerCase().replace(/\s+/g, '-')}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const aiTools = [
    {
      id: 'matching-system',
      icon: Users,
      title: 'AI Matching System',
      subtitle: 'Intelligent Pairing',
      description: 'Our advanced AI algorithm analyzes your skills, availability, and learning preferences to find the perfect skill exchange partners.',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50',
      borderColor: 'border-purple-200',
      component: AIMatchingSystem,
      props: { currentUser, allUsers: mockUsers }
    },
    {
      id: 'voice-recognition',
      icon: Mic,
      title: 'Voice Skill Recognition',
      subtitle: 'Speech-to-Skills',
      description: 'Simply speak your skills and our AI will automatically detect, categorize, and add them to your profile with high accuracy.',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
      borderColor: 'border-blue-200',
      component: VoiceSkillRecognition,
      props: { 
        onSkillsDetected: (skills) => {
          console.log('Voice skills detected:', skills);
        }
      }
    },
    {
      id: 'ar-preview',
      icon: Eye,
      title: 'AR Skill Preview',
      subtitle: '3D Visualization',
      description: 'Experience skills in stunning 3D visualization with interactive holographic displays and immersive AR technology.',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50',
      borderColor: 'border-green-200',
      component: ARSkillPreview,
      props: { 
        skills: currentUser ? [...(currentUser.skillsOffered || []), ...(currentUser.skillsWanted || [])] : ['JavaScript', 'React', 'Python', 'Design', 'Marketing'],
        user: currentUser || { name: 'Demo User' }
      }
    }
  ];

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Matching',
      description: 'Advanced algorithms match you with the perfect skill exchange partners based on your interests, expertise, and learning goals.',
      color: 'from-purple-500 to-pink-500',
      hasAITool: true,
      aiToolName: 'matching-system'
    },
    {
      icon: Mic,
      title: 'Voice Skill Recognition',
      description: 'Simply speak your skills and our AI will automatically detect and categorize them for your profile.',
      color: 'from-blue-500 to-cyan-500',
      hasAITool: true,
      aiToolName: 'voice-recognition'
    },
    {
      icon: Eye,
      title: 'AR Skill Preview',
      description: 'Experience skills in stunning 3D visualization with interactive holographic displays.',
      color: 'from-green-500 to-emerald-500',
      hasAITool: true,
      aiToolName: 'ar-preview'
    },
    {
      icon: Users,
      title: 'Global Community',
      description: 'Connect with professionals worldwide and expand your network across different industries and cultures.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Search,
      title: 'Smart Search & Filter',
      description: 'Find exactly what you\'re looking for with intelligent search and advanced filtering options.',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: MessageCircle,
      title: 'Real-time Communication',
      description: 'Built-in messaging and video calling to facilitate seamless skill exchange sessions.',
      color: 'from-teal-500 to-blue-500'
    },
    {
      icon: Calendar,
      title: 'Flexible Scheduling',
      description: 'Schedule skill exchange sessions that fit your availability and timezone preferences.',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: Shield,
      title: 'Verified Profiles',
      description: 'All users are verified to ensure a safe and trustworthy skill exchange environment.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Star,
      title: 'Skill Validation',
      description: 'Get your skills validated by the community and build a credible reputation.',
      color: 'from-emerald-500 to-green-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <ModernNavbar 
        currentUser={currentUser}
        onLogout={onLogout}
        onLoginClick={onLoginClick}
        onProfileClick={onProfileClick}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Powerful Features for
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {' '}Skill Exchange
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the cutting-edge features that make SkillKarma the ultimate platform 
            for connecting, learning, and growing through skill exchange.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {feature.description}
              </p>
              
              {/* AI Tool Button */}
              {feature.hasAITool && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToAITool(feature.aiToolName)}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Play className="w-4 h-4" />
                  Try AI Tool
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              )}
              
              {/* AI Badge */}
              {feature.hasAITool && (
                <div className="absolute top-4 right-4">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full font-semibold flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    AI
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* AI Tools Demo Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">
                AI-Powered Tools
              </h2>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Experience the future of skill exchange with our cutting-edge AI features
            </p>
          </div>

          {/* AI Tools Collapsible List */}
          <div className="space-y-6 max-w-4xl mx-auto">
            {aiTools.map((tool, index) => (
              <motion.div
                key={tool.id}
                id={`ai-${tool.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`bg-gradient-to-r ${tool.bgColor} rounded-3xl border ${tool.borderColor} overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                {/* Tool Header - Always Visible */}
                <motion.button
                  onClick={() => setExpandedTool(expandedTool === tool.id ? null : tool.id)}
                  className="w-full p-8 text-left flex items-center justify-between group hover:bg-white/50 transition-all duration-300"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-center gap-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${tool.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                      <tool.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors duration-300">
                        {tool.title}
                      </h3>
                      <p className="text-gray-600 font-medium mb-1">
                        {tool.subtitle}
                      </p>
                      <p className="text-gray-500 text-sm leading-relaxed max-w-2xl">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Expand/Collapse Icon */}
                  <div className="flex items-center gap-3">
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-purple-500" />
                      AI Tool
                    </div>
                    <div className={`w-8 h-8 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center transition-transform duration-300 ${
                      expandedTool === tool.id ? 'rotate-180' : ''
                    }`}>
                      {expandedTool === tool.id ? (
                        <ChevronUp className="w-5 h-5 text-gray-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-600" />
                      )}
                    </div>
                  </div>
                </motion.button>

                {/* Collapsible Content */}
                <AnimatePresence>
                  {expandedTool === tool.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-8">
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-lg">
                          <div className="mb-4">
                            <h4 className="text-lg font-semibold text-gray-800 mb-2">Interactive Demo</h4>
                            <p className="text-gray-600 text-sm">
                              Try out the {tool.title.toLowerCase()} feature below
                            </p>
                          </div>
                          <div className="bg-gray-50 rounded-xl p-4">
                            <tool.component {...tool.props} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Additional AI Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-4xl mx-auto">
            {/* Skill Analytics */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-white" />
                </div>
                <h4 className="font-semibold text-gray-800">Skill Analytics</h4>
              </div>
              <p className="text-gray-600 text-sm">
                Track your skill development progress and get insights on learning patterns
              </p>
            </motion.div>

            {/* Smart Recommendations */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Lightbulb className="w-4 h-4 text-white" />
                </div>
                <h4 className="font-semibold text-gray-800">Smart Recommendations</h4>
              </div>
              <p className="text-gray-600 text-sm">
                Get personalized skill recommendations based on your interests and goals
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-white mt-16"
        >
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Skill Exchange Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of professionals who are already exchanging skills and growing together.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors duration-300"
          >
            Get Started Today
          </motion.button>
        </motion.div>
      </main>

      <ModernFooter />
    </div>
  );
};

export default FeaturesPage; 