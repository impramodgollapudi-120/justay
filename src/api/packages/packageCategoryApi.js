import { getCollection } from '../../lib/firebaseData';
export const packageCategoryApi = {
  async getCategories() { const packages = await getCollection('packages'); return [...new Set(packages.map(p => p.category).filter(Boolean))]; },
};
export default packageCategoryApi;
