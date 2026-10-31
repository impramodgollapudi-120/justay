import { getCollection } from '../../lib/firebaseData';
export const packageCouponApi = {
  async getPackageCoupons() { return getCollection('packageCoupons'); },
  async applyPackageCoupon(code, totalAmount) {
    const coupon = (await getCollection('packageCoupons')).find(c => String(c.code).toUpperCase() === String(code).trim().toUpperCase() && c.active !== false);
    if (!coupon) throw new Error('Invalid or inactive holiday package coupon.');
    if (Number(totalAmount) < Number(coupon.minAmount || 0)) throw new Error(`Minimum package amount of ₹${coupon.minAmount} required.`);
    return { ...coupon, discountAmount: Math.min(Number(coupon.discountAmount || 0), Number(totalAmount)) };
  },
};
export default packageCouponApi;
