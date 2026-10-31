export class PackageCategory {
  constructor({
    id = '',
    name = '',
    icon = '',
    description = '',
    image = '',
    count = 0,
  } = {}) {
    this.id = id;
    this.name = name;
    this.icon = icon;
    this.description = description;
    this.image = image;
    this.count = count;
  }
}
export default PackageCategory;
