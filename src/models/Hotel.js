export class Hotel {
  constructor({
    id = '',
    name = '',
    location = '',
    city = '',
    state = '',
    country = 'India',
    rating = 4.8,
    reviewsCount = 120,
    pricePerNight = 0,
    originalPrice = 0,
    images = [],
    description = '',
    amenities = [],
    propertyType = 'Luxury Resort',
    featured = false,
    rooms = [],
  } = {}) {
    this.id = id;
    this.name = name;
    this.location = location;
    this.city = city;
    this.state = state;
    this.country = country;
    this.rating = rating;
    this.reviewsCount = reviewsCount;
    this.pricePerNight = pricePerNight;
    this.originalPrice = originalPrice;
    this.images = images;
    this.description = description;
    this.amenities = amenities;
    this.propertyType = propertyType;
    this.featured = featured;
    this.rooms = rooms;
  }
}
export default Hotel;
