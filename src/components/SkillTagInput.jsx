import { useState } from 'react';
import { X, Plus, AlertCircle } from 'lucide-react';

const SkillTagInput = ({ 
  skills, 
  onSkillsChange, 
  placeholder = "Add a skill...",
  label = "Skills",
  maxSkills = 10,
  error = null
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleAddSkill = () => {
    const skill = inputValue.trim();
    if (skill && !skills.includes(skill) && skills.length < maxSkills) {
      onSkillsChange([...skills, skill]);
      setInputValue('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    onSkillsChange(skills.filter(skill => skill !== skillToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      
      <div className="flex flex-wrap gap-2 mb-3">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full border border-purple-200"
          >
            {skill}
            <button
              type="button"
              onClick={() => handleRemoveSkill(skill)}
              className="text-purple-600 hover:text-purple-800 transition-colors"
            >
              <X size={14} />
            </button>
          </span>
        ))}
      </div>

      {skills.length < maxSkills && (
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className={`flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
              error ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          <button
            type="button"
            onClick={handleAddSkill}
            disabled={!inputValue.trim()}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-md hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 transition-all duration-200"
          >
            <Plus size={16} />
            Add
          </button>
        </div>
      )}

      {skills.length >= maxSkills && (
        <p className="text-sm text-gray-500">
          Maximum {maxSkills} skills reached
        </p>
      )}

      {error && (
        <p className="text-red-500 text-sm flex items-center">
          <AlertCircle className="w-4 h-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  );
};

export default SkillTagInput; 