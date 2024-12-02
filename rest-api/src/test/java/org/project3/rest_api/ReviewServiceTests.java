package org.project3.rest_api;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.project3.rest_api.database.services.DBReviewService;
import org.project3.rest_api.models.InventoryItem;
import org.project3.rest_api.models.MenuItem;
import org.project3.rest_api.models.Review;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

public class ReviewServiceTests extends RestAPIApplicationTests{
    /**
     * Database review connector instance
     * */
    @Autowired
    DBReviewService dbReviewService;

    @BeforeEach
    void reviewSetup(){
        baseUrl+="review";
    }

    /**
     * GET request for reviews
     * */
    Review[] getReviews() {
        return restTemplate.getForObject(baseUrl, Review[].class);
    }

    /**
     * Checks if GET returns correct count
     * */
    @Test
    void getReviewsReturnsCorrectCount(){
        Review[] reviews = getReviews();

        final int EXPECTED_ITEM_COUNT = dbReviewService.selectReviews().size();
        assertThat(
                reviews.length
        ).isGreaterThanOrEqualTo(EXPECTED_ITEM_COUNT);

        printResult(getRawJson(baseUrl), "Reviews");
    }

    /**
     * Checks if POST correctly increments count
     * */
    @Test
    void postMenuItemIncrementsCount() {

        Review[] oldReviewArray = getReviews();


        final int EXPECTED_ITEM_COUNT = oldReviewArray.length + 1;

        Review testReview = new Review("Test Customer", "Test Review");


        // perform the post request
        restTemplate.postForObject(baseUrl,
                testReview,
                Review.class
        );

        Review[] newReviewArray = getReviews();

        assertThat(
                newReviewArray.length
        ).isGreaterThanOrEqualTo(EXPECTED_ITEM_COUNT);

        printResult(getRawJson(baseUrl), "Reviews");

        // remove the menu item after testing is successful
        dbReviewService.deleteReview(testReview.reviewId);
    }
}
