import ReviewDict from "./dict-types/ReviewDict";

/**
 * Model for a review
 */
export default class Review {
    /**
     * The review's ID
     * @private
     */
    private readonly _reviewId: string;
    /**
     * The name of the customer who submitted the review
     * @private
     */
    private readonly _customerName: string;
    /**
     * The content of the review
     * @private
     */
    private readonly _review: string;

    /**
     * Constructs a new {@linkcode Review}
     * @param id - The review's ID
     * @param name - The name of the customer who submitted the review
     * @param rev - The content of the review
     */
    constructor(id: string, name: string, rev: string) {
        this._reviewId = id;
        this._customerName = name;
        this._review = rev;
    }

    /**
     * Maps from a {@linkcode ReviewDict} to a {@linkcode Review}
     * @param dict - The {@linkcode ReviewDict} containing review data
     * @returns A new {@linkcode Review} instance
     */
    static fromDict(dict: ReviewDict): Review {
        return new Review(
            dict.reviewId,
            dict.customerName,
            dict.review
        );
    }

    /**
     * Converts the review instance to a dictionary format
     * @returns A {@linkcode ReviewDict} representation of the review
     */
    toDict(): ReviewDict {
        return {
            reviewId: this._reviewId,
            customerName: this._customerName,
            review: this._review,
        };
    }

    /**
     * Gets the review's ID
     * @returns The review's ID
     */
    public get reviewId(): string {
        return this._reviewId;
    }

    /**
     * Gets the name of the customer who submitted the review
     * @returns The name of the customer
     */
    public get customerName(): string {
        return this._customerName;
    }

    /**
     * Gets the content of the review
     * @returns The content of the review
     */
    public get review(): string {
        return this._review;
    }
}
