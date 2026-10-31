import reviewApi from '../api/reviewApi';

export const reviewService = {
  getReviews: async (targetId) => reviewApi.getReviewsByTarget(targetId),
  submitReview: async (review) => reviewApi.addReview(review),
};

export default reviewService;
