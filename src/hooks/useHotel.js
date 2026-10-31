import { useContext } from 'react';
import { HotelContext } from '../context/HotelContext';

export const useHotel = () => {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error('useHotel must be used within a HotelProvider');
  }
  return context;
};

export default useHotel;
