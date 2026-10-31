export class PackageDestination {
  constructor({
    id = '',
    name = '',
    state = '',
    country = 'India',
    tagline = '',
    description = '',
    image = '',
    gallery = [],
    weather = '24°C Sunny',
    bestTimeToVisit = 'Oct - Mar',
    popularAttractions = [],
  } = {}) {
    this.id = id;
    this.name = name;
    this.state = state;
    this.country = country;
    this.tagline = tagline;
    this.description = description;
    this.image = image;
    this.gallery = gallery;
    this.weather = weather;
    this.bestTimeToVisit = bestTimeToVisit;
    this.popularAttractions = popularAttractions;
  }
}
export default PackageDestination;
