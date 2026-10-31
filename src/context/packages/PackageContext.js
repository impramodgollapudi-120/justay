import React, { createContext, useState, useEffect } from 'react';
import packageService from '../../services/packages/packageService';
import packageDestinationService from '../../services/packages/packageDestinationService';

export const PackageContext = createContext();

export const PackageProvider = ({ children }) => {
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [destinations, setDestinations] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAllPackageData();
  }, []);

  const loadAllPackageData = async () => {
    try {
      setLoading(true);
      const [pkgs, dests] = await Promise.all([
        packageService.getAll(),
        packageDestinationService.getAll(),
      ]);
      setPackages(pkgs);
      setDestinations(dests);
      if (pkgs.length > 0 && !selectedPackage) {
        setSelectedPackage(pkgs[0]);
      }
    } catch (err) {
      setError(err.message || 'Failed to load holiday packages');
    } finally {
      setLoading(false);
    }
  };

  const selectPackage = (pkg) => {
    setSelectedPackage(pkg);
  };

  const selectCategory = async (category) => {
    setActiveCategory(category);
    try {
      setLoading(true);
      const filtered = await packageService.getByCategory(category);
      setPackages(filtered);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PackageContext.Provider
      value={{
        packages,
        selectedPackage,
        destinations,
        activeCategory,
        loading,
        error,
        selectPackage,
        selectCategory,
        loadAllPackageData,
      }}
    >
      {children}
    </PackageContext.Provider>
  );
};

export default PackageContext;
