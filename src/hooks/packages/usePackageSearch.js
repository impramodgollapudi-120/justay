import { useContext } from 'react';
import { PackageSearchContext } from '../context/packages/PackageSearchContext';

export const usePackageSearch = () => {
  const context = useContext(PackageSearchContext);
  if (!context) {
    throw new Error('usePackageSearch must be used within a PackageSearchProvider');
  }
  return context;
};

export default usePackageSearch;
