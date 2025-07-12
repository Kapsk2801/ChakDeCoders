import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useInView as useIntersectionObserver } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { 
  Sparkles, Zap, Users, Target, ArrowRight, Star, 
  Code, Globe, Shield, TrendingUp, CheckCircle,
  Play, ChevronRight, ChevronLeft, Quote, User
} from 'lucide-react';
import ModernFooter from './ModernFooter';
import DemoVideoSection from './DemoVideoSection';

const LandingPage = ({ currentUser, onLogout, onLoginClick, onProfileClick }) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Testimonials data
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Full-Stack Developer",
      company: "TechCorp",
      content: "SkillKarma transformed how I learn new technologies. The AI matching is incredibly accurate!",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Marcus Rodriguez",
      role: "UX Designer",
      company: "DesignStudio",
      content: "Found my perfect mentor for advanced Figma techniques. The voice recognition feature is game-changing.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Emily Watson",
      role: "Data Scientist",
      company: "DataFlow",
      content: "The AR skill preview helped me understand complex ML concepts in a whole new way.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ];

  // Features data
  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Matching",
      description: "Advanced algorithms analyze your skills and preferences to find perfect exchange partners",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Zap,
      title: "Voice Skill Recognition",
      description: "Simply speak your skills and let our AI detect and categorize them automatically",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Globe,
      title: "Global Community",
      description: "Connect with skilled professionals from around the world, 24/7",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Shield,
      title: "Secure Exchange",
      description: "End-to-end encrypted communication and verified skill assessments",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Monitor your skill development with detailed analytics and insights",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: Code,
      title: "AR Skill Preview",
      description: "Experience skills in augmented reality before committing to an exchange",
      gradient: "from-pink-500 to-rose-500"
    }
  ];

  // Stats data
  const stats = [
    { number: "10K+", label: "Active Users", color: "text-purple-400" },
    { number: "50K+", label: "Skills Exchanged", color: "text-cyan-400" },
    { number: "95%", label: "Success Rate", color: "text-pink-400" },
    { number: "150+", label: "Countries", color: "text-green-400" }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <div id="home">
        <HeroSection />
      </div>

      {/* Features Section */}
      <div id="features">
        <FeaturesSection features={features} />
      </div>

      {/* How It Works Section */}
      <div id="how-it-works">
        <HowItWorksSection />
      </div>

      {/* Stats Section */}
      <StatsSection stats={stats} />

      {/* Demo Video Section */}
      <DemoVideoSection />

      {/* Testimonials Section */}
      <TestimonialsSection 
        testimonials={testimonials}
        currentTestimonial={currentTestimonial}
        setCurrentTestimonial={setCurrentTestimonial}
      />

      {/* Pricing Section */}
      <div id="pricing">
        <PricingSection />
      </div>

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <ModernFooter />
    </div>
  );
};

// Hero Section Component
const HeroSection = () => {
  const [particles, setParticles] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const initialParticles = Array.from({ length: 50 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 3 + 1,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`,
      opacity: Math.random() * 0.5 + 0.3
    }));
    setParticles(initialParticles);

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        const distance = Math.sqrt(
          Math.pow(particle.x - mousePosition.x, 2) +
          Math.pow(particle.y - mousePosition.y, 2)
        );

        if (distance < 100) {
          const angle = Math.atan2(mousePosition.y - particle.y, mousePosition.x - particle.x);
          particle.x += Math.cos(angle) * 2;
          particle.y += Math.sin(angle) * 2;
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;

        particles.forEach((otherParticle, otherIndex) => {
          if (otherIndex !== index) {
            const distance = Math.sqrt(
              Math.pow(particle.x - otherParticle.x, 2) +
              Math.pow(particle.y - otherParticle.y, 2)
            );
            if (distance < 150) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = `rgba(147, 51, 234, ${0.3 * (1 - distance / 150)})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particles, mousePosition]);

  const scrollToMainContent = () => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="space-y-4"
            >
              <h1 className="text-6xl md:text-8xl font-bold text-white leading-tight">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  SkillKarma
                </span>
              </h1>
              <p className="text-2xl md:text-3xl text-gray-300 font-light">
                Where Skills Meet <span className="text-purple-400 font-semibold">Destiny</span>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Experience the future of skill exchange with AI-powered matching, 
                voice recognition, and augmented reality previews. 
                Connect with like-minded professionals and unlock your potential.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/explore"
                    className="group relative inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-2xl overflow-hidden"
                  >
                    <span className="flex items-center gap-2 relative z-10">
                      Get Started
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                    <motion.div
                      className="absolute inset-0 bg-white/20 rounded-full"
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>

                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border border-white/30 hover:bg-white/20 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Watch Demo
                    <Play className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-white/10 rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </motion.div>
    </div>
  );
};

