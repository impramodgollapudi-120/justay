import { useContext } from 'react';
import { PackageContext } from '../context/packages/PackageContext';

export const usePackage = () => {
  const context = useContext(PackageContext);
  if (!context) {
    throw new Error('usePackage must be used within a PackageProvider');
  }
  return context;
};

export default usePackage;
