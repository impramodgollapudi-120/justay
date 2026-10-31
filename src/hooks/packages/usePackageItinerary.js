import { useState, useEffect } from 'react';
import packageItineraryService from '../../services/packages/packageItineraryService';

export const usePackageItinerary = (packageId) => {
  const [itinerary, setItinerary] = useState([]);
  const [activeDay, setActiveDay] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!packageId) return;
    const fetchItinerary = async () => {
      setLoading(true);
      try {
        const data = await packageItineraryService.getItinerary(packageId);
        setItinerary(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchItinerary();
  }, [packageId]);

  return {
    itinerary,
    activeDay,
    setActiveDay,
    loading,
  };
};

export default usePackageItinerary;
