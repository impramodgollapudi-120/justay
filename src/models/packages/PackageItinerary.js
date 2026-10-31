export class PackageItinerary {
  constructor({
    packageId = '',
    totalDays = 4,
    days = [],
    summary = '',
  } = {}) {
    this.packageId = packageId;
    this.totalDays = totalDays;
    this.days = days;
    this.summary = summary;
  }
}
export default PackageItinerary;
