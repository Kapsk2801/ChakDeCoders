import { motion } from 'framer-motion';
import { 
  Users, Brain, Mic, Eye, Shield, Zap,
  Search, MessageCircle, Calendar, Star
} from 'lucide-react';
import ModernNavbar from '../components/ModernNavbar';
import ModernFooter from '../components/ModernFooter';

const FeaturesPage = ({ currentUser, onLogout, onLoginClick, onProfileClick }) => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Matching',
      description: 'Advanced algorithms match you with the perfect skill exchange partners based on your interests, expertise, and learning goals.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Mic,
      title: 'Voice Skill Recognition',
      description: 'Simply speak your skills and our AI will automatically detect and categorize them for your profile.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Eye,
      title: 'AR Skill Preview',
      description: 'Experience skills in stunning 3D visualization with interactive holographic displays.',
      color: 'from-green-500 to-emerald-500'
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
    },
    {
      icon: Zap,
      title: 'Instant Matching',
      description: 'Get matched with potential partners instantly based on your skill requirements.',
      color: 'from-violet-500 to-purple-500'
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
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-white"
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