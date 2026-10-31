export class Coupon {
  constructor({
    code = '',
    title = '',
    description = '',
    discountAmount = 0,
    discountPercent = 0,
    minBookingAmount = 0,
    expiryDate = '',
    terms = '',
  } = {}) {
    this.code = code;
    this.title = title;
    this.description = description;
    this.discountAmount = discountAmount;
    this.discountPercent = discountPercent;
    this.minBookingAmount = minBookingAmount;
    this.expiryDate = expiryDate;
    this.terms = terms;
  }
}
export default Coupon;
