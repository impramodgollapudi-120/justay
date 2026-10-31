import { getCollection } from '../../lib/firebaseData';
export const packageMealApi = { async getMealPlan(packageId) { return (await getCollection('packageMeals')).filter((item) => item.packageId === packageId); } };
export default packageMealApi;
