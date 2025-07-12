import { motion } from 'framer-motion';
import { 
  Check, Star, Zap, Crown, Users, MessageCircle,
  Calendar, Shield, Globe, ArrowRight
} from 'lucide-react';
import ModernNavbar from '../components/ModernNavbar';
import ModernFooter from '../components/ModernFooter';

const PricingPage = ({ currentUser, onLogout, onLoginClick, onProfileClick }) => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started with skill exchange',
      icon: Users,
      color: 'from-gray-500 to-gray-600',
      features: [
        'Create a basic profile',
        'Browse skill exchange partners',
        'Send up to 5 messages per month',
        'Basic search and filtering',
        'Community support'
      ],
      popular: false
    },
    {
      name: 'Pro',
      price: '$9.99',
      period: 'per month',
      description: 'For serious skill exchangers who want more features',
      icon: Zap,
      color: 'from-purple-500 to-pink-500',
      features: [
        'Everything in Free',
        'Unlimited messaging',
        'Advanced AI matching',
        'Video call integration',
        'Priority support',
        'Skill validation badges',
        'Session scheduling tools',
        'Progress tracking'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$29.99',
      period: 'per month',
      description: 'For teams and organizations',
      icon: Crown,
      color: 'from-yellow-500 to-orange-500',
      features: [
        'Everything in Pro',
        'Team management',
        'Custom skill categories',
        'Analytics dashboard',
        'API access',
        'Dedicated account manager',
        'Custom integrations',
        'Advanced security features'
      ],
      popular: false
    }
  ];

  const additionalFeatures = [
    {
      icon: Shield,
      title: 'Verified Profiles',
      description: 'All users are verified to ensure a safe and trustworthy environment'
    },
    {
      icon: Globe,
      title: 'Global Network',
      description: 'Connect with professionals from around the world'
    },
    {
      icon: MessageCircle,
      title: '24/7 Support',
      description: 'Get help whenever you need it with our round-the-clock support'
    },
    {
      icon: Calendar,
      title: 'Flexible Scheduling',
      description: 'Schedule sessions that work for your timezone and availability'
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
            Simple, Transparent
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {' '}Pricing
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect plan for your skill exchange journey. Start free and upgrade 
            as you grow with our flexible pricing options.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 ${
                plan.popular ? 'ring-2 ring-purple-500 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <plan.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">/{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 rounded-xl font-semibold transition-colors duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {plan.name === 'Free' ? 'Get Started' : 'Choose Plan'}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Additional Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl p-12 shadow-lg mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            All Plans Include
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl p-12 shadow-lg mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Can I cancel my subscription anytime?
              </h3>
              <p className="text-gray-600">
                Yes, you can cancel your subscription at any time. You'll continue to have access to your plan features until the end of your billing period.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Is there a free trial?
              </h3>
              <p className="text-gray-600">
                Yes! We offer a 14-day free trial for all paid plans. No credit card required to start your trial.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Can I upgrade or downgrade my plan?
              </h3>
              <p className="text-gray-600">
                Absolutely! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major credit cards, PayPal, and Apple Pay. All payments are processed securely through Stripe.
              </p>
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
            Start Free Trial
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </main>

      <ModernFooter />
    </div>
  );
};

export default PricingPage; 