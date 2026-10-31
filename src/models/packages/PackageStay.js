export class PackageStay {
  constructor({
    hotelName = 'Grand Heritage Resort',
    roomType = 'Deluxe Mountain / River View Room',
    nights = 3,
    starRating = 5,
    amenities = ['Breakfast', 'Pool Access', 'Free Wi-Fi', 'Spa Discount'],
    image = '',
    location = 'Munnar, Kerala',
  } = {}) {
    this.hotelName = hotelName;
    this.roomType = roomType;
    this.nights = nights;
    this.starRating = starRating;
    this.amenities = amenities;
    this.image = image;
    this.location = location;
  }
}
export default PackageStay;
