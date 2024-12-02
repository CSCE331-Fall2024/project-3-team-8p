package org.project3.rest_api.models;

import java.util.UUID;

public class Review {

    /**
     * UUID of review
     * */
    public UUID reviewId;

    /**
     * Name of customer leaving review
     * */
    public String customerName;

    /**
     * Customer's review
     * */
    public String review;

    /**
     * No-arg constructor for review
     * */
    public Review() {}


    /**
     * Constructor with autmoatic UUID generation
     *
     * */
    public Review(String customerName, String review) {
        this(UUID.randomUUID(), customerName, review);
    }

    /**
     * Atribute constructor for review
     *
     * @param reviewId UUID for review
     * @param customerName name of customer leaving review
     * @param review contents of customer's review
     * */
    public Review (UUID reviewId, String customerName, String review) {
        this.reviewId = reviewId;
        this.customerName = customerName;
        this.review = review;
    }
}
