import api from './api';

export const cartService = {
  /**
   * Get user's cart
   * @returns {Promise} { cart, totals }
   */
  get: async () => {
    const response = await api.get('/cart');
    return response.data;
  },

  /**
   * Add item to cart
   * @param {string} productId - Product ID
   * @param {number} quantity - Quantity (default: 1)
   * @returns {Promise} { success, message, data: { cart, totals } }
   */
  add: async (productId, quantity = 1) => {
    const response = await api.post('/cart', { productId, quantity });
    return response;
  },

  /**
   * Update cart item quantity
   * @param {string} itemId - Cart item ID
   * @param {number} quantity - New quantity
   * @returns {Promise} { success, message, data: { cart, totals } }
   */
  update: async (itemId, quantity) => {
    const response = await api.put(`/cart/${itemId}`, { quantity });
    return response;
  },

  /**
   * Remove item from cart
   * @param {string} itemId - Cart item ID
   * @returns {Promise} { success, message, data: { cart, totals } }
   */
  remove: async (itemId) => {
    const response = await api.delete(`/cart/${itemId}`);
    return response;
  },

  /**
   * Clear entire cart
   * @returns {Promise} { success, message, data: { cart, totals } }
   */
  clear: async () => {
    const response = await api.delete('/cart');
    return response;
  }
};

