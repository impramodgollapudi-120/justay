import { createRecord, getCollection } from '../../lib/firebaseData';
import { auth } from '../../lib/firebase';
export const packageReviewApi = {
  async getPackageReviews(packageId) { return (await getCollection('packageReviews')).filter(r => r.packageId === packageId); },
  async addPackageReview(data) { if (!auth?.currentUser) throw new Error('Sign in before submitting a review.'); return createRecord('packageReviews', { ...data, userId: auth.currentUser.uid }); },
};
export default packageReviewApi;
