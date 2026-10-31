import packageReviewApi from '../../api/packages/packageReviewApi';

export const packageReviewService = {
  getReviews: async (pkgId) => packageReviewApi.getPackageReviews(pkgId),
  submitReview: async (review) => packageReviewApi.addPackageReview(review),
};

export default packageReviewService;
