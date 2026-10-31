import packageDestinationApi from '../../api/packages/packageDestinationApi';

export const packageDestinationService = {
  getAll: async () => packageDestinationApi.getDestinations(),
  getById: async (id) => packageDestinationApi.getDestinationById(id),
};

export default packageDestinationService;
