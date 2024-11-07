package org.project3.rest_api;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class InventoryServiceTests extends RestAPIApplicationTests{
    @Test
    void getInventoryItemsReturnsCorrectCount() throws Exception {
        String url = baseUrl+"inventoryitems";

        String rawJson = this.restTemplate.getForObject(url, String.class);
        Object[] rawArray = this.restTemplate.getForObject(url, Object[].class);

        // check that there are at least 20 inventory items
        assertThat(
                rawArray.length
        ).isGreaterThanOrEqualTo(20);

        printResult(rawJson, "Inventory Items");

    }
}
