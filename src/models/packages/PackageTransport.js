export class PackageTransport {
  constructor({
    type = 'Private AC SUV (Innova / Ertiga)',
    pickupLocation = 'Cochin International Airport (COK)',
    dropLocation = 'Cochin International Airport (COK)',
    allSightseeingCovered = true,
    tollParkingIncluded = true,
    driverAllowanceIncluded = true,
    vehicleDetails = 'Dedicated chauffeur, sanitized interior, luggage carrier',
  } = {}) {
    this.type = type;
    this.pickupLocation = pickupLocation;
    this.dropLocation = dropLocation;
    this.allSightseeingCovered = allSightseeingCovered;
    this.tollParkingIncluded = tollParkingIncluded;
    this.driverAllowanceIncluded = driverAllowanceIncluded;
    this.vehicleDetails = vehicleDetails;
  }
}
export default PackageTransport;
