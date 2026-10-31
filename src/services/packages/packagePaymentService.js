import packagePaymentApi from '../../api/packages/packagePaymentApi';

export const packagePaymentService = {
  process: async (params) => packagePaymentApi.processPackagePayment(params),
};

export default packagePaymentService;
