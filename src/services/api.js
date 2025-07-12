const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  
  return data;
};

// API service for authentication
export const authAPI = {
  // Sign up a new user
  signup: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
        name: userData.name,
        skills: userData.skills || [],
        bio: userData.bio || ''
      }),
    });
    
    return handleResponse(response);
  },

  // Login user
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    
    return handleResponse(response);
  },

  // Get current user profile
  getProfile: async (token) => {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    return handleResponse(response);
  },

  // Get all users (for development)
  getAllUsers: async (token) => {
    const response = await fetch(`${API_BASE_URL}/auth/users`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    return handleResponse(response);
  },
};

// API service for user operations
export const userAPI = {
  // Get all public users for skill exchange
  getUsers: async (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/users?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return handleResponse(response);
  },

  // Get user by ID
  getUserById: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return handleResponse(response);
  },

  // Update user profile
  updateProfile: async (token, profileData) => {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });
    
    return handleResponse(response);
  },

  // Get current user's profile
  getMyProfile: async (token) => {
    const response = await fetch(`${API_BASE_URL}/users/profile/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    return handleResponse(response);
  },
};

// Token management
export const tokenManager = {
  // Save token to localStorage
  saveToken: (token) => {
    localStorage.setItem('skillkarma_token', token);
  },

  // Get token from localStorage
  getToken: () => {
    return localStorage.getItem('skillkarma_token');
  },

  // Remove token from localStorage
  removeToken: () => {
    localStorage.removeItem('skillkarma_token');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('skillkarma_token');
  },
}; 