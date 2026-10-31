import packageActivityApi from '../../api/packages/packageActivityApi';

export const packageActivityService = {
  getActivities: async (pkgId) => packageActivityApi.getActivities(pkgId),
};

export default packageActivityService;
