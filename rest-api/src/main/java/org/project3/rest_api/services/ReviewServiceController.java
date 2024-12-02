package org.project3.rest_api.services;

import org.project3.rest_api.database.services.DBReviewService;
import org.project3.rest_api.models.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * Exposes review-related services through endpoints
 * @author Soham Nagwanshi
 * */
@RestController
@RequestMapping("api/review")
@CrossOrigin
public class ReviewServiceController {

    /**
     * Database connector instance
     * */
    @Autowired
    DBReviewService dbReviewService;

    /**
     * Queries all reviews from database
     * */
    @GetMapping
    public List<Review> getReviews() {
        return dbReviewService.selectReviews();
    }

    /**
     * Adds new review to database
     *
     * @param customerReview customer review to add to database
     * */
    @PostMapping
    public Review addReview(@RequestBody Review customerReview) {

        // Create a menu item id if not provided by the user
        if (customerReview.reviewId == null) {
            customerReview.reviewId = UUID.randomUUID();
        }

        dbReviewService.insertReview(customerReview);
        return customerReview;
    }

}
