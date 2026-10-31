import { useState, useCallback } from 'react';
import hotelService from '../services/hotelService';

export const useSearch = () => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    propertyType: 'All Types',
    minPrice: 0,
    maxPrice: 30000,
    rating: 0,
    amenities: [],
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const executeSearch = useCallback(async (searchQuery = query, searchFilters = filters) => {
    setLoading(true);
    try {
      const data = await hotelService.searchHotels(searchQuery, searchFilters);
      setResults(data);
      return data;
    } catch (e) {
      console.error(e);
      return [];
    } finally {
      setLoading(false);
    }
  }, [query, filters]);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return {
    query,
    setQuery,
    filters,
    setFilters,
    updateFilter,
    results,
    loading,
    executeSearch,
  };
};

export default useSearch;
