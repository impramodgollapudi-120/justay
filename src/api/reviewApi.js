import { createRecord, getCollection } from '../lib/firebaseData';
import { auth } from '../lib/firebase';
export const reviewApi = {
  async getReviewsByTarget(targetId) { return (await getCollection('reviews')).filter(r => r.targetId === targetId); },
  async addReview(data) { if (!auth?.currentUser) throw new Error('Sign in before submitting a review.'); return createRecord('reviews', { ...data, userId: auth.currentUser.uid }); },
};
export default reviewApi;
