import { useEffect, useState } from 'react';
import UserCard from '../components/UserCard';
import { mockUsers } from '../data/mockUsers';
import { userAPI } from '../services/api';

const getFavourites = () => {
  try {
    return JSON.parse(localStorage.getItem('favourite_user_ids') || '[]');
  } catch {
    return [];
  }
};

const FavouritesPage = ({ currentUser, onRequestClick, isLoggedIn }) => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadFavourites = async () => {
    setLoading(true);
    setError('');
    const favIds = getFavourites();
    try {
      // Try to fetch all users from backend
      const data = await userAPI.getUsers({ limit: 1000 }); // Large limit to get all
      const allUsers = data.users || [];
      const favUsers = allUsers.filter(u => favIds.includes(u._id || u.id));
      setFavourites(favUsers);
    } catch (err) {
      // Fallback to mockUsers if API fails
      const favUsers = mockUsers.filter(u => favIds.includes(u.id));
      setFavourites(favUsers);
      setError('Could not load all users from server. Showing demo users.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavourites();
    const handleStorage = () => {
      loadFavourites();
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 pt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Favourites</h1>
        {error && (
          <div className="text-center text-red-500 mb-4">{error}</div>
        )}
        {loading ? (
          <div className="text-center text-gray-400 py-16 text-lg">Loading favourites...</div>
        ) : favourites.length === 0 ? (
          <div className="text-center text-gray-500 py-16 text-lg">You have no favourite users yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favourites.map(user => (
              <UserCard
                key={user._id || user.id}
                user={user}
                onRequestClick={onRequestClick}
                isLoggedIn={isLoggedIn}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavouritesPage; 