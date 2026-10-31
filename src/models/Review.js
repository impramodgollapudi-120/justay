export class Review {
  constructor({
    id = '',
    targetId = '',
    targetType = 'hotel', // 'hotel' or 'package'
    author = '',
    avatar = '',
    rating = 5,
    date = new Date().toISOString().split('T')[0],
    comment = '',
    verifiedStay = true,
  } = {}) {
    this.id = id;
    this.targetId = targetId;
    this.targetType = targetType;
    this.author = author;
    this.avatar = avatar;
    this.rating = rating;
    this.date = date;
    this.comment = comment;
    this.verifiedStay = verifiedStay;
  }
}
export default Review;
