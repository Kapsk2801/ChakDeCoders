import express from 'express';
import User from '../models/User.js';
import { protect, optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Get all public users for skill exchange
// @route   GET /api/users
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { search, availability, page = 1, limit = 12 } = req.query;
    
    // Build query
    let query = { isPublic: true };
    
    // Search filter
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { name: searchRegex },
        { skillsOffered: { $in: [searchRegex] } },
        { skillsWanted: { $in: [searchRegex] } }
      ];
    }
    
    // Availability filter
    if (availability && availability !== 'All') {
      query.availability = availability;
    }
    
    // Pagination
    const skip = (page - 1) * limit;
    
    // Execute query
    const users = await User.find(query)
      .select('-password -email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    // Get total count for pagination
    const total = await User.countDocuments(query);
    
    res.json({
      users,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalUsers: total,
        usersPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password -email');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
router.put('/profile', protect, async (req, res) => {
  try {
    const {
      name,
      skillsOffered,
      skillsWanted,
      bio,
      location,
      availability,
      isPublic,
      avatar
    } = req.body;
    
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        name,
        skillsOffered,
        skillsWanted,
        bio,
        location,
        availability,
        isPublic,
        avatar
      },
      { new: true, runValidators: true }
    ).select('-password');
    
    res.json(updatedUser);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get current user's profile
// @route   GET /api/users/profile/me
// @access  Private
router.get('/profile/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 