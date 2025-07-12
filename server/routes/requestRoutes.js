import express from 'express';
import Request from '../models/Request.js';
import User from '../models/User.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create a new request
router.post('/', protect, async (req, res) => {
  try {
    const { receiverId, skillsOffered, skillsWanted, message, scheduledTime } = req.body;
    const receiver = await User.findById(receiverId);
    if (!receiver) return res.status(404).json({ message: 'Receiver not found' });

    const request = await Request.create({
      sender: req.user._id,
      receiver: receiverId,
      skillsOffered,
      skillsWanted,
      message,
      scheduledTime,
      status: 'pending',
    });
    res.status(201).json(request);
  } catch (err) {
    console.error('Create request error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get sent requests
router.get('/sent', protect, async (req, res) => {
  try {
    const requests = await Request.find({ sender: req.user._id })
      .populate('receiver', 'name avatar email')
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get received requests
router.get('/received', protect, async (req, res) => {
  try {
    const requests = await Request.find({ receiver: req.user._id })
      .populate('sender', 'name avatar email')
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Accept a request
router.post('/:id/accept', protect, async (req, res) => {
  try {
    const request = await Request.findById(req.params.id).populate('sender receiver');
    if (!request) return res.status(404).json({ message: 'Request not found' });
    if (String(request.receiver._id) !== String(req.user._id)) return res.status(403).json({ message: 'Not authorized' });
    if (request.status !== 'pending') return res.status(400).json({ message: 'Request already processed' });

    // TODO: Integrate Google Meet API here
    const meetLink = 'https://meet.google.com/' + Math.random().toString(36).substring(2, 9);
    request.status = 'accepted';
    request.meetLink = meetLink;
    await request.save();

    // TODO: Send email to both users with meetLink

    res.json({ message: 'Request accepted', meetLink });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Reject a request
router.post('/:id/reject', protect, async (req, res) => {
  try {
    const request = await Request.findById(req.params.id).populate('sender receiver');
    if (!request) return res.status(404).json({ message: 'Request not found' });
    if (String(request.receiver._id) !== String(req.user._id)) return res.status(403).json({ message: 'Not authorized' });
    if (request.status !== 'pending') return res.status(400).json({ message: 'Request already processed' });

    request.status = 'rejected';
    await request.save();

    // TODO: Notify sender of rejection (email or notification)

    res.json({ message: 'Request rejected' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 