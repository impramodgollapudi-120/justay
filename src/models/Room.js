export class Room {
  constructor({
    id = '',
    hotelId = '',
    name = 'Deluxe Suite',
    description = '',
    maxOccupancy = 2,
    bedType = 'King Bed',
    pricePerNight = 0,
    originalPrice = 0,
    images = [],
    facilities = [],
    available = true,
    size = '450 sq.ft',
  } = {}) {
    this.id = id;
    this.hotelId = hotelId;
    this.name = name;
    this.description = description;
    this.maxOccupancy = maxOccupancy;
    this.bedType = bedType;
    this.pricePerNight = pricePerNight;
    this.originalPrice = originalPrice;
    this.images = images;
    this.facilities = facilities;
    this.available = available;
    this.size = size;
  }
}
export default Room;
