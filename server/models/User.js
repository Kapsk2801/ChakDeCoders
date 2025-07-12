import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  skillsOffered: [{
    type: String,
    trim: true
  }],
  skillsWanted: [{
    type: String,
    trim: true
  }],
  bio: {
    type: String,
    trim: true,
    maxlength: 500
  },
  avatar: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    trim: true,
    default: ''
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  availability: {
    type: String,
    enum: ['Weekends', 'Evenings', 'Weekdays', 'Flexible'],
    default: 'Flexible'
  },
  isPublic: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Create index for email for faster queries
userSchema.index({ email: 1 });

const User = mongoose.model('User', userSchema);

export default User; 