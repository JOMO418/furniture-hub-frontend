import api from './api';

export const userService = {
  /**
   * Get user profile
   * @returns {Promise} User object
   */
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data.user;
  },

  /**
   * Update profile
   * @param {Object} userData - { fullName, phone }
   * @returns {Promise} { success, message, data: { user } }
   */
  updateProfile: async (userData) => {
    const response = await api.put('/users/profile', userData);
    return response;
  },

  /**
   * Change password
   * @param {Object} passwords - { currentPassword, newPassword }
   * @returns {Promise} { success, message }
   */
  changePassword: async (passwords) => {
    const response = await api.put('/users/change-password', passwords);
    return response;
  },

  /**
   * Delete account
   * @returns {Promise} { success, message }
   */
  deleteAccount: async () => {
    const response = await api.delete('/users/account');
    return response;
  },

  /**
   * Get all addresses
   * @returns {Promise} Array of addresses
   */
  getAddresses: async () => {
    const response = await api.get('/users/addresses');
    return response.data.addresses;
  },

  /**
   * Add new address
   * @param {Object} address - { street, city, country, isDefault }
   * @returns {Promise} { success, message, data: { address } }
   */
  addAddress: async (address) => {
    const response = await api.post('/users/addresses', address);
    return response;
  },

  /**
   * Update address
   * @param {string} id - Address ID
   * @param {Object} address - Updated address data
   * @returns {Promise} { success, message, data: { address } }
   */
  updateAddress: async (id, address) => {
    const response = await api.put(`/users/addresses/${id}`, address);
    return response;
  },

  /**
   * Delete address
   * @param {string} id - Address ID
   * @returns {Promise} { success, message }
   */
  deleteAddress: async (id) => {
    const response = await api.delete(`/users/addresses/${id}`);
    return response;
  },

  /**
   * Set default address
   * @param {string} id - Address ID
   * @returns {Promise} { success, message, data: { address } }
   */
  setDefaultAddress: async (id) => {
    const response = await api.patch(`/users/addresses/${id}/default`);
    return response;
  }
};
