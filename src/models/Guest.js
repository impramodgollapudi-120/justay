export class Guest {
  constructor({
    fullName = '',
    email = '',
    phone = '',
    specialRequests = '',
    address = '',
    city = '',
    pincode = '',
    identityType = 'Aadhaar / Passport',
    identityNumber = '',
  } = {}) {
    this.fullName = fullName;
    this.email = email;
    this.phone = phone;
    this.specialRequests = specialRequests;
    this.address = address;
    this.city = city;
    this.pincode = pincode;
    this.identityType = identityType;
    this.identityNumber = identityNumber;
  }
}
export default Guest;
