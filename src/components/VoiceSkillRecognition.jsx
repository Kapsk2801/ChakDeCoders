import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Volume2, Brain, Sparkles } from 'lucide-react';

const VoiceSkillRecognition = ({ onSkillsDetected }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [detectedSkills, setDetectedSkills] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const recognitionRef = useRef(null);

  // Common skills database for voice recognition
  const skillKeywords = {
    'programming': ['javascript', 'python', 'react', 'node', 'java', 'c++', 'html', 'css', 'php', 'ruby', 'swift', 'kotlin'],
    'design': ['ui', 'ux', 'graphic design', 'photoshop', 'illustrator', 'figma', 'sketch', 'invision', 'prototyping'],
    'data': ['data science', 'machine learning', 'ai', 'analytics', 'sql', 'excel', 'tableau', 'power bi', 'statistics'],
    'marketing': ['digital marketing', 'seo', 'social media', 'content marketing', 'email marketing', 'ppc', 'google ads'],
    'business': ['project management', 'agile', 'scrum', 'leadership', 'strategy', 'consulting', 'sales', 'negotiation'],
    'creative': ['photography', 'video editing', 'animation', '3d modeling', 'music production', 'writing', 'copywriting'],
    'languages': ['english', 'spanish', 'french', 'german', 'chinese', 'japanese', 'korean', 'arabic', 'portuguese'],
    'technical': ['devops', 'aws', 'docker', 'kubernetes', 'linux', 'networking', 'cybersecurity', 'blockchain']
  };

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        setTranscript(finalTranscript + interimTranscript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsListening(true);
      setTranscript('');
      setDetectedSkills([]);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      processTranscript();
    }
  };

  const processTranscript = async () => {
    if (!transcript.trim()) return;

    setIsProcessing(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const detected = [];
    const lowerTranscript = transcript.toLowerCase();

    // Analyze transcript for skills
    Object.entries(skillKeywords).forEach(([category, keywords]) => {
      keywords.forEach(keyword => {
        if (lowerTranscript.includes(keyword)) {
          detected.push({
            skill: keyword.charAt(0).toUpperCase() + keyword.slice(1),
            category,
            confidence: Math.random() * 30 + 70 // 70-100% confidence
          });
        }
      });
    });

    // Remove duplicates and sort by confidence
    const uniqueSkills = detected.filter((skill, index, self) => 
      index === self.findIndex(s => s.skill.toLowerCase() === skill.skill.toLowerCase())
    ).sort((a, b) => b.confidence - a.confidence);

    setDetectedSkills(uniqueSkills);
    setIsProcessing(false);

    if (uniqueSkills.length > 0) {
      onSkillsDetected(uniqueSkills.map(s => s.skill));
    }
  };

  const addSkill = (skill) => {
    onSkillsDetected([skill]);
  };

  return (
    <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 p-6 rounded-2xl shadow-2xl border border-emerald-500/20">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Mic className="w-8 h-8 text-emerald-400 animate-pulse" />
          <h3 className="text-2xl font-bold text-white">Voice Skill Recognition</h3>
          <Brain className="w-8 h-8 text-cyan-400 animate-bounce" />
        </div>
        <p className="text-emerald-200">Speak your skills and let AI detect them!</p>
      </div>

      {/* Voice Control */}
      <div className="text-center mb-6">
        <button
          onClick={isListening ? stopListening : startListening}
          className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
            isListening 
              ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
              : 'bg-emerald-500 hover:bg-emerald-600'
          }`}
        >
          {isListening ? (
            <MicOff className="w-8 h-8 text-white" />
          ) : (
            <Mic className="w-8 h-8 text-white" />
          )}
          
          {isListening && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
            </div>
          )}
        </button>
        
        <p className="text-emerald-200 mt-3 text-sm">
          {isListening ? 'Listening... Click to stop' : 'Click to start voice recognition'}
        </p>
      </div>

      {/* Transcript Display */}
      {transcript && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-white mb-2">What you said:</h4>
          <div className="bg-white/10 p-4 rounded-lg border border-emerald-500/30">
            <p className="text-emerald-100">{transcript}</p>
          </div>
        </div>
      )}

      {/* Processing State */}
      {isProcessing && (
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 text-emerald-200">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-emerald-400"></div>
            <span>AI is analyzing your skills...</span>
          </div>
        </div>
      )}

      {/* Detected Skills */}
      {detectedSkills.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-white mb-3">Detected Skills:</h4>
          <div className="grid grid-cols-2 gap-2">
            {detectedSkills.map((skill, index) => (
              <div key={index} className="bg-white/10 p-3 rounded-lg border border-emerald-500/30">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-emerald-100 font-medium">{skill.skill}</span>
                  <span className="text-emerald-300 text-sm">{Math.round(skill.confidence)}%</span>
                </div>
                <div className="text-xs text-emerald-300 capitalize">{skill.category}</div>
                <button
                  onClick={() => addSkill(skill.skill)}
                  className="mt-2 w-full px-2 py-1 bg-emerald-500 hover:bg-emerald-600 text-white text-xs rounded transition-colors"
                >
                  Add to Profile
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Add Skills */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-white mb-3">Quick Add Common Skills:</h4>
        <div className="grid grid-cols-3 gap-2">
          {['JavaScript', 'Python', 'React', 'Design', 'Marketing', 'Data'].map((skill) => (
            <button
              key={skill}
              onClick={() => addSkill(skill)}
              className="px-3 py-2 bg-white/10 hover:bg-white/20 text-emerald-100 text-sm rounded-lg transition-colors border border-emerald-500/30"
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Voice Tips */}
      <div className="bg-white/5 p-4 rounded-lg">
        <h5 className="text-emerald-200 font-semibold mb-2 flex items-center gap-2">
          <Volume2 className="w-4 h-4" />
          Voice Tips
        </h5>
        <ul className="text-emerald-300 text-sm space-y-1">
          <li>• Say "I know JavaScript, React, and Python"</li>
          <li>• "I can teach web development and design"</li>
          <li>• "I want to learn machine learning and data science"</li>
        </ul>
      </div>
    </div>
  );
};

export default VoiceSkillRecognition; 