import React, { useEffect, useState } from 'react';
import { requestAPI, tokenManager } from '../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RequestsDashboard = ({ currentUser }) => {
  const [activeTab, setActiveTab] = useState('received');
  const [received, setReceived] = useState([]);
  const [sent, setSent] = useState([]);
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
        } else {
          const data = await requestAPI.getSent(token);
          setSent(data.requests || data || []);
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

  const renderRequests = (requests, type) => {
    if (loading) return <p className="text-gray-500">Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!requests || requests.length === 0) {
      return <p className="text-gray-500">No {type} requests yet.</p>;
    }
    return (
      <ul className="space-y-4">
        {requests.map((req) => (
          <li key={req._id} className="border rounded p-4 bg-white shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold">
                  {type === 'received' ? req.sender?.name : req.recipient?.name}
                </div>
                <div className="text-sm text-gray-600">
                  {type === 'received' ? 'From' : 'To'}: {type === 'received' ? req.sender?.email : req.recipient?.email}
                </div>
                <div className="text-sm mt-1">
                  <span className="font-medium">Skills Offered:</span> {req.skillsOffered?.join(', ') || '-'}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Skills Wanted:</span> {req.skillsWanted?.join(', ') || '-'}
                </div>
                <div className="text-sm mt-1">
                  <span className="font-medium">Status:</span> {req.status}
                </div>
                {req.meetLink && req.status === 'accepted' && (
                  <div className="text-sm mt-1">
                    <span className="font-medium">Meet Link:</span> <a href={req.meetLink} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Join</a>
                  </div>
                )}
              </div>
              {/* Actions (accept/reject) for received requests */}
              {type === 'received' && req.status === 'pending' && (
                <div className="flex flex-col gap-2 ml-4">
                  <button
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-60"
                    onClick={() => handleAccept(req._id)}
                    disabled={!!actionLoading}
                  >
                    {actionLoading === req._id + '-accept' ? 'Accepting...' : 'Accept'}
                  </button>
                  <button
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-60"
                    onClick={() => handleReject(req._id)}
                    disabled={!!actionLoading}
                  >
                    {actionLoading === req._id + '-reject' ? 'Rejecting...' : 'Reject'}
                  </button>
                </div>
              )}
              {/* Cancel for sent requests */}
              {type === 'sent' && req.status === 'pending' && (
                <button
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-60 ml-4"
                  onClick={() => handleCancel(req._id)}
                  disabled={!!actionLoading}
                >
                  {actionLoading === req._id + '-cancel' ? 'Cancelling...' : 'Cancel'}
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <ToastContainer position="top-right" autoClose={2500} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss pauseOnHover />
      <h1 className="text-2xl font-bold mb-4">Skill Swap Requests</h1>
      <div className="flex space-x-4 mb-6">
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
        {activeTab === 'received'
          ? renderRequests(received, 'received')
          : renderRequests(sent, 'sent')}
      </div>
    </div>
  );
};

export default RequestsDashboard; 