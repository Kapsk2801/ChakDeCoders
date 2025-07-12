import { motion } from 'framer-motion';
import { 
  Users, Target, Heart, Globe, Award, 
  TrendingUp, Lightbulb, ArrowRight
} from 'lucide-react';
import ModernNavbar from '../components/ModernNavbar';
import ModernFooter from '../components/ModernFooter';

const AboutPage = ({ currentUser, onLogout, onLoginClick, onProfileClick }) => {
  const stats = [
    { number: '50K+', label: 'Active Users', icon: Users },
    { number: '100K+', label: 'Skills Exchanged', icon: Target },
    { number: '150+', label: 'Countries', icon: Globe },
    { number: '4.9/5', label: 'User Rating', icon: Award }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Community First',
      description: 'We believe in the power of community and mutual support. Every interaction is built on trust and collaboration.',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We continuously innovate with AI-powered matching, voice recognition, and AR technology to enhance the learning experience.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Globe,
      title: 'Global Access',
      description: 'We break down geographical barriers, connecting people from around the world to share knowledge and grow together.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: TrendingUp,
      title: 'Continuous Growth',
      description: 'We believe in lifelong learning and provide tools that help users continuously develop their skills and expertise.',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const team = [
    {
      name: 'Saksham Kapoor',
      role: 'CEO & Founder',
      image: '../src/assets/me.jpg',
      bio: 'Former Google engineer with a passion for connecting people through technology.'
    },
    {
      name: 'Aayush Chawla',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      image: '../src/assets/aayush.jpg',
      bio: 'AI specialist with 10+ years experience in machine learning and product development.'
    },
    {
      name: 'Lokesh Vyas',
      role: 'Head of Product',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      image: '../src/assets/Lokesh.jpg',
      bio: 'Product strategist focused on creating meaningful user experiences.'
    },
    {
      name: 'Zuhair Khambati',
      role: 'Head of Design',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      image: '../src/assets/Zuhair.jpg',
      bio: 'Design leader with expertise in user interface and experience design.'
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
            About
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {' '}SkillKarma
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're on a mission to democratize learning by connecting people who want to teach 
            with those who want to learn, creating a global community of skill exchange.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl p-12 shadow-lg mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  SkillKarma was born from a simple observation: traditional learning platforms 
                  often create barriers between teachers and learners, while the most effective 
                  learning happens through direct human connection and mutual exchange.
                </p>
                <p>
                  Founded in 2025, we set out to create a platform that would democratize 
                  learning by enabling anyone to both teach and learn from others. Our vision 
                  is a world where knowledge flows freely between people, regardless of their 
                  background, location, or financial means.
                </p>
                <p>
                  Today, SkillKarma connects thousands of professionals worldwide, facilitating 
                  meaningful skill exchanges that lead to personal growth, career advancement, 
                  and lasting relationships.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-lg opacity-90">
                  "To create a world where everyone has access to the knowledge they need 
                  to grow, and everyone has the opportunity to share their expertise with others."
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl p-12 shadow-lg mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-purple-600 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm">
                  {member.bio}
                </p>
              </motion.div>
            ))}
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
            Join Our Mission
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Be part of the revolution in how people learn and grow together. 
            Start your skill exchange journey today.
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

export default AboutPage; 