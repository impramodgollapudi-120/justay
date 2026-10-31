export class PackageReview {
  constructor({
    id = '',
    packageId = '',
    author = 'Guest Traveler',
    avatar = '',
    rating = 5,
    date = new Date().toISOString().split('T')[0],
    comment = 'Incredible package, seamless itinerary and luxury hotel stays!',
    verifiedBooking = true,
  } = {}) {
    this.id = id;
    this.packageId = packageId;
    this.author = author;
    this.avatar = avatar;
    this.rating = rating;
    this.date = date;
    this.comment = comment;
    this.verifiedBooking = verifiedBooking;
  }
}
export default PackageReview;
