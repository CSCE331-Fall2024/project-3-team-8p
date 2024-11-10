package org.project3.rest_api;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.project3.rest_api.models.InventoryItem;

import static org.assertj.core.api.Assertions.assertThat;

/**
* Tests endpoints related to inventory service
* */
public class InventoryServiceTests extends RestAPIApplicationTests{

    @BeforeEach
    void inventorySetup() {
        baseUrl += "inventory-service";
    }

    /**
    * Checks if GET correctly returns inventory item count
    * */
    @Test
    void getInventoryItemReturnsCorrectCount() {
        String url = baseUrl;

        String rawJson = this.restTemplate.getForObject(url, String.class);
        InventoryItem[] rawArray = this.restTemplate.getForObject(url, InventoryItem[].class);

        final int EXPECTED_ITEM_COUNT = 20;
        assertThat(
                rawArray.length
        ).isGreaterThanOrEqualTo(EXPECTED_ITEM_COUNT);

        printResult(rawJson, "Inventory Items");

    }

    /**
     * Checks if POST correctly increments inventory item count
     * */
    @Test
    void postInventoryItemIncrementsCount() {
        String url = baseUrl;

        InventoryItem[] oldItemArray = this.restTemplate.getForObject(url, InventoryItem[].class);

        final int EXPECTED_ITEM_COUNT = oldItemArray.length + 1;

        // perform the post request
        this.restTemplate.postForObject(baseUrl,
                new InventoryItem(
                        0.99,
                        376,
                        "Test Inventory Item"
                ),
                InventoryItem.class
        );

        String rawJson = this.restTemplate.getForObject(url, String.class);
        InventoryItem[] newItemArray = this.restTemplate.getForObject(url, InventoryItem[].class);

        assertThat(
                newItemArray.length
        ).isGreaterThanOrEqualTo(EXPECTED_ITEM_COUNT);

        printResult(rawJson, "Inventory Items");

    }


}
