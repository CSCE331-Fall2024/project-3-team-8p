package org.project3.rest_api.database.services;

import org.project3.rest_api.database.DBConnector;
import org.project3.rest_api.database.QueryTemplate;
import org.project3.rest_api.database.SQLToJavaMapper;
import org.project3.rest_api.models.Review;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;
import java.util.List;
import java.util.UUID;

/**
 * Service class for handling database operations related to reviews.
 */
@Repository
public class DBReviewService extends DBConnector {
    /**
     * Default constructor for DBReviewService.
     * Initializes the service for handling review-related database operations.
     */
    public DBReviewService() {
    }

    /**
     * Selects all reviews from the database.
     *
     * @return list of customer reviews
     */
    public List<Review> selectReviews() {
        List<Review> allReviews = null;
        try {
            allReviews = executeQuery(
                    QueryTemplate.selectAllReviews,
                    SQLToJavaMapper::reviewMapper
            );
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return allReviews;
    }

    /**
     * Adds a review to the database.
     *
     * @param customerReview new customer review to add to the database
     */
    public void insertReview(Review customerReview) {
        executeUpdate(String.format(QueryTemplate.insertReview,
                customerReview.reviewId,
                customerReview.customerName,
                customerReview.review
        ));
    }

    /**
     * Deletes a review from the database.
     *
     * @param reviewId UUID of the review to delete
     */
    public void deleteReview(UUID reviewId) {
        executeUpdate(String.format(QueryTemplate.deleteReview,
                reviewId
        ));
    }
}