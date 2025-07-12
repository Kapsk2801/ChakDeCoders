import { motion } from 'framer-motion';
import { 
  UserPlus, Search, MessageCircle, Calendar, 
  Users, Star, CheckCircle, ArrowRight
} from 'lucide-react';
import ModernNavbar from '../components/ModernNavbar';
import ModernFooter from '../components/ModernFooter';

const HowItWorksPage = ({ currentUser, onLogout, onLoginClick, onProfileClick }) => {
  const steps = [
    {
      icon: UserPlus,
      title: 'Create Your Profile',
      description: 'Sign up and build your profile by adding your skills, expertise level, and what you want to learn.',
      color: 'from-blue-500 to-cyan-500',
      details: [
        'Add your professional skills and expertise',
        'Specify what skills you want to learn',
        'Set your availability and preferences',
        'Upload a professional photo'
      ]
    },
    {
      icon: Search,
      title: 'Find Your Match',
      description: 'Our AI algorithm finds the perfect skill exchange partners based on your requirements and preferences.',
      color: 'from-purple-500 to-pink-500',
      details: [
        'Browse through potential matches',
        'Filter by skills, location, and availability',
        'View detailed profiles and reviews',
        'Use advanced search options'
      ]
    },
    {
      icon: MessageCircle,
      title: 'Connect & Communicate',
      description: 'Reach out to potential partners and start conversations about skill exchange opportunities.',
      color: 'from-green-500 to-emerald-500',
      details: [
        'Send personalized messages',
        'Schedule video calls',
        'Discuss skill exchange terms',
        'Plan your learning sessions'
      ]
    },
    {
      icon: Calendar,
      title: 'Schedule Sessions',
      description: 'Arrange skill exchange sessions that work for both parties and track your progress.',
      color: 'from-orange-500 to-red-500',
      details: [
        'Set up recurring sessions',
        'Choose your preferred platform',
        'Track session history',
        'Manage your calendar'
      ]
    },
    {
      icon: Users,
      title: 'Exchange Skills',
      description: 'Teach and learn simultaneously in structured sessions designed for maximum knowledge transfer.',
      color: 'from-indigo-500 to-purple-500',
      details: [
        'Conduct interactive sessions',
        'Share resources and materials',
        'Practice hands-on exercises',
        'Get real-time feedback'
      ]
    },
    {
      icon: Star,
      title: 'Rate & Review',
      description: 'Provide feedback and build your reputation in the SkillKarma community.',
      color: 'from-yellow-500 to-orange-500',
      details: [
        'Rate your exchange partners',
        'Write detailed reviews',
        'Build your credibility',
        'Earn skill badges'
      ]
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
            How SkillKarma
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {' '}Works
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get started with skill exchange in just 6 simple steps. Our platform makes it easy 
            to connect, learn, and grow with professionals worldwide.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-12 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`flex flex-col lg:flex-row items-center gap-8 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Step Icon */}
              <div className="flex-shrink-0">
                <div className={`w-24 h-24 bg-gradient-to-r ${step.color} rounded-3xl flex items-center justify-center shadow-lg`}>
                  <step.icon className="w-12 h-12 text-white" />
                </div>
                <div className="mt-4 text-center">
                  <span className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Step {index + 1}
                  </span>
                </div>
              </div>

              {/* Step Content */}
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  {step.description}
                </p>
                <ul className="space-y-2">
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl p-12 shadow-lg mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose SkillKarma?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Global Network</h3>
              <p className="text-gray-600">Connect with professionals from around the world</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Matches</h3>
              <p className="text-gray-600">AI-powered matching for the best skill exchange partners</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Verified Users</h3>
              <p className="text-gray-600">All users are verified for a safe experience</p>
            </div>
          </div>
        </motion.div>

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
            className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 flex items-center gap-2 mx-auto"
          >
            Get Started Today
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </main>

      <ModernFooter />
    </div>
  );
};

export default HowItWorksPage; 