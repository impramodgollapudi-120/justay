import { getCollection } from '../lib/firebaseData';
export const couponApi = {
  async getAvailableCoupons() { return getCollection('coupons'); },
  async validateCoupon(code, bookingAmount) {
    const coupon = (await getCollection('coupons')).find(c => String(c.code).toUpperCase() === String(code).trim().toUpperCase() && c.active !== false);
    if (!coupon) throw new Error('Invalid or inactive coupon code.');
    if (Number(bookingAmount) < Number(coupon.minBookingAmount || 0)) throw new Error(`Minimum booking amount of ₹${coupon.minBookingAmount} required.`);
    return { ...coupon, discountAmount: Math.min(Number(coupon.discountAmount || 0), Number(bookingAmount)) };
  },
};
export default couponApi;
