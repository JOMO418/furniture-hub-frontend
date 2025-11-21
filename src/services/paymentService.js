import api from './api';

export const paymentService = {
  /**
   * Initiate M-Pesa STK Push
   * @param {Object} paymentData - { phone, amount, orderId }
   * @returns {Promise} { success, message, data: { checkoutRequestId, merchantRequestId } }
   */
  initiateMpesa: async (paymentData) => {
    const response = await api.post('/payment/mpesa/stk-push', paymentData);
    return response;
  },

  /**
   * Check payment status
   * @param {string} checkoutRequestId - Checkout request ID
   * @returns {Promise} { success, data: { status, resultCode, resultDesc } }
   */
  checkStatus: async (checkoutRequestId) => {
    const response = await api.get(`/payment/mpesa/status/${checkoutRequestId}`);
    return response;
  }
};
