package org.project3.rest_api.database.services;

import org.project3.rest_api.database.DBConnector;
import org.project3.rest_api.database.QueryTemplate;
import org.project3.rest_api.database.SQLToJavaMapper;
import org.project3.rest_api.models.Review;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;
import java.util.List;
import java.util.UUID;

@Repository
/**
 * Service class for handling database operations related to reviews.
 */
public class DBReviewService extends DBConnector {
    /**
     * Default constructor for DBReviewService
     */
    public DBReviewService() {
        // Default constructor
    }

    /**
     * Selects all review from database
     *
     * @return list of customer reviews
     * */
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
     * Adds review to database
     *
     * @param customerReview new customer review to add to database
     * */
    public void insertReview(Review customerReview) {
        executeUpdate(String.format(QueryTemplate.insertReview,
                customerReview.reviewId,
                customerReview.customerName,
                customerReview.review
        ));
    }

    /**
     * Deletes review from database
     *
     * @param reviewId UUID of review to delete
     * */
    public void deleteReview(UUID reviewId) {
        executeUpdate(String.format(QueryTemplate.deleteReview,
                reviewId
        ));
    }

}
