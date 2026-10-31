export class PackageSightseeing {
  constructor({
    id = '',
    name = '',
    location = '',
    description = '',
    duration = '2 Hours',
    entryTicketIncluded = true,
    ticketPrice = 0,
    image = '',
    highlights = [],
  } = {}) {
    this.id = id;
    this.name = name;
    this.location = location;
    this.description = description;
    this.duration = duration;
    this.entryTicketIncluded = entryTicketIncluded;
    this.ticketPrice = ticketPrice;
    this.image = image;
    this.highlights = highlights;
  }
}
export default PackageSightseeing;
