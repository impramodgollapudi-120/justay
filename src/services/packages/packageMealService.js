import packageMealApi from '../../api/packages/packageMealApi';

export const packageMealService = {
  getMeals: async (pkgId) => packageMealApi.getMealPlan(pkgId),
};

export default packageMealService;
