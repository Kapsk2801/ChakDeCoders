import { useState, useEffect } from 'react';
import { Brain, Sparkles, Target, Users, Star, Zap } from 'lucide-react';

const AIMatchingSystem = ({ currentUser, allUsers }) => {
  const [matches, setMatches] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    skillMatch: true,
    availability: true,
    location: false,
    rating: true
  });

  useEffect(() => {
    if (currentUser && allUsers) {
      analyzeMatches();
    }
  }, [currentUser, allUsers, selectedFilters]);

  const analyzeMatches = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const analyzedMatches = allUsers
      .filter(user => user.id !== currentUser?.id && user.isPublic)
      .map(user => {
        // Calculate skill compatibility
        const offeredMatches = currentUser?.skillsWanted?.filter(skill => 
          user.skillsOffered?.includes(skill)
        ) || [];
        
        const wantedMatches = currentUser?.skillsOffered?.filter(skill => 
          user.skillsWanted?.includes(skill)
        ) || [];

        const totalSkills = (currentUser?.skillsOffered?.length || 0) + (currentUser?.skillsWanted?.length || 0);
        const skillMatchScore = totalSkills > 0 ? ((offeredMatches.length + wantedMatches.length) / totalSkills) * 100 : 0;

        // Calculate availability match
        const availabilityMatch = currentUser?.availability && user.availability ? 
          (currentUser.availability.includes(user.availability) ? 100 : 0) : 50;

        // Calculate overall compatibility
        const compatibilityScore = Math.round(
          (skillMatchScore * 0.6) + 
          (availabilityMatch * 0.3) + 
          (user.rating * 10 * 0.1)
        );

        return {
          user,
          offeredMatches,
          wantedMatches,
          skillMatchScore: Math.round(skillMatchScore),
          availabilityMatch: Math.round(availabilityMatch),
          compatibilityScore,
          matchType: compatibilityScore > 80 ? 'Perfect Match' : 
                    compatibilityScore > 60 ? 'Great Match' : 
                    compatibilityScore > 40 ? 'Good Match' : 'Potential Match'
        };
      })
      .filter(match => match.compatibilityScore > 20)
      .sort((a, b) => b.compatibilityScore - a.compatibilityScore)
      .slice(0, 6);

    setMatches(analyzedMatches);
    setIsAnalyzing(false);
  };

  const getMatchColor = (score) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-blue-400';
    if (score >= 40) return 'text-yellow-400';
    return 'text-gray-400';
  };

  const getMatchBadge = (type) => {
    const colors = {
      'Perfect Match': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Great Match': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Good Match': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Potential Match': 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    };
    return colors[type] || colors['Potential Match'];
  };

  return (
    <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-cyan-900 p-6 rounded-2xl shadow-2xl border border-purple-500/20">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Brain className="w-8 h-8 text-purple-400 animate-pulse" />
          <h3 className="text-2xl font-bold text-white">AI-Powered Matching</h3>
          <Sparkles className="w-8 h-8 text-yellow-400 animate-bounce" />
        </div>
        <p className="text-purple-200">Advanced algorithms find your perfect skill exchange partners</p>
      </div>

      {/* Filter Controls */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-white mb-3">Matching Preferences:</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(selectedFilters).map(([key, value]) => (
            <label key={key} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => setSelectedFilters(prev => ({
                  ...prev,
                  [key]: e.target.checked
                }))}
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <span className="text-sm text-gray-300 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Analysis Status */}
      {isAnalyzing && (
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 text-purple-200">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-400"></div>
            <span>AI is analyzing compatibility...</span>
          </div>
        </div>
      )}

      {/* Matches Display */}
      {matches.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white text-center mb-4">
            Top AI Matches ({matches.length})
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {matches.map((match, index) => (
              <div key={match.user.id} className="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-purple-500/30 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={match.user.profilePhoto}
                      alt={match.user.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h5 className="font-semibold text-white">{match.user.name}</h5>
                      <span className={`text-xs px-2 py-1 rounded-full border ${getMatchBadge(match.matchType)}`}>
                        {match.matchType}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getMatchColor(match.compatibilityScore)}`}>
                      {match.compatibilityScore}%
                    </div>
                    <div className="text-xs text-gray-400">Match</div>
                  </div>
                </div>

                {/* Skill Matches */}
                <div className="mb-3">
                  <div className="text-sm text-gray-300 mb-2">Skill Compatibility:</div>
                  <div className="flex flex-wrap gap-1">
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

                {/* Match Details */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="text-gray-400">
                    Skills: <span className="text-white">{match.skillMatchScore}%</span>
                  </div>
                  <div className="text-gray-400">
                    Availability: <span className="text-white">{match.availabilityMatch}%</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded transition-colors">
                    Connect
                  </button>
                  <button className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded transition-colors">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Matches */}
      {!isAnalyzing && matches.length === 0 && (
        <div className="text-center py-8">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-400">No matches found. Try adjusting your preferences or skills.</p>
        </div>
      )}

      {/* AI Insights */}
      {matches.length > 0 && (
        <div className="mt-6 bg-white/5 p-4 rounded-lg">
          <h5 className="text-purple-200 font-semibold mb-2 flex items-center gap-2">
            <Target className="w-4 h-4" />
            AI Insights
          </h5>
          <ul className="text-purple-300 text-sm space-y-1">
            <li>• {matches.filter(m => m.compatibilityScore > 80).length} perfect matches found</li>
            <li>• Average compatibility: {Math.round(matches.reduce((acc, m) => acc + m.compatibilityScore, 0) / matches.length)}%</li>
            <li>• Top skill demand: {matches[0]?.offeredMatches[0] || 'N/A'}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AIMatchingSystem; 