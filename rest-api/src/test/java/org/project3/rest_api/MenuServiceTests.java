package org.project3.rest_api;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.project3.rest_api.models.MenuItem;
import org.project3.rest_api.models.NutritionInfo;


import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

/**
* Tests endpoints related to menu service
* */
public class MenuServiceTests extends RestAPIApplicationTests {

    @BeforeEach
    void menuSetup() {
        baseUrl += "menu-service";
    }

    /**
    * Checks if GET returns expected menu item count
    * */
    @Test
    void getMenuItemReturnsCorrectCount() {
        String url = baseUrl;

        String rawJson = this.restTemplate.getForObject(url, String.class);
        MenuItem[] itemArray = this.restTemplate.getForObject(url, MenuItem[].class);

        final int EXPECTED_ITEM_COUNT = 10;
        assertThat(
                itemArray.length
        ).isGreaterThanOrEqualTo(EXPECTED_ITEM_COUNT);

        printResult(rawJson, "Menu Items");
    }

    /**
     * Checks if POST correctly increments menu item count
     * */
    @Test
    void postMenuItemIncrementsCount() {
        String url = baseUrl;

        MenuItem[] oldItemArray = this.restTemplate.getForObject(url, MenuItem[].class);

        final int EXPECTED_ITEM_COUNT = oldItemArray.length + 1;
        NutritionInfo nutritionInfo = new NutritionInfo(
                List.of("Peanuts", "Soy"),
                250,
                10,
                15,
                5,
                30,
                true
        );
        // perform the post request
        this.restTemplate.postForObject(baseUrl,
                new MenuItem(
                        12.99,
                        "Test Menu Item",
                        nutritionInfo
                ),
                MenuItem.class
        );
        String rawJson = this.restTemplate.getForObject(url, String.class);
        System.out.println("Raw JSON: " + rawJson);
        MenuItem[] newItemArray = this.restTemplate.getForObject(url, MenuItem[].class);

        assertThat(newItemArray.length).isEqualTo(EXPECTED_ITEM_COUNT);

        printResult(rawJson, "Menu Items");

    }



}
