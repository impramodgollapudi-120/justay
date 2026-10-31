import React, { createContext, useState, useEffect } from 'react';
import packageBookingService from '../../services/packages/packageBookingService';
import packageCouponService from '../../services/packages/packageCouponService';
import packageTravelerService from '../../services/packages/packageTravelerService';

export const PackageBookingContext = createContext();

export const PackageBookingProvider = ({ children }) => {
  const [packageBookings, setPackageBookings] = useState([]);
  const [currentPackageBooking, setCurrentPackageBooking] = useState(null);
  const [selectedTravelDate, setSelectedTravelDate] = useState('');
  const [travelers, setTravelers] = useState([
    packageTravelerService.getDefault(0),
    packageTravelerService.getDefault(1),
  ]);
  const [leadContact, setLeadContact] = useState({
    fullName: '',
    email: '',
    phone: '',
    specialRequests: '',
  });
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponDiscount, setCouponDiscount] = useState(0);

  useEffect(() => {
    loadPackageBookings();
  }, []);

  const loadPackageBookings = async () => {
    try {
      const data = await packageBookingService.getAllBookings();
      setPackageBookings(data);
    } catch (e) {
      console.error(e);
    }
  };

  const addTraveler = () => {
    setTravelers((prev) => [...prev, packageTravelerService.getDefault(prev.length)]);
  };

  const removeTraveler = (index) => {
    if (travelers.length <= 1) return;
    setTravelers((prev) => prev.filter((_, i) => i !== index));
  };

  const updateTraveler = (index, field, value) => {
    setTravelers((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const applyCoupon = async (code, amount) => {
    const coupon = await packageCouponService.applyCoupon(code, amount);
    setAppliedCoupon(coupon);
    setCouponDiscount(coupon.discountAmount);
    return coupon;
  };

  const removeAppliedCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
  };

  const confirmPackageBooking = async (bookingPayload) => {
    const created = await packageBookingService.createBooking(bookingPayload);
    setCurrentPackageBooking(created);
    await loadPackageBookings();
    return created;
  };

  const cancelBooking = async (bookingId) => {
    await packageBookingService.cancelBooking(bookingId);
    await loadPackageBookings();
  };

  return (
    <PackageBookingContext.Provider
      value={{
        packageBookings,
        currentPackageBooking,
        setCurrentPackageBooking,
        selectedTravelDate,
        setSelectedTravelDate,
        travelers,
        setTravelers,
        addTraveler,
        removeTraveler,
        updateTraveler,
        leadContact,
        setLeadContact,
        appliedCoupon,
        couponDiscount,
        applyCoupon,
        removeAppliedCoupon,
        confirmPackageBooking,
        cancelBooking,
        loadPackageBookings,
      }}
    >
      {children}
    </PackageBookingContext.Provider>
  );
};

export default PackageBookingContext;
