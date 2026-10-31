export class PackageMeal {
  constructor({
    plan = 'CP (Breakfast Included)',
    breakfast = 'Complimentary Buffet Breakfast at Resort',
    lunch = 'Local Kerala / Multi-Cuisine Lunch (Self-Arranged)',
    dinner = 'Candlelight / Chef Special Dinner Included',
    preferences = ['Vegetarian', 'Non-Vegetarian', 'Jain', 'Vegan'],
  } = {}) {
    this.plan = plan;
    this.breakfast = breakfast;
    this.lunch = lunch;
    this.dinner = dinner;
    this.preferences = preferences;
  }
}
export default PackageMeal;
