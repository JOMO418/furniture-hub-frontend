import api from './api';

export const productService = {
  /**
   * Get all products with filters
   * @param {Object} filters - { page, limit, category, minPrice, maxPrice, sort, search }
   * @returns {Promise} { products, pagination }
   */
  getAll: async (filters = {}) => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) params.append(key, filters[key]);
    });
    const response = await api.get(`/products?${params}`);
    return response.data;
  },

  /**
   * Get featured products
   * @param {number} limit - Number of products
   * @returns {Promise} Array of products
   */
  getFeatured: async (limit = 8) => {
    const response = await api.get(`/products/featured?limit=${limit}`);
    return response.data.products;
  },

  /**
   * Get best sellers
   * @param {number} limit - Number of products
   * @returns {Promise} Array of products
   */
  getBestSellers: async (limit = 8) => {
    const response = await api.get(`/products/bestsellers?limit=${limit}`);
    return response.data.products;
  },

  /**
   * Get new arrivals
   * @param {number} limit - Number of products
   * @returns {Promise} Array of products
   */
  getNewArrivals: async (limit = 8) => {
    const response = await api.get(`/products/new-arrivals?limit=${limit}`);
    return response.data.products;
  },

  /**
   * Get product by slug
   * @param {string} slug - Product slug
   * @returns {Promise} Product object
   */
  getBySlug: async (slug) => {
    const response = await api.get(`/products/${slug}`);
    return response.data.product;
  },

  /**
   * Get products by category
   * @param {string} category - Category name
   * @param {Object} options - { page, limit }
   * @returns {Promise} { products, category, pagination }
   */
  getByCategory: async (category, options = {}) => {
    const params = new URLSearchParams(options);
    const response = await api.get(`/products/category/${category}?${params}`);
    return response.data;
  },

  /**
   * Search products
   * @param {string} query - Search query
   * @param {number} limit - Number of results
   * @returns {Promise} Array of products
   */
  search: async (query, limit = 20) => {
    const response = await api.get(`/products/search?q=${query}&limit=${limit}`);
    return response.data.products;
  },

  /**
   * Create product (Admin only)
   * @param {Object} productData - Product data
   * @returns {Promise} { success, message, data: { product } }
   */
  create: async (productData) => {
    const response = await api.post('/products', productData);
    return response;
  },

  /**
   * Update product (Admin only)
   * @param {string} id - Product ID
   * @param {Object} productData - Updated data
   * @returns {Promise} { success, message, data: { product } }
   */
  update: async (id, productData) => {
    const response = await api.put(`/products/${id}`, productData);
    return response;
  },

  /**
   * Delete product (Admin only)
   * @param {string} id - Product ID
   * @returns {Promise} { success, message }
   */
  delete: async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response;
  }
};
