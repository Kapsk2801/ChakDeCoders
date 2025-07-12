import { useState } from 'react';
import { X, Plus } from 'lucide-react';

const SkillTagInput = ({ 
  skills, 
  onSkillsChange, 
  placeholder = "Add a skill...",
  label = "Skills",
  maxSkills = 10 
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
            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
          >
            {skill}
            <button
              type="button"
              onClick={() => handleRemoveSkill(skill)}
              className="text-blue-600 hover:text-blue-800"
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
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="button"
            onClick={handleAddSkill}
            disabled={!inputValue.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
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
    </div>
  );
};

export default SkillTagInput; 