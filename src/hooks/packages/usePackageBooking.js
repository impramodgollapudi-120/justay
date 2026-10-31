import { useContext } from 'react';
import { PackageBookingContext } from '../context/packages/PackageBookingContext';

export const usePackageBooking = () => {
  const context = useContext(PackageBookingContext);
  if (!context) {
    throw new Error('usePackageBooking must be used within a PackageBookingProvider');
  }
  return context;
};

export default usePackageBooking;
