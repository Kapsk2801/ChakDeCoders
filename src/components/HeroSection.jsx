import { useState, useEffect, useRef } from 'react';
import { Sparkles, Zap, Users, Target, ArrowRight, Star } from 'lucide-react';

const HeroSection = () => {
  const [particles, setParticles] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    // Initialize particles
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

    // Mouse move handler
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
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

      // Update and draw particles
      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off walls
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Mouse interaction
        const distance = Math.sqrt(
          Math.pow(particle.x - mousePosition.x, 2) +
          Math.pow(particle.y - mousePosition.y, 2)
        );

        if (distance < 100) {
          const angle = Math.atan2(mousePosition.y - particle.y, mousePosition.x - particle.x);
          particle.x += Math.cos(angle) * 2;
          particle.y += Math.sin(angle) * 2;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Draw connections
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

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900 overflow-hidden">
      {/* Animated Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Floating Icons */}
          <div className="absolute top-20 left-20 animate-bounce">
            <Sparkles className="w-8 h-8 text-purple-400" />
          </div>
          <div className="absolute top-40 right-20 animate-pulse">
            <Zap className="w-8 h-8 text-yellow-400" />
          </div>
          <div className="absolute bottom-40 left-20 animate-bounce">
            <Star className="w-8 h-8 text-pink-400" />
          </div>
          <div className="absolute bottom-20 right-40 animate-pulse">
            <Target className="w-8 h-8 text-cyan-400" />
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Title */}
            <div className="space-y-4">
              <h1 className="text-6xl md:text-8xl font-bold text-white leading-tight">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  SkillKarma
                </span>
              </h1>
              <p className="text-2xl md:text-3xl text-gray-300 font-light">
                Where Skills Meet <span className="text-purple-400 font-semibold">Destiny</span>
              </p>
            </div>

            {/* Subtitle */}
            <div className="space-y-6">
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Experience the future of skill exchange with AI-powered matching, 
                voice recognition, and augmented reality previews. 
                Connect with like-minded professionals and unlock your potential.
              </p>

              {/* Feature Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-purple-500/30 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center justify-center w-12 h-12 bg-purple-500 rounded-full mx-auto mb-4">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">AI-Powered Matching</h3>
                  <p className="text-gray-300 text-sm">
                    Advanced algorithms find your perfect skill exchange partners
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-cyan-500/30 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center justify-center w-12 h-12 bg-cyan-500 rounded-full mx-auto mb-4">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Voice Recognition</h3>
                  <p className="text-gray-300 text-sm">
                    Speak your skills and let AI detect them automatically
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-pink-500/30 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center justify-center w-12 h-12 bg-pink-500 rounded-full mx-auto mb-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">AR Skill Preview</h3>
                  <p className="text-gray-300 text-sm">
                    Experience your skills in stunning augmented reality
                  </p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                  <span className="flex items-center gap-2">
                    Get Started
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                </button>

                <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border border-white/30 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  Watch Demo
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mt-16">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">10K+</div>
                  <div className="text-gray-400 text-sm">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400">50K+</div>
                  <div className="text-gray-400 text-sm">Skills Exchanged</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-400">95%</div>
                  <div className="text-gray-400 text-sm">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection; 