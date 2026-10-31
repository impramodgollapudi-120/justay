export class Booking {
  constructor({
    id = '',
    bookingRef = '',
    itemType = 'hotel', // 'hotel' or 'package'
    itemId = '',
    title = '',
    location = '',
    image = '',
    checkInDate = '',
    checkOutDate = '',
    nights = 1,
    guests = { adults: 2, children: 0 },
    guestDetails = {},
    pricePerNight = 0,
    subtotal = 0,
    discount = 0,
    taxes = 0,
    totalAmount = 0,
    status = 'Confirmed',
    paymentStatus = 'Paid',
    paymentMethod = 'Credit Card',
    createdAt = new Date().toISOString(),
    qrCodeData = '',
  } = {}) {
    this.id = id;
    this.bookingRef = bookingRef;
    this.itemType = itemType;
    this.itemId = itemId;
    this.title = title;
    this.location = location;
    this.image = image;
    this.checkInDate = checkInDate;
    this.checkOutDate = checkOutDate;
    this.nights = nights;
    this.guests = guests;
    this.guestDetails = guestDetails;
    this.pricePerNight = pricePerNight;
    this.subtotal = subtotal;
    this.discount = discount;
    this.taxes = taxes;
    this.totalAmount = totalAmount;
    this.status = status;
    this.paymentStatus = paymentStatus;
    this.paymentMethod = paymentMethod;
    this.createdAt = createdAt;
    this.qrCodeData = qrCodeData || bookingRef;
  }
}
export default Booking;
