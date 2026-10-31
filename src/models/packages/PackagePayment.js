export class PackagePayment {
  constructor({
    transactionId = '',
    bookingId = '',
    amount = 0,
    paymentMethod = 'UPI / NetBanking',
    status = 'Success',
    timestamp = new Date().toISOString(),
  } = {}) {
    this.transactionId = transactionId;
    this.bookingId = bookingId;
    this.amount = amount;
    this.paymentMethod = paymentMethod;
    this.status = status;
    this.timestamp = timestamp;
  }
}
export default PackagePayment;
