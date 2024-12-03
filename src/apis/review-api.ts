import BaseApi from "./base-api";
import Review from "../models/Review";
import ReviewDict from "../models/dict-types/ReviewDict";

export default class ReviewApi extends BaseApi {
    constructor() {
        // Set the base review endpoint
        super("review");
    }

    // Fetch all reviews
    async getAllReviews(): Promise<Review[]> {
        const response = await this.apiClient.get<ReviewDict[]>("");
        return response.data
            .map((item: ReviewDict) => Review.fromDict(item))
            .reverse();
    }

    // Post a new review
    async postReview(review: Review): Promise<void> {
        await this.apiClient.post("", review.toDict());
    }
}
