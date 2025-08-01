import React, { useEffect, useState } from 'react';
import { requestAPI, tokenManager } from '../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Star, User, MapPin, Clock } from 'lucide-react';
import ModernNavbar from './ModernNavbar';
import ModernFooter from './ModernFooter';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RequestsDashboard = ({ currentUser, onLogout, onLoginClick, onProfileClick }) => {
  const [activeTab, setActiveTab] = useState('received');
  const [received, setReceived] = useState([]);
  const [sent, setSent] = useState([]);
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      setError(null);
      const token = tokenManager.getToken();
      try {
        if (activeTab === 'received') {
          const data = await requestAPI.getReceived(token);
          setReceived(data.requests || data || []);
        } else if (activeTab === 'sent') {
          const data = await requestAPI.getSent(token);
          setSent(data.requests || data || []);
        } else if (activeTab === 'all') {
          // Fetch both and merge
          const [receivedData, sentData] = await Promise.all([
            requestAPI.getReceived(token),
            requestAPI.getSent(token)
          ]);
          let receivedList = (receivedData.requests || receivedData || []).map(r => ({...r, _type: 'received'}));
          let sentList = (sentData.requests || sentData || []).map(r => ({...r, _type: 'sent'}));
          // Merge and sort by createdAt (descending)
          let merged = [...receivedList, ...sentList].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setAll(merged);
        }
      } catch (err) {
        setError(err.message || 'Failed to load requests');
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [activeTab]);

  const handleAccept = async (requestId) => {
    setActionLoading(requestId + '-accept');
    setError(null);
    const token = tokenManager.getToken();
    try {
      await requestAPI.accept(token, requestId);
      const data = await requestAPI.getReceived(token);
      setReceived(data.requests || data || []);
      toast.success('Request accepted!');
    } catch (err) {
      setError(err.message || 'Failed to accept request');
      toast.error(err.message || 'Failed to accept request');
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (requestId) => {
    setActionLoading(requestId + '-reject');
    setError(null);
    const token = tokenManager.getToken();
    try {
      await requestAPI.reject(token, requestId);
      const data = await requestAPI.getReceived(token);
      setReceived(data.requests || data || []);
      toast.success('Request rejected.');
    } catch (err) {
      setError(err.message || 'Failed to reject request');
      toast.error(err.message || 'Failed to reject request');
    } finally {
      setActionLoading(null);
    }
  };

  const handleCancel = async (requestId) => {
    setActionLoading(requestId + '-cancel');
    setError(null);
    const token = tokenManager.getToken();
    try {
      await requestAPI.reject(token, requestId);
      const data = await requestAPI.getSent(token);
      setSent(data.requests || data || []);
      toast.success('Request cancelled.');
    } catch (err) {
      setError(err.message || 'Failed to cancel request');
      toast.error(err.message || 'Failed to cancel request');
    } finally {
      setActionLoading(null);
    }
  };

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    accepted: 'bg-green-100 text-green-800 border-green-300',
    rejected: 'bg-red-100 text-red-800 border-red-300',
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-3 h-3 fill-yellow-400/50 text-yellow-400" />);
    }
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-3 h-3 text-gray-300" />);
    }
    return stars;
  };

  const renderRequests = (requests, type) => {
    if (loading) return <p className="text-gray-500">Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!requests || requests.length === 0) {
      return <p className="text-gray-500">No {type} requests yet.</p>;
    }
    return (
      <ul className="space-y-6">
        {requests.map((req) => {
          // Determine direction and user info
          let direction, otherUser;
          if (type === 'received' || (type === 'all' && req._type === 'received')) {
            direction = 'From';
            otherUser = req.sender;
          } else {
            direction = 'To';
            otherUser = req.receiver || req.recipient;
          }
          return (
            <li
              key={req._id}
              className="relative group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1 flex flex-col md:flex-row items-center p-6 gap-6"
            >
              {/* Avatar & User Info */}
              <div className="flex items-center space-x-4 flex-shrink-0 w-full md:w-auto">
                {/* Avatar */}
                <div className="relative">
                  {otherUser?.avatar ? (
                    <img src={otherUser.avatar} alt={otherUser.name} className="w-16 h-16 rounded-full object-cover border-3 border-white shadow-md" />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-3 border-white shadow-md flex items-center justify-center">
                      <User className="w-7 h-7 text-white" />
                    </div>
                  )}
                </div>
                {/* User Info */}
                <div className="flex flex-col">
                  <h3 className="text-lg font-bold text-gray-800 mb-1 flex items-center gap-2">
                    {otherUser?.name || 'Unknown User'}
                    <span className={`ml-2 px-2 py-1 rounded-full border text-xs font-semibold ${statusColors[req.status] || 'bg-gray-100 text-gray-700 border-gray-300'}`}>{req.status.charAt(0).toUpperCase() + req.status.slice(1)}</span>
                  </h3>
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    {renderStars(otherUser?.rating || 0)}
                    <span className="text-sm text-gray-600 ml-1">({otherUser?.rating || 0})</span>
                  </div>
                  {/* Location & Availability */}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{otherUser?.location || 'Location'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{otherUser?.availability || 'Flexible'}</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{direction}</div>
                  <div className="text-sm text-gray-600 truncate">{otherUser?.email}</div>
                </div>
              </div>
              {/* Skills Section */}
              <div className="flex-1 ml-0 md:ml-8 w-full md:w-auto">
                <div className="grid grid-cols-2 gap-6">
                  {/* Skills Offered */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Skills Offered
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {req.skillsOffered.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 text-xs rounded-full font-medium border border-green-200"
                        >
                          {skill}
                        </span>
                      ))}
                      {req.skillsOffered.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                          +{req.skillsOffered.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  {/* Skills Wanted */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      Skills Wanted ({req.skillsWanted ? req.skillsWanted.length : 0})
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {req.skillsWanted && req.skillsWanted.length > 0 ? (
                        <>
                          {req.skillsWanted.slice(0, 3).map((skill, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 text-xs rounded-full font-medium border border-blue-200"
                            >
                              {skill}
                            </span>
                          ))}
                          {req.skillsWanted.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                              +{req.skillsWanted.length - 3} more
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full font-medium">
                          No skills wanted
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {req.scheduledTime && (
                  <div className="text-xs text-purple-700 mt-2 font-medium flex items-center gap-1">
                    <span className="inline-block w-2 h-2 bg-purple-400 rounded-full"></span>
                    Scheduled: {new Date(req.scheduledTime).toLocaleString()}
                  </div>
                )}
                {type === 'all' && (
                  <div className="text-xs text-gray-400 mt-1">Type: {req._type.charAt(0).toUpperCase() + req._type.slice(1)}</div>
                )}
                {req.meetLink && (
                  <div className="text-xs text-blue-600 mt-2">
                    <a href={req.meetLink} target="_blank" rel="noopener noreferrer" className="underline font-semibold">Google Meet Link</a>
                  </div>
                )}
              </div>
              {/* Actions Section */}
              <div className="flex flex-col gap-2 mt-4 md:mt-0 md:ml-4 w-full md:w-auto items-end">
                {((type === 'received' || (type === 'all' && req._type === 'received')) && req.status === 'pending') && (
                  <>
                    <button
                      onClick={() => handleAccept(req._id)}
                      disabled={actionLoading === req._id + '-accept'}
                      className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 font-semibold shadow-sm transition-all"
                    >
                      {actionLoading === req._id + '-accept' ? 'Accepting...' : 'Accept'}
                    </button>
                    <button
                      onClick={() => handleReject(req._id)}
                      disabled={actionLoading === req._id + '-reject'}
                      className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 font-semibold shadow-sm transition-all"
                    >
                      {actionLoading === req._id + '-reject' ? 'Rejecting...' : 'Reject'}
                    </button>
                  </>
                )}
                {((type === 'sent' || (type === 'all' && req._type === 'sent')) && req.status === 'pending') && (
                  <button
                    onClick={() => handleCancel(req._id)}
                    disabled={actionLoading === req._id + '-cancel'}
                    className="px-5 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 disabled:opacity-50 font-semibold shadow-sm transition-all"
                  >
                    {actionLoading === req._id + '-cancel' ? 'Cancelling...' : 'Cancel'}
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Navigation */}
      <ModernNavbar 
        currentUser={currentUser}
        onLogout={onLogout}
        onLoginClick={onLoginClick}
        onProfileClick={onProfileClick}
      />
      {/* Main Content */}
      <main id="main-content" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Back to Explore Button */}
        <motion.button
          whileHover={{ scale: 1.05, x: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/explore')}
          className="group flex items-center text-gray-600 hover:text-gray-800 transition-all duration-200 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 hover:shadow-md mb-8"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="ml-2 font-medium">Back to Explore</span>
        </motion.button>
        {/* Page Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Your Skill Swap Requests
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            View, manage, and respond to all your skill exchange requests. Switch between received, sent, and all requests using the tabs below.
          </p>
        </div>
        {/* Tabs */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            className={`px-6 py-2 rounded-full font-semibold shadow-sm transition-all duration-200 border-2 focus:outline-none ${activeTab === 'all' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-700 border-blue-200 hover:bg-blue-50'}`}
            onClick={() => setActiveTab('all')}
          >
            All
          </button>
          <button
            className={`px-6 py-2 rounded-full font-semibold shadow-sm transition-all duration-200 border-2 focus:outline-none ${activeTab === 'received' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-700 border-blue-200 hover:bg-blue-50'}`}
            onClick={() => setActiveTab('received')}
          >
            Received
          </button>
          <button
            className={`px-6 py-2 rounded-full font-semibold shadow-sm transition-all duration-200 border-2 focus:outline-none ${activeTab === 'sent' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-700 border-blue-200 hover:bg-blue-50'}`}
            onClick={() => setActiveTab('sent')}
          >
            Sent
          </button>
        </div>
        {/* Request List */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 border border-gray-100">
          {activeTab === 'all'
            ? renderRequests(all, 'all')
            : activeTab === 'received'
              ? renderRequests(received, 'received')
              : renderRequests(sent, 'sent')}
        </div>
      </main>
      <ModernFooter />
    </div>
  );
};

export default RequestsDashboard; 