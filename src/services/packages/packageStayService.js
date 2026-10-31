import packageStayApi from '../../api/packages/packageStayApi';

export const packageStayService = {
  getStay: async (pkgId) => packageStayApi.getStayDetails(pkgId),
};

export default packageStayService;
