import { useState, useEffect, useRef } from 'react';
import { Target, Zap, Users, Star } from 'lucide-react';

const SkillMatchVisualizer = ({ currentUser, allUsers }) => {
  const [matches, setMatches] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!currentUser || !allUsers) return;
    
    // Calculate skill matches
    const calculatedMatches = allUsers
      .filter(user => user.id !== currentUser.id && user.isPublic)
      .map(user => {
        const offeredMatches = currentUser.skillsWanted.filter(skill => 
          user.skillsOffered.includes(skill)
        );
        const wantedMatches = currentUser.skillsOffered.filter(skill => 
          user.skillsWanted.includes(skill)
        );
        
        const matchScore = (offeredMatches.length + wantedMatches.length) / 
          (currentUser.skillsOffered.length + currentUser.skillsWanted.length) * 100;
        
        return {
          user,
          offeredMatches,
          wantedMatches,
          matchScore: Math.round(matchScore),
          totalMatches: offeredMatches.length + wantedMatches.length
        };
      })
      .filter(match => match.totalMatches > 0)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 5);

    setMatches(calculatedMatches);
  }, [currentUser, allUsers]);

  useEffect(() => {
    if (!canvasRef.current || matches.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const particles = [];
    const connections = [];

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Create particles for each match
    matches.forEach((match, index) => {
      const angle = (index / matches.length) * Math.PI * 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.3;
      const x = canvas.width / 2 + Math.cos(angle) * radius;
      const y = canvas.height / 2 + Math.sin(angle) * radius;

      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: 8 + match.matchScore / 10,
        color: `hsl(${120 + match.matchScore * 2}, 70%, 60%)`,
        matchScore: match.matchScore,
        user: match.user
      });
    });

    // Create connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const distance = Math.sqrt(
          Math.pow(particles[i].x - particles[j].x, 2) +
          Math.pow(particles[i].y - particles[j].y, 2)
        );
        if (distance < 150) {
          connections.push({
            from: i,
            to: j,
            strength: 1 - distance / 150
          });
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      connections.forEach(connection => {
        const from = particles[connection.from];
        const to = particles[connection.to];
        
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.strokeStyle = `rgba(147, 51, 234, ${connection.strength * 0.3})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      // Update and draw particles
      particles.forEach(particle => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off walls
        if (particle.x < particle.size || particle.x > canvas.width - particle.size) {
          particle.vx *= -1;
        }
        if (particle.y < particle.size || particle.y > canvas.height - particle.size) {
          particle.vy *= -1;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Draw glow effect
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 2
        );
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw match score
        ctx.fillStyle = 'white';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`${particle.matchScore}%`, particle.x, particle.y + 4);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    setIsAnimating(true);
    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      setIsAnimating(false);
    };
  }, [matches]);

  if (!currentUser) {
    return (
      <div className="bg-gradient-to-br from-blue-900 to-purple-900 p-6 rounded-2xl text-center">
        <Users className="w-12 h-12 text-blue-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Skill Match Visualizer</h3>
        <p className="text-blue-200">Login to see your skill matches!</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 p-6 rounded-2xl shadow-2xl border border-purple-500/20">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Target className="w-8 h-8 text-blue-400 animate-pulse" />
          <h3 className="text-2xl font-bold text-white">Skill Match Visualizer</h3>
          <Zap className="w-8 h-8 text-yellow-400 animate-bounce" />
        </div>
        <p className="text-purple-200">See your skill compatibility in real-time!</p>
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          className="w-full h-64 rounded-lg border border-purple-500/30"
        />
        
        {isAnimating && (
          <div className="absolute top-2 right-2">
            <div className="flex items-center gap-2 bg-black/50 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white text-sm">Live</span>
            </div>
          </div>
        )}
      </div>

      {matches.length > 0 && (
        <div className="mt-6 space-y-3">
          <h4 className="text-lg font-semibold text-white text-center mb-4">
            Top Skill Matches
          </h4>
          {matches.slice(0, 3).map((match, index) => (
            <div key={match.user.id} className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <img
                    src={match.user.profilePhoto}
                    alt={match.user.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h5 className="font-semibold text-white">{match.user.name}</h5>
                    <p className="text-purple-200 text-sm">{match.totalMatches} skill matches</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-400">{match.matchScore}%</div>
                  <div className="text-xs text-purple-200">Match</div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1 mt-2">
                {match.offeredMatches.slice(0, 3).map((skill, i) => (
                  <span key={i} className="px-2 py-1 bg-green-500/20 text-green-300 rounded-full text-xs">
                    {skill}
                  </span>
                ))}
                {match.wantedMatches.slice(0, 3).map((skill, i) => (
                  <span key={i} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillMatchVisualizer; 