import packageCouponApi from '../../api/packages/packageCouponApi';

export const packageCouponService = {
  getCoupons: async () => packageCouponApi.getPackageCoupons(),
  applyCoupon: async (code, amount) => packageCouponApi.applyPackageCoupon(code, amount),
};

export default packageCouponService;
