import React, { createContext, useState } from 'react';
import packageSearchService from '../../services/packages/packageSearchService';

export const PackageSearchContext = createContext();

export const PackageSearchProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useState({
    destination: '',
    duration: '',
    budget: '',
    category: 'all',
    guests: 2,
  });
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const performSearch = async (customParams = null) => {
    const paramsToUse = customParams || searchParams;
    try {
      setIsSearching(true);
      const results = await packageSearchService.search(paramsToUse);
      setSearchResults(results);
      return results;
    } catch (e) {
      console.error(e);
      return [];
    } finally {
      setIsSearching(false);
    }
  };

  const updateParam = (key, value) => {
    setSearchParams((prev) => ({ ...prev, [key]: value }));
  };

  const resetParams = () => {
    setSearchParams({
      destination: '',
      duration: '',
      budget: '',
      category: 'all',
      guests: 2,
    });
    setSearchResults([]);
  };

  return (
    <PackageSearchContext.Provider
      value={{
        searchParams,
        searchResults,
        isSearching,
        updateParam,
        performSearch,
        resetParams,
      }}
    >
      {children}
    </PackageSearchContext.Provider>
  );
};

export default PackageSearchContext;
