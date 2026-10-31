export class PackageActivity {
  constructor({
    id = '',
    title = '',
    description = '',
    schedule = 'Morning / Evening',
    duration = '1 Hour',
    priceIncluded = true,
    additionalPrice = 0,
    image = '',
    difficulty = 'Easy',
  } = {}) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.schedule = schedule;
    this.duration = duration;
    this.priceIncluded = priceIncluded;
    this.additionalPrice = additionalPrice;
    this.image = image;
    this.difficulty = difficulty;
  }
}
export default PackageActivity;
