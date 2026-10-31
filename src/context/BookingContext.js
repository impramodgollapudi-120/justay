import React, { createContext, useState, useEffect } from 'react';
import bookingService from '../services/bookingService';
import couponApi from '../api/couponApi';

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [activeCoupon, setActiveCoupon] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [guestInfo, setGuestInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    specialRequests: '',
    identityType: '',
    identityNumber: '',
  });
  const [bookingDates, setBookingDates] = useState({
    checkIn: '',
    checkOut: '',
    guests: { adults: 2, children: 0 },
  });

  useEffect(() => {
    loadUserBookings();
  }, []);

  const loadUserBookings = async () => {
    try {
      const list = await bookingService.getUserBookings();
      setBookings(list);
    } catch (e) {
      console.error(e);
    }
  };

  const applyCouponCode = async (code, amount) => {
    const coupon = await couponApi.validateCoupon(code, amount);
    setActiveCoupon(coupon);
    setDiscountAmount(coupon.discountAmount || 0);
    return coupon;
  };

  const removeCoupon = () => {
    setActiveCoupon(null);
    setDiscountAmount(0);
  };

  const createNewBooking = async (bookingData) => {
    const created = await bookingService.createBooking(bookingData);
    setCurrentBooking(created);
    await loadUserBookings();
    return created;
  };

  const cancelExistingBooking = async (id) => {
    await bookingService.cancelBooking(id);
    await loadUserBookings();
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        currentBooking,
        setCurrentBooking,
        activeCoupon,
        discountAmount,
        guestInfo,
        setGuestInfo,
        bookingDates,
        setBookingDates,
        applyCouponCode,
        removeCoupon,
        createNewBooking,
        cancelExistingBooking,
        loadUserBookings,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export default BookingContext;
