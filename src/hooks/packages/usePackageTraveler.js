import { useState } from 'react';
import packageTravelerService from '../../services/packages/packageTravelerService';

export const usePackageTraveler = (initialTravelers = []) => {
  const [travelers, setTravelers] = useState(
    initialTravelers.length > 0
      ? initialTravelers
      : [packageTravelerService.getDefault(0), packageTravelerService.getDefault(1)]
  );
  const [validationErrors, setValidationErrors] = useState([]);

  const addTraveler = () => {
    setTravelers((prev) => [...prev, packageTravelerService.getDefault(prev.length)]);
  };

  const removeTraveler = (index) => {
    if (travelers.length <= 1) return;
    setTravelers((prev) => prev.filter((_, i) => i !== index));
  };

  const updateTraveler = (index, field, value) => {
    setTravelers((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const validate = async () => {
    const res = await packageTravelerService.validate(travelers);
    setValidationErrors(res.errors || []);
    return res.valid;
  };

  return {
    travelers,
    setTravelers,
    addTraveler,
    removeTraveler,
    updateTraveler,
    validate,
    validationErrors,
  };
};

export default usePackageTraveler;
