import { PackageTraveler } from '../../models/packages/PackageTraveler';

export const packageTravelerApi = {
  async validateTravelers(travelers = []) {
    const errors = [];
    travelers.forEach((t, i) => {
      if (!t.firstName || !t.lastName) {
        errors.push(`Traveler ${i + 1} requires first and last name.`);
      }
      if (!t.idNumber && t.age >= 18) {
        errors.push(`Traveler ${i + 1} requires valid Government ID Number.`);
      }
    });
    return { valid: errors.length === 0, errors };
  },

  createDefaultTraveler(index = 0) {
    return new PackageTraveler({
      id: `trv-${Date.now()}-${index}`,
      title: '',
      firstName: '',
      lastName: '',
      age: 0,
      gender: '',
      idType: 'Aadhaar / Passport',
      idNumber: '',
    });
  },
};

export default packageTravelerApi;
