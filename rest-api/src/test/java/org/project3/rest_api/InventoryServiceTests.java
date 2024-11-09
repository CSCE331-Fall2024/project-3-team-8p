package org.project3.rest_api;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

/*
* Tests endpoints related to inventory service
* */
public class InventoryServiceTests extends RestAPIApplicationTests{

    /*
    * Checks if expected count of inventory items is returned
    * */
    @Test
    void getInventoryItemsReturnsCorrectCount() {
        String url = baseUrl+"inventoryitems";

        String rawJson = this.restTemplate.getForObject(url, String.class);
        Object[] rawArray = this.restTemplate.getForObject(url, Object[].class);

        final int EXPECTED_ITEM_COUNT = 20;
        assertThat(
                rawArray.length
        ).isGreaterThanOrEqualTo(EXPECTED_ITEM_COUNT);

        printResult(rawJson, "Inventory Items");

    }
}
