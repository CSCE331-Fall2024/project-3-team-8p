import BaseApi from "./base-api";
import Review from "../models/Review";
import ReviewDict from "../models/dict-types/ReviewDict";

/**
 * API client for review-specific functionality
 */
export default class ReviewApi extends BaseApi {
    /**
     * Constructs a new {@linkcode ReviewApi} instance
     */
    constructor() {
        super("review");
    }

    /**
     * Gets all reviews from the backend
     * @async
     * @returns A `Promise` containing a list of all {@linkcode Review}s
     */
    async getAllReviews(): Promise<Review[]> {
        const response = await this.apiClient.get<ReviewDict[]>("");
        return response.data
            .map((item: ReviewDict) => Review.fromDict(item))
            .reverse();
    }

    /**
     * Posts a new review to the backend
     * @param review - The review to post
     */
    async postReview(review: Review): Promise<void> {
        await this.apiClient.post("", review.toDict());
    }
}
