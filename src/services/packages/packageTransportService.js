import packageTransportApi from '../../api/packages/packageTransportApi';

export const packageTransportService = {
  getTransport: async (pkgId) => packageTransportApi.getTransport(pkgId),
};

export default packageTransportService;
