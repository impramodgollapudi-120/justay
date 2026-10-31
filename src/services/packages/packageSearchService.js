import packageSearchApi from '../../api/packages/packageSearchApi';

export const packageSearchService = {
  search: async (criteria) => packageSearchApi.searchPackages(criteria),
};

export default packageSearchService;
