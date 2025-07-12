import { useState, useEffect, useRef } from 'react';
import { Eye, Box, Zap, Sparkles, Target } from 'lucide-react';

const ARSkillPreview = ({ skills, user }) => {
  const [isActive, setIsActive] = useState(false);
  const [currentSkill, setCurrentSkill] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!isActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const particles = [];
    const holograms = [];

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Create holographic particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        color: `hsl(${200 + Math.random() * 60}, 70%, 60%)`,
        alpha: Math.random() * 0.5 + 0.3
      });
    }

    // Create skill holograms
    skills.forEach((skill, index) => {
      const angle = (index / skills.length) * Math.PI * 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.25;
      const x = canvas.width / 2 + Math.cos(angle) * radius;
      const y = canvas.height / 2 + Math.sin(angle) * radius;

      holograms.push({
        x,
        y,
        skill,
        angle,
        radius,
        pulse: 0,
        rotation: 0
      });
    });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background grid
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      const gridSize = 30;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Update and draw particles
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Draw skill holograms
      holograms.forEach((hologram, index) => {
        hologram.pulse += 0.05;
        hologram.rotation += 0.02;

        const pulseSize = Math.sin(hologram.pulse) * 10 + 40;
        const isCurrent = index === currentSkill;
        const isHovered = hoveredSkill === index;

        // Draw holographic ring
        ctx.beginPath();
        ctx.arc(hologram.x, hologram.y, pulseSize, 0, Math.PI * 2);
        ctx.strokeStyle = isCurrent ? 'rgba(0, 255, 255, 0.8)' : 'rgba(0, 255, 255, 0.3)';
        ctx.lineWidth = isCurrent ? 3 : 1;
        ctx.stroke();

        // Draw inner ring
        ctx.beginPath();
        ctx.arc(hologram.x, hologram.y, pulseSize * 0.7, 0, Math.PI * 2);
        ctx.strokeStyle = isCurrent ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.2)';
        ctx.stroke();

        // Draw skill text
        ctx.save();
        ctx.translate(hologram.x, hologram.y);
        ctx.rotate(hologram.rotation);
        ctx.fillStyle = isCurrent ? '#ffffff' : '#00ffff';
        ctx.font = isCurrent ? 'bold 14px Arial' : '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(hologram.skill, 0, 0);
        ctx.restore();

        // Draw connection lines
        if (isCurrent) {
          holograms.forEach((otherHologram, otherIndex) => {
            if (otherIndex !== index) {
              const distance = Math.sqrt(
                Math.pow(hologram.x - otherHologram.x, 2) +
                Math.pow(hologram.y - otherHologram.y, 2)
              );
              if (distance < 200) {
                ctx.beginPath();
                ctx.moveTo(hologram.x, hologram.y);
                ctx.lineTo(otherHologram.x, otherHologram.y);
                ctx.strokeStyle = 'rgba(0, 255, 255, 0.2)';
                ctx.lineWidth = 1;
                ctx.stroke();
              }
            }
          });
        }
      });

      // Draw center user info
      if (user) {
        ctx.fillStyle = 'rgba(0, 255, 255, 0.8)';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(user.name, canvas.width / 2, canvas.height / 2 - 20);
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.font = '12px Arial';
        ctx.fillText(`${skills.length} Skills`, canvas.width / 2, canvas.height / 2 + 5);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, skills, currentSkill, hoveredSkill, user]);

  useEffect(() => {
    if (isActive && skills.length > 0) {
      const interval = setInterval(() => {
        setCurrentSkill(prev => (prev + 1) % skills.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isActive, skills.length]);

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 p-6 rounded-2xl shadow-2xl border border-cyan-500/20">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Eye className="w-8 h-8 text-cyan-400 animate-pulse" />
          <h3 className="text-2xl font-bold text-white">AR Skill Preview</h3>
          <Box className="w-8 h-8 text-blue-400 animate-bounce" />
        </div>
        <p className="text-cyan-200">Experience your skills in augmented reality!</p>
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          className="w-full h-80 rounded-lg border border-cyan-500/30 cursor-pointer"
          onClick={() => setIsActive(!isActive)}
          onMouseEnter={() => setIsActive(true)}
          onMouseLeave={() => setIsActive(false)}
        />
        
        {isActive && (
          <div className="absolute top-2 left-2">
            <div className="flex items-center gap-2 bg-black/50 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
              <span className="text-white text-sm">AR Active</span>
            </div>
          </div>
        )}

        {!isActive && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Target className="w-16 h-16 text-cyan-400 mx-auto mb-4 opacity-50" />
              <p className="text-cyan-200 text-lg">Click to activate AR mode</p>
            </div>
          </div>
        )}
      </div>

      {/* Skill Controls */}
      <div className="mt-6">
        <h4 className="text-lg font-semibold text-white mb-3">Skill Holograms:</h4>
        <div className="grid grid-cols-3 gap-2">
          {skills.map((skill, index) => (
            <button
              key={index}
              onClick={() => setCurrentSkill(index)}
              onMouseEnter={() => setHoveredSkill(index)}
              onMouseLeave={() => setHoveredSkill(null)}
              className={`p-3 rounded-lg border transition-all duration-300 ${
                index === currentSkill
                  ? 'bg-cyan-500/20 border-cyan-500 text-cyan-200'
                  : 'bg-white/10 border-cyan-500/30 text-cyan-100 hover:bg-cyan-500/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium truncate">{skill}</span>
                {index === currentSkill && <Sparkles className="w-4 h-4 text-cyan-400" />}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* AR Controls */}
      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={() => setIsActive(!isActive)}
          className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
            isActive
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-cyan-500 hover:bg-cyan-600 text-white'
          }`}
        >
          {isActive ? 'Deactivate AR' : 'Activate AR'}
        </button>
        
        <button
          onClick={() => setCurrentSkill(prev => (prev + 1) % skills.length)}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
        >
          Next Skill
        </button>
      </div>

      {/* AR Features */}
      <div className="mt-6 bg-white/5 p-4 rounded-lg">
        <h5 className="text-cyan-200 font-semibold mb-2 flex items-center gap-2">
          <Zap className="w-4 h-4" />
          AR Features
        </h5>
        <ul className="text-cyan-300 text-sm space-y-1">
          <li>• Holographic skill visualization</li>
          <li>• Real-time particle effects</li>
          <li>• Interactive skill connections</li>
          <li>• Dynamic color transitions</li>
        </ul>
      </div>
    </div>
  );
};

export default ARSkillPreview; 