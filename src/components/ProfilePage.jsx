import { useState, useEffect } from 'react';
import { Camera, Save, ArrowLeft, Sparkles, Zap } from 'lucide-react';
import SkillTagInput from './SkillTagInput';
import AvailabilityCheckboxes from './AvailabilityCheckboxes';
import VisibilityToggle from './VisibilityToggle';
import AIProfileGenerator from './AIProfileGenerator';
import VoiceSkillRecognition from './VoiceSkillRecognition';
import ARSkillPreview from './ARSkillPreview';
import SkillMatchVisualizer from './SkillMatchVisualizer';
import { defaultUserProfile } from '../types';

const ProfilePage = ({ currentUser, onBack, onSave }) => {
  const [profile, setProfile] = useState(defaultUserProfile);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [showAITools, setShowAITools] = useState(false);
  const [allUsers] = useState([
    // Mock users for skill matching
    {
      id: 1,
      name: "Sarah Chen",
      skillsOffered: ["React", "JavaScript", "UI/UX Design"],
      skillsWanted: ["Python", "Machine Learning"],
      isPublic: true
    },
    {
      id: 2,
      name: "Marcus Johnson",
      skillsOffered: ["Python", "Data Science", "Machine Learning"],
      skillsWanted: ["React", "Frontend Development"],
      isPublic: true
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      skillsOffered: ["Graphic Design", "Adobe Creative Suite", "Branding"],
      skillsWanted: ["Web Development", "CSS"],
      isPublic: true
    }
  ]);

  useEffect(() => {
    if (currentUser) {
      setProfile({
        ...defaultUserProfile,
        ...currentUser,
        availability: currentUser.availability ? [currentUser.availability] : []
      });
      setImagePreview(currentUser.profilePhoto);
    }
  }, [currentUser]);

  const handleInputChange = (field, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        // In a real app, you would upload to Firebase/Cloudinary here
        handleInputChange('profilePhoto', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Validate required fields
      if (!profile.name.trim()) {
        alert('Name is required');
        return;
      }
      
      if (profile.availability.length === 0) {
        alert('Please select at least one availability option');
        return;
      }

      // In a real app, you would save to your backend here
      const updatedProfile = {
        ...profile,
        availability: profile.availability.join(', ') // Convert array to string for compatibility
      };
      
      await onSave(updatedProfile);
      alert('Profile saved successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Error saving profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAIGeneratedProfile = (aiProfile) => {
    setProfile(prev => ({
      ...prev,
      ...aiProfile,
      availability: aiProfile.availability || prev.availability
    }));
    setShowAITools(false);
  };

  const handleVoiceSkillsDetected = (skills) => {
    setProfile(prev => ({
      ...prev,
      skillsOffered: [...new Set([...prev.skillsOffered, ...skills])]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 pt-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-800 mr-4"
          >
            <ArrowLeft size={20} />
            <span className="ml-1">Back</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            {currentUser ? 'Edit Profile' : 'Create Profile'}
          </h1>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Photo */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Profile Photo
            </label>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src={imagePreview || "https://via.placeholder.com/100x100?text=Photo"}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                />
                <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full cursor-pointer hover:bg-blue-700">
                  <Camera size={16} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  Click the camera icon to upload a new photo
                </p>
                <p className="text-xs text-gray-500">
                  Recommended size: 200x200 pixels
                </p>
              </div>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name *
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              value={profile.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your location (optional)"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              value={profile.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              rows={3}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Tell others about yourself..."
            />
          </div>

          {/* Skills Offered */}
          <SkillTagInput
            skills={profile.skillsOffered}
            onSkillsChange={(skills) => handleInputChange('skillsOffered', skills)}
            placeholder="Add a skill you can teach..."
            label="Skills I Can Teach"
          />

          {/* Skills Wanted */}
          <SkillTagInput
            skills={profile.skillsWanted}
            onSkillsChange={(skills) => handleInputChange('skillsWanted', skills)}
            placeholder="Add a skill you want to learn..."
            label="Skills I Want to Learn"
          />

          {/* Availability */}
          <AvailabilityCheckboxes
            selectedAvailability={profile.availability}
            onAvailabilityChange={(availability) => handleInputChange('availability', availability)}
          />

          {/* Visibility Toggle */}
          <VisibilityToggle
            isPublic={profile.isPublic}
            onToggle={() => handleInputChange('isPublic', !profile.isPublic)}
          />

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </div>
              ) : (
                <div className="flex items-center">
                  <Save size={16} className="mr-2" />
                  Save Profile
                </div>
              )}
            </button>
          </div>
        </form>

        {/* AI Tools Section */}
        <div className="mt-12">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
              <h2 className="text-2xl font-bold text-gray-900">AI-Powered Tools</h2>
              <Zap className="w-8 h-8 text-yellow-400 animate-bounce" />
            </div>
            <p className="text-gray-600">Experience the future of profile creation!</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* AI Profile Generator */}
            <AIProfileGenerator onGenerateProfile={handleAIGeneratedProfile} />

            {/* Voice Skill Recognition */}
            <VoiceSkillRecognition onSkillsDetected={handleVoiceSkillsDetected} />

            {/* AR Skill Preview */}
            <ARSkillPreview 
              skills={[...profile.skillsOffered, ...profile.skillsWanted]} 
              user={profile}
            />

            {/* Skill Match Visualizer */}
            <SkillMatchVisualizer 
              currentUser={profile} 
              allUsers={allUsers}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 