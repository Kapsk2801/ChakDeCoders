import { useParams, useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { Star, ArrowLeft, Play, Image as ImageIcon, MessageCircle, X } from 'lucide-react';
import { mockUsers } from '../data/mockUsers';

const mockWorks = [
  {
    type: 'video',
    url: 'https://www.w3schools.com/html/mov_bbb.mp4',
    title: 'React Portfolio Walkthrough',
    thumbnail: 'https://i3.ytimg.com/vi/Ke90Tje7VS0/maxresdefault.jpg',
  },
  {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    title: 'UI/UX Design Sample',
  },
  {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80',
    title: 'Branding Project',
  },
];

const mockFeedback = [
  {
    user: 'Sarah Chen',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5,
    comment: 'Amazing mentor! Helped me master React in no time.',
    date: '2024-05-01',
  },
  {
    user: 'Marcus Johnson',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 4.5,
    comment: 'Great at explaining complex concepts. Highly recommend!',
    date: '2024-04-20',
  },
  {
    user: 'Emily Rodriguez',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    rating: 5,
    comment: 'Very patient and knowledgeable. Would swap again!',
    date: '2024-03-15',
  },
];

const UserProfilePage = ({ currentUser }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useMemo(() => mockUsers.find(u => String(u.id) === String(id)), [id]);

  // Modal state for viewing works
  const [selectedWork, setSelectedWork] = useState(null);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">User not found.</p>
          <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">Go Back</button>
        </div>
      </div>
    );
  }

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />);
    }
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-800 mr-4"
          >
            <ArrowLeft size={20} />
            <span className="ml-1">Back</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{user.name}'s Profile</h1>
        </div>

        {/* Profile Info */}
        <div className="flex flex-col md:flex-row gap-8 mb-10">
          <div className="flex-shrink-0 flex flex-col items-center">
            <img
              src={user.profilePhoto || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face'}
              alt={user.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg mb-3"
            />
            <div className="flex items-center gap-1 mb-1">
              {renderStars(user.rating)}
              <span className="text-gray-600 ml-2 font-medium">{user.rating}/5</span>
            </div>
            <div className="text-gray-500 text-sm mb-2">{user.location}</div>
            <div className="flex flex-wrap gap-2 mb-2">
              {user.skillsOffered.map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium border border-green-200">{skill}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {user.skillsWanted.map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium border border-blue-200">{skill}</span>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">About {user.name}</h2>
            <p className="text-gray-700 mb-4">{user.bio || 'No bio provided yet.'}</p>
            <div className="flex items-center gap-4 mb-2">
              <span className="text-gray-600 text-sm">Availability: <span className="font-medium">{user.availability}</span></span>
            </div>
            <div className="flex items-center gap-4 mb-2">
              <span className="text-gray-600 text-sm">Completed Swaps: <span className="font-medium">{user.completedSwaps || 12}</span></span>
            </div>
          </div>
        </div>

        {/* Works Section */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Play className="w-6 h-6 text-purple-500" />
            Recent Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockWorks.map((work, idx) => (
              <button
                key={idx}
                className="bg-white rounded-xl shadow-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-purple-400"
                onClick={() => setSelectedWork(work)}
                tabIndex={0}
                aria-label={`View ${work.title}`}
              >
                {work.type === 'video' ? (
                  <video poster={work.thumbnail} className="w-full h-48 object-cover pointer-events-none">
                    <source src={work.url} type="video/mp4" />
                  </video>
                ) : (
                  <img src={work.url} alt={work.title} className="w-full h-48 object-cover pointer-events-none" />
                )}
                <div className="p-3 border-t border-gray-100 flex items-center gap-2">
                  {work.type === 'video' ? <Play className="w-4 h-4 text-purple-500" /> : <ImageIcon className="w-4 h-4 text-blue-400" />}
                  <span className="text-gray-700 text-sm font-medium">{work.title}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Feedback Section */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-green-500" />
            Feedback & Comments
          </h2>
          <div className="space-y-4">
            {mockFeedback.map((fb, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow p-4 flex gap-4 items-start">
                <img src={fb.avatar} alt={fb.user} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-800">{fb.user}</span>
                    <span className="text-xs text-gray-400">{fb.date}</span>
                  </div>
                  <div className="flex items-center gap-1 mb-1">
                    {renderStars(fb.rating)}
                    <span className="text-xs text-gray-500">{fb.rating}/5</span>
                  </div>
                  <p className="text-gray-700 text-sm">{fb.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Work Modal */}
      {selectedWork && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="absolute inset-0" onClick={() => setSelectedWork(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 p-6 flex flex-col items-center">
            <button
              className="absolute top-3 right-3 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
              onClick={() => setSelectedWork(null)}
              aria-label="Close preview"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="w-full flex flex-col items-center">
              {selectedWork.type === 'video' ? (
                <video
                  controls
                  autoPlay
                  className="w-full max-h-[60vh] rounded-xl mb-4 shadow-lg"
                  poster={selectedWork.thumbnail}
                >
                  <source src={selectedWork.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={selectedWork.url}
                  alt={selectedWork.title}
                  className="w-full max-h-[60vh] rounded-xl mb-4 object-contain shadow-lg"
                />
              )}
              <div className="flex items-center gap-2 mt-2">
                {selectedWork.type === 'video' ? <Play className="w-5 h-5 text-purple-500" /> : <ImageIcon className="w-5 h-5 text-blue-400" />}
                <span className="text-gray-800 font-semibold text-lg">{selectedWork.title}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage; 