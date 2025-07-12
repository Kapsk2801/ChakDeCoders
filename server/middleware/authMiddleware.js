import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { google } from 'googleapis';
import fs from 'fs';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const protect = async (req, res, next) => {
  let token;

  // Check for token in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET);

      // Get user from token
      const user = await User.findById(decoded.userId).select('-password');
      
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      // Attach user to request
      req.user = user;
      next();
    } catch (error) {
      console.error('Token verification error:', error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Optional middleware - doesn't fail if no token
export const optionalAuth = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(decoded.userId).select('-password');
      
      if (user) {
        req.user = user;
      }
    } catch (error) {
      // Silently fail for optional auth
      console.log('Optional auth failed:', error.message);
    }
  }

  next();
}; 

// Load your service account credentials
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const GOOGLE_CREDENTIALS_PATH = './path/to/your-service-account.json'; // update this path

const calendar = google.calendar('v3');

export async function createGoogleMeet(scheduledTime, summary = 'Skill Swap Meeting') {
  const auth = new google.auth.GoogleAuth({
    keyFile: GOOGLE_CREDENTIALS_PATH,
    scopes: SCOPES,
  });

  const authClient = await auth.getClient();

  const CALENDAR_ID = 'lokeshvyas.prof@gmail.com';

  const event = {
    summary,
    start: {
      dateTime: new Date(scheduledTime).toISOString(),
      timeZone: 'UTC',
    },
    end: {
      dateTime: new Date(new Date(scheduledTime).getTime() + 60 * 60 * 1000).toISOString(), // 1 hour meeting
      timeZone: 'UTC',
    },
    conferenceData: {
      createRequest: {
        requestId: Math.random().toString(36).substring(2, 15),
        conferenceSolutionKey: { type: 'hangoutsMeet' },
      },
    },
  };

  const response = await calendar.events.insert({
    auth: authClient,
    calendarId: CALENDAR_ID,
    resource: event,
    conferenceDataVersion: 1,
  });

  return response.data.conferenceData.entryPoints[0].uri; // This is the real Meet link
} 