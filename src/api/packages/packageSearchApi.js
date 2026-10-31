import { getCollection } from '../../lib/firebaseData';
export const packageSearchApi = {
  async searchPackages({ destination, duration, budget, category } = {}) {
    return (await getCollection('packages')).filter((p) =>
      (!destination || `${p.destination || ''} ${p.title || ''}`.toLowerCase().includes(destination.toLowerCase())) &&
      (!category || category === 'all' || p.category === category) &&
      (!budget || Number(p.price || 0) <= Number(budget)) &&
      (!duration || String(p.duration || '').toLowerCase().includes(String(duration).toLowerCase())));
  },
};
export default packageSearchApi;
