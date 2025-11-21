import api from './api';

export const authService = {
  /**
   * Register new user
   * @param {Object} userData - { fullName, email, password, phone }
   * @returns {Promise} { success, message, data: { token, user } }
   */
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.success) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response;
  },

  /**
   * Login user
   * @param {Object} credentials - { email, password }
   * @returns {Promise} { success, message, data: { token, user } }
   */
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.success) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response;
  },

  /**
   * Logout user
   * @returns {Promise} { success, message }
   */
  logout: async () => {
    try {
      await api.post('/auth/logout');
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  /**
   * Get current logged in user
   * @returns {Promise} User object
   */
  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data.user;
  },

  /**
   * Forgot password
   * @param {string} email
   * @returns {Promise} { success, message }
   */
  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response;
  },

  /**
   * Reset password
   * @param {string} token - Reset token
   * @param {string} password - New password
   * @returns {Promise} { success, message, data: { token } }
   */
  resetPassword: async (token, password) => {
    const response = await api.put(`/auth/reset-password/${token}`, { password });
    if (response.success) {
      localStorage.setItem('token', response.data.token);
    }
    return response;
  },

  /**
   * Get stored user from localStorage
   * @returns {Object|null} User object
   */
  getStoredUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  /**
   * Get stored token from localStorage
   * @returns {string|null} Token
   */
  getStoredToken: () => {
    return localStorage.getItem('token');
  },

  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};