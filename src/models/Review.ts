import ReviewDict from "./dict-types/ReviewDict";
import EmployeeDict from "./dict-types/EmployeeDict";

export default class Review{
    private readonly _reviewId: string;
    private readonly _customerName: string;
    private readonly _review: string;

    constructor(id: string, name: string, rev: string) {
        this._reviewId = id;
        this._customerName = name;
        this._review = rev;
    }

    static fromDict(dict: ReviewDict): Review {
        return new Review(
            dict.reviewId,
            dict.customerName,
            dict.review
        );
    }

    toDict(): ReviewDict {
        return {
            reviewId: this._reviewId,
            customerName: this._customerName,
            review: this._review,
        };
    }

// Getter for reviewId
    public get reviewId(): string {
        return this._reviewId;
    }

    // Getter for customerName
    public get customerName(): string {
        return this._customerName;
    }

    // Getter for review
    public get review(): string {
        return this._review;
    }

}