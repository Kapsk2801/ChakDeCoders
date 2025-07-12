import { useState } from 'react';
import { authAPI } from '../services/api';

const BulkUserCreator = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const mockUsers = [
    {
      name: "Sarah Chen",
      email: "sarah.chen@example.com",
      password: "password123",
      skills: ["React", "JavaScript", "UI/UX Design"],
      bio: "Frontend developer passionate about creating beautiful user experiences. Always eager to learn new technologies!"
    },
    {
      name: "Marcus Johnson",
      email: "marcus.johnson@example.com",
      password: "password123",
      skills: ["Python", "Data Science", "Machine Learning"],
      bio: "Data scientist with expertise in machine learning and AI. Looking to expand my frontend skills!"
    },
    {
      name: "Emily Rodriguez",
      email: "emily.rodriguez@example.com",
      password: "password123",
      skills: ["Graphic Design", "Adobe Creative Suite", "Branding"],
      bio: "Creative designer with a passion for branding and visual communication. Eager to learn web development!"
    },
    {
      name: "David Kim",
      email: "david.kim@example.com",
      password: "password123",
      skills: ["Node.js", "Backend Development", "Database Design"],
      bio: "Backend developer specializing in Node.js and database architecture. Looking to learn cloud technologies."
    },
    {
      name: "Lisa Thompson",
      email: "lisa.thompson@example.com",
      password: "password123",
      skills: ["Digital Marketing", "SEO", "Content Strategy"],
      bio: "Marketing professional with expertise in digital campaigns and SEO. Want to learn data analytics!"
    },
    {
      name: "Alex Rivera",
      email: "alex.rivera@example.com",
      password: "password123",
      skills: ["iOS Development", "Swift", "Mobile UI"],
      bio: "iOS developer passionate about creating intuitive mobile experiences. Looking to expand to Android!"
    }
  ];

  const createUsers = async () => {
    setLoading(true);
    setMessage('');
    
    try {
      let successCount = 0;
      let errorCount = 0;
      
      for (const user of mockUsers) {
        try {
          await authAPI.signup(user);
          successCount++;
          setMessage(`Created ${successCount} users successfully...`);
        } catch (error) {
          errorCount++;
          console.error(`Failed to create ${user.name}:`, error);
        }
      }
      
      setMessage(`✅ Created ${successCount} users successfully! ${errorCount > 0 ? `${errorCount} failed.` : ''}`);
    } catch (error) {
      setMessage('❌ Error creating users. Check console for details.');
      console.error('Bulk creation error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-bold mb-4">Create Sample Users</h2>
        
        <p className="text-gray-600 mb-4">
          This will create 6 sample users in your database. Each user will have:
        </p>
        
        <ul className="text-sm text-gray-600 mb-6 space-y-1">
          <li>• Unique email and password</li>
          <li>• Skills they can offer</li>
          <li>• Bio and profile information</li>
          <li>• Public profile for skill exchange</li>
        </ul>

        {message && (
          <div className={`p-3 rounded-lg mb-4 ${
            message.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={createUsers}
            disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            {loading ? 'Creating...' : 'Create Users'}
          </button>
          
          <button
            onClick={onClose}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkUserCreator; 