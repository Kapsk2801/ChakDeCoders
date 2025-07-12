import React, { useEffect, useState } from 'react';
import { requestAPI, tokenManager } from '../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RequestsDashboard = ({ currentUser }) => {
  const [activeTab, setActiveTab] = useState('received');
  const [received, setReceived] = useState([]);
  const [sent, setSent] = useState([]);
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

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
              className="border rounded-2xl p-6 bg-gradient-to-br from-white via-gray-50 to-blue-50 shadow-md flex flex-col md:flex-row items-center gap-6 transition-transform duration-200 hover:scale-[1.015] hover:shadow-lg group"
            >
              {/* Avatar */}
              <div className="flex-shrink-0">
                {otherUser?.avatar ? (
                  <img src={otherUser.avatar} alt={otherUser.name} className="w-16 h-16 rounded-full object-cover border-2 border-blue-200 group-hover:border-blue-400 transition-all" />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-2xl border-2 border-blue-100 group-hover:border-blue-400 transition-all">
                    {otherUser?.name?.[0] || '?'}
                  </div>
                )}
              </div>
              {/* Info */}
              <div className="flex-1 min-w-0 w-full">
                <div className="flex flex-col md:flex-row md:items-center md:gap-3 gap-1">
                  <span className="font-semibold text-xl truncate">{otherUser?.name || 'Unknown User'}</span>
                  <span className="text-xs text-gray-500">({direction})</span>
                  <span className={`ml-0 md:ml-2 px-2 py-1 rounded-full border text-xs font-semibold ${statusColors[req.status] || 'bg-gray-100 text-gray-700 border-gray-300'}`}>{req.status.charAt(0).toUpperCase() + req.status.slice(1)}</span>
                </div>
                <div className="text-sm text-gray-600 truncate">{otherUser?.email}</div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Skills Offered: {req.skillsOffered?.join(', ') || '-'}</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">Skills Wanted: {req.skillsWanted?.join(', ') || '-'}</span>
                </div>
                {req.scheduledTime && (
                  <div className="text-xs text-purple-700 mt-1 font-medium flex items-center gap-1">
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
              {/* Actions */}
              <div className="flex flex-col gap-2 mt-4 md:mt-0 md:ml-4 w-full md:w-auto">
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
    <div className="max-w-3xl mx-auto p-4">
      <ToastContainer position="top-right" autoClose={2500} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss pauseOnHover />
      <h1 className="text-2xl font-bold mb-4">Skill Swap Requests</h1>
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${activeTab === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('all')}
        >
          All
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'received' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('received')}
        >
          Received
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'sent' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('sent')}
        >
          Sent
        </button>
      </div>
      <div>
        {activeTab === 'all'
          ? renderRequests(all, 'all')
          : activeTab === 'received'
            ? renderRequests(received, 'received')
            : renderRequests(sent, 'sent')}
      </div>
    </div>
  );
};

export default RequestsDashboard; 