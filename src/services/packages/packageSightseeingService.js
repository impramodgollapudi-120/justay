import packageSightseeingApi from '../../api/packages/packageSightseeingApi';

export const packageSightseeingService = {
  getSightseeing: async (pkgId) => packageSightseeingApi.getSightseeing(pkgId),
};

export default packageSightseeingService;