// Features Section Component
const FeaturesSection = ({ features }) => {
  const [ref, inView] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Powerful Features for Modern Learning
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the tools that make SkillKarma the most advanced skill exchange platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 hover:border-purple-300 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
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
      </div>
    </section>
  );
};

// How It Works Section
const HowItWorksSection = () => {
  const [ref, inView] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  const steps = [
    {
      number: "01",
      title: "Create Your Profile",
      description: "Set up your profile with skills you offer and want to learn",
      icon: Users
    },
    {
      number: "02",
      title: "AI Matches You",
      description: "Our AI finds perfect skill exchange partners for you",
      icon: Sparkles
    },
    {
      number: "03",
      title: "Connect & Learn",
      description: "Start exchanging skills and grow together",
      icon: Users
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get started in just three simple steps
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative text-center"
            >
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">{step.number}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transform translate-x-4"></div>
                )}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {step.title}
              </h3>
              <p className="text-gray-600">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Stats Section
const StatsSection = ({ stats }) => {
  const [ref, inView] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Trusted by Thousands
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join our growing community of skill enthusiasts
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className={`text-4xl md:text-5xl font-bold ${stat.color} mb-2`}>
                {stat.number}
              </div>
              <div className="text-gray-300 text-lg">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection = ({ testimonials, currentTestimonial, setCurrentTestimonial }) => {
  const [ref, inView] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from real people who transformed their skills
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 md:p-12 rounded-3xl border border-purple-200"
            >
              <Quote className="w-12 h-12 text-purple-400 mb-6 mx-auto" />
              <p className="text-xl md:text-2xl text-gray-700 text-center mb-8 leading-relaxed">
                "{testimonials[currentTestimonial].content}"
              </p>
              <div className="flex items-center justify-center space-x-4">
                <img
                  src={testimonials[currentTestimonial].avatar}
                  alt={testimonials[currentTestimonial].name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="text-center">
                  <div className="font-semibold text-gray-900">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-gray-600">
                    {testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-purple-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Pricing Section
const PricingSection = () => {
  const [ref, inView] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for getting started",
      features: [
        "Basic skill matching",
        "Up to 5 skill exchanges per month",
        "Community access",
        "Email support"
      ],
      gradient: "from-gray-500 to-gray-600"
    },
    {
      name: "Pro",
      price: "$19",
      description: "For serious learners",
      features: [
        "Advanced AI matching",
        "Unlimited skill exchanges",
        "Voice skill recognition",
        "AR skill preview",
        "Priority support",
        "Progress analytics"
      ],
      gradient: "from-purple-500 to-pink-500",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For teams and organizations",
      features: [
        "Everything in Pro",
        "Team management",
        "Custom integrations",
        "Dedicated support",
        "Advanced analytics",
        "White-label options"
      ],
      gradient: "from-blue-500 to-cyan-500"
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start free and upgrade as you grow
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className={`relative p-8 bg-white rounded-3xl border-2 shadow-xl ${
                plan.popular ? 'border-purple-500 scale-105' : 'border-gray-200'
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
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-gray-600">/month</span>}
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 px-6 bg-gradient-to-r ${plan.gradient} text-white font-semibold rounded-full hover:opacity-90 transition-opacity`}>
                {plan.name === "Free" ? "Get Started" : plan.name === "Pro" ? "Start Free Trial" : "Contact Sales"}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Section
const CTASection = () => {
  const [ref, inView] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Skills?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join thousands of professionals who are already exchanging skills and growing together
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/explore"
                className="group relative inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-2xl overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore Skills
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-white/20 rounded-full"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/explore"
                className="group relative inline-block px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border border-white/30 hover:bg-white/20 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10">
                  Get Started Free
                </span>
                <motion.div
                  className="absolute inset-0 bg-white/10 rounded-full"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LandingPage; 