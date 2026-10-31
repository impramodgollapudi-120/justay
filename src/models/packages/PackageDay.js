export class PackageDay {
  constructor({
    day = 1,
    title = '',
    description = '',
    stay = '',
    meals = '',
    places = [],
    activities = [],
    transport = '',
    travelTime = '',
  } = {}) {
    this.day = day;
    this.title = title;
    this.description = description;
    this.stay = stay;
    this.meals = meals;
    this.places = places;
    this.activities = activities;
    this.transport = transport;
    this.travelTime = travelTime;
  }
}
export default PackageDay;
