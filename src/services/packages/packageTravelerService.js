import packageTravelerApi from '../../api/packages/packageTravelerApi';

export const packageTravelerService = {
  validate: async (travelers) => packageTravelerApi.validateTravelers(travelers),
  getDefault: (idx) => packageTravelerApi.createDefaultTraveler(idx),
};

export default packageTravelerService;
