import packageApi from '../../api/packages/packageApi';

export const packageService = {
  getAll: async () => packageApi.getAllPackages(),
  getById: async (id) => packageApi.getPackageById(id),
  getByCategory: async (category) => packageApi.getPackagesByCategory(category),
};

export default packageService;
