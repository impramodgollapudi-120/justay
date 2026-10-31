export class PackageBooking {
  constructor({
    id = '',
    bookingRef = '',
    packageId = '',
    packageTitle = '',
    destination = '',
    image = '',
    travelDate = '',
    duration = '3N / 4D',
    travelers = [],
    leadGuest = {},
    pricePerPerson = 0,
    subtotal = 0,
    discount = 0,
    couponCode = '',
    taxes = 0,
    totalAmount = 0,
    status = 'Confirmed',
    paymentStatus = 'Paid',
    qrCodeData = '',
    createdAt = new Date().toISOString(),
  } = {}) {
    this.id = id;
    this.bookingRef = bookingRef;
    this.packageId = packageId;
    this.packageTitle = packageTitle;
    this.destination = destination;
    this.image = image;
    this.travelDate = travelDate;
    this.duration = duration;
    this.travelers = travelers;
    this.leadGuest = leadGuest;
    this.pricePerPerson = pricePerPerson;
    this.subtotal = subtotal;
    this.discount = discount;
    this.couponCode = couponCode;
    this.taxes = taxes;
    this.totalAmount = totalAmount;
    this.status = status;
    this.paymentStatus = paymentStatus;
    this.qrCodeData = qrCodeData || bookingRef;
    this.createdAt = createdAt;
  }
}
export default PackageBooking;
