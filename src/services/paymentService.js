import paymentApi from '../api/paymentApi';

export const paymentService = {
  processPayment: async (payload) => paymentApi.processPayment(payload),
  verifyTransaction: async (txId) => paymentApi.verifyPayment(txId),
};

export default paymentService;
