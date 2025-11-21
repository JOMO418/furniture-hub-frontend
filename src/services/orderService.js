import api from './api';

export const orderService = {
  /**
   * Create new order
   * @param {Object} orderData - { customer, items, paymentMethod, notes }
   * @returns {Promise} { success, message, data: { order } }
   */
  create: async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response;
  },

  /**
   * Get user's orders
   * @returns {Promise} Array of orders
   */
  getMy: async () => {
    const response = await api.get('/orders/my-orders');
    return response.data.orders;
  },

  /**
   * Get order by ID
   * @param {string} id - Order ID
   * @returns {Promise} Order object
   */
  getById: async (id) => {
    const response = await api.get(`/orders/${id}`);
    return response.data.order;
  },

  /**
   * Cancel order
   * @param {string} id - Order ID
   * @param {string} reason - Cancellation reason
   * @returns {Promise} { success, message, data: { order } }
   */
  cancel: async (id, reason = '') => {
    const response = await api.delete(`/orders/${id}`, { data: { reason } });
    return response;
  },

  /**
   * Get all orders (Admin only)
   * @param {Object} filters - { status, page, limit }
   * @returns {Promise} { orders, pagination }
   */
  getAll: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await api.get(`/orders?${params}`);
    return response.data;
  },

  /**
   * Update order status (Admin only)
   * @param {string} id - Order ID
   * @param {string} status - New status
   * @param {string} note - Optional note
   * @returns {Promise} { success, message, data: { order } }
   */
  updateStatus: async (id, status, note = '') => {
    const response = await api.put(`/orders/${id}/status`, { status, note });
    return response;
  }
};
