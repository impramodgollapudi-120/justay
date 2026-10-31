export class PackageCoupon {
  constructor({
    code = 'JUSTAYPKG',
    title = 'Package Special Offer',
    discountAmount = 1500,
    minAmount = 10000,
    description = 'Get instant ₹1,500 off on holiday packages',
  } = {}) {
    this.code = code;
    this.title = title;
    this.discountAmount = discountAmount;
    this.minAmount = minAmount;
    this.description = description;
  }
}
export default PackageCoupon;
