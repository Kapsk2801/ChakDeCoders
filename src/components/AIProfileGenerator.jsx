import { useState } from 'react';
import { Sparkles, Wand2, Zap, Brain } from 'lucide-react';

const AIProfileGenerator = ({ onGenerateProfile }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [generatedProfiles, setGeneratedProfiles] = useState([]);

  const aiPersonas = [
    {
      name: "Tech Guru",
      description: "AI-powered tech expert with cutting-edge skills",
      skills: ["AI/ML", "Blockchain", "Quantum Computing", "Cybersecurity"],
      bio: "Pioneering the future of technology with expertise in emerging tech. Always exploring the next big thing!",
      style: "bg-gradient-to-r from-purple-600 to-blue-600"
    },
    {
      name: "Creative Maverick",
      description: "Innovative artist and design visionary",
      skills: ["3D Animation", "AR/VR Design", "Digital Art", "Creative Coding"],
      bio: "Blending creativity with technology to create immersive digital experiences that push boundaries.",
      style: "bg-gradient-to-r from-pink-500 to-orange-500"
    },
    {
      name: "Data Wizard",
      description: "Analytics expert and insights specialist",
      skills: ["Data Science", "Big Data", "Predictive Analytics", "Business Intelligence"],
      bio: "Transforming raw data into actionable insights that drive business success and innovation.",
      style: "bg-gradient-to-r from-green-500 to-teal-500"
    },
    {
      name: "Digital Nomad",
      description: "Remote work and lifestyle optimization expert",
      skills: ["Remote Work", "Digital Marketing", "Productivity", "Lifestyle Design"],
      bio: "Living life on my own terms while helping others achieve location independence and work-life harmony.",
      style: "bg-gradient-to-r from-yellow-500 to-red-500"
    }
  ];

  const generateProfile = async () => {
    if (!userInput.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI processing with realistic delays
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const selectedPersona = aiPersonas[Math.floor(Math.random() * aiPersonas.length)];
    const userKeywords = userInput.toLowerCase().split(' ');
    
    // AI-powered skill generation based on user input
    const relevantSkills = selectedPersona.skills.filter(skill => 
      userKeywords.some(keyword => skill.toLowerCase().includes(keyword))
    );
    
    const generatedProfile = {
      name: `${selectedPersona.name} ${Math.floor(Math.random() * 1000)}`,
      bio: selectedPersona.bio,
      skillsOffered: [...relevantSkills, ...selectedPersona.skills.slice(0, 2)],
      skillsWanted: aiPersonas[Math.floor(Math.random() * aiPersonas.length)].skills.slice(0, 3),
      availability: ["Weekends", "Evenings"],
      isPublic: true,
      style: selectedPersona.style,
      aiGenerated: true
    };
    
    setGeneratedProfiles(prev => [generatedProfile, ...prev.slice(0, 2)]);
    setIsGenerating(false);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6 rounded-2xl shadow-2xl border border-purple-500/20">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Brain className="w-8 h-8 text-purple-400 animate-pulse" />
          <h3 className="text-2xl font-bold text-white">AI Profile Generator</h3>
          <Sparkles className="w-8 h-8 text-yellow-400 animate-bounce" />
        </div>
        <p className="text-purple-200">Let AI create your perfect profile persona!</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-purple-200 mb-2">
            Describe your interests or skills
          </label>
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="e.g., I love coding, design, AI, remote work, data analysis..."
            className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows={3}
          />
        </div>

        <button
          onClick={generateProfile}
          disabled={isGenerating || !userInput.trim()}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>AI is thinking...</span>
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5" />
              <span>Generate AI Profile</span>
            </>
          )}
        </button>
      </div>

      {generatedProfiles.length > 0 && (
        <div className="mt-6 space-y-4">
          <h4 className="text-lg font-semibold text-white text-center">Generated Profiles</h4>
          {generatedProfiles.map((profile, index) => (
            <div key={index} className={`${profile.style} p-4 rounded-lg text-white shadow-lg transform hover:scale-105 transition-all duration-300`}>
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-bold text-lg">{profile.name}</h5>
                <Zap className="w-5 h-5 text-yellow-300" />
              </div>
              <p className="text-sm opacity-90 mb-3">{profile.bio}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {profile.skillsOffered.slice(0, 3).map((skill, i) => (
                  <span key={i} className="px-2 py-1 bg-white/20 rounded-full text-xs">
                    {skill}
                  </span>
                ))}
              </div>
              <button
                onClick={() => onGenerateProfile(profile)}
                className="w-full px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
              >
                Use This Profile
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AIProfileGenerator; 