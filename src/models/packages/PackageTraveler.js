export class PackageTraveler {
  constructor({
    id = '',
    title = 'Mr',
    firstName = '',
    lastName = '',
    age = 30,
    gender = 'Male',
    idType = 'Aadhaar / Passport',
    idNumber = '',
  } = {}) {
    this.id = id;
    this.title = title;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.gender = gender;
    this.idType = idType;
    this.idNumber = idNumber;
  }
}
export default PackageTraveler;
