import React, { createContext, useState, useEffect } from 'react';
import hotelService from '../services/hotelService';
import roomService from '../services/roomService';

export const HotelContext = createContext();

export const HotelProvider = ({ children }) => {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [hotelRooms, setHotelRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadHotels();
  }, []);

  const loadHotels = async () => {
    try {
      setLoading(true);
      const data = await hotelService.getHotels();
      setHotels(data);
      if (data.length > 0 && !selectedHotel) {
        setSelectedHotel(data[0]);
      }
    } catch (err) {
      setError(err.message || 'Failed to load hotels');
    } finally {
      setLoading(false);
    }
  };

  const selectHotel = async (hotel) => {
    setSelectedHotel(hotel);
    try {
      const rooms = await roomService.getRoomsForHotel(hotel.id);
      setHotelRooms(rooms);
      setSelectedRoom(rooms[0] || null);
    } catch (err) {
      console.error(err);
    }
  };

  const selectRoom = (room) => {
    setSelectedRoom(room);
  };

  return (
    <HotelContext.Provider
      value={{
        hotels,
        selectedHotel,
        hotelRooms,
        selectedRoom,
        loading,
        error,
        selectHotel,
        selectRoom,
        loadHotels,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};

export default HotelContext;
