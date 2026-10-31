import { getCollection, getRecord } from '../../lib/firebaseData';
export const packageApi = {
  async getAllPackages() { return getCollection('packages'); },
  async getPackageById(id) { return getRecord('packages', id); },
  async getPackagesByCategory(category) {
    const items = await getCollection('packages');
    if (!category || category.toLowerCase() === 'all') return items;
    return items.filter((p) => String(p.category || '').toLowerCase() === category.toLowerCase());
  },
};
export default packageApi;
