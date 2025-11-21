import api from './api';

export const categoryService = {
  /**
   * Get all categories
   * @returns {Promise} Array of categories
   */
  getAll: async () => {
    const response = await api.get('/categories');
    return response.data.categories;
  },

  /**
   * Get category by slug
   * @param {string} slug - Category slug
   * @returns {Promise} Category object
   */
  getBySlug: async (slug) => {
    const response = await api.get(`/categories/${slug}`);
    return response.data.category;
  }
};
