package org.project3.rest_api;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.project3.rest_api.models.InventoryItem;
import org.project3.rest_api.models.MenuItem;

import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;

/**
* Tests endpoints related to inventory service
* */
public class InventoryServiceTests extends RestAPIApplicationTests{

    @BeforeEach
    void inventorySetup() {
        baseUrl += "inventory";
    }

    /**
     * GET request for inventory tests
     * */
    InventoryItem[] getInventoryItems(String url) {
        return this.restTemplate.getForObject(url, InventoryItem[].class);
    }

    /**
    * Checks if GET correctly returns inventory item count
    * */
    @Test
    void getInventoryItemReturnsCorrectCount() {

        final int EXPECTED_ITEM_COUNT = dbConnector.selectInventoryItems().size();
        assertThat(
                getInventoryItems(baseUrl).length
        ).isGreaterThanOrEqualTo(EXPECTED_ITEM_COUNT);

        printResult(getRawJson(baseUrl), "Inventory Items");

    }

    /**
     * Checks if POST correctly increments inventory item count
     * */
    @Test
    void postInventoryItemIncrementsCount() {

        InventoryItem[] oldItemArray = getInventoryItems(baseUrl);

        final int EXPECTED_ITEM_COUNT = oldItemArray.length + 1;

        InventoryItem newInvItem = new InventoryItem(
                0.99,
                376,
                "Test Inventory Item"
        );

        // perform the post request
        this.restTemplate.postForObject(baseUrl,
                newInvItem,
                InventoryItem.class
        );


        InventoryItem[] newItemArray = getInventoryItems(baseUrl);

        assertThat(
                newItemArray.length
        ).isGreaterThanOrEqualTo(EXPECTED_ITEM_COUNT);

        printResult(getRawJson(baseUrl), "Inventory Items");

        // remove the inventory item after testing is successful
        this.dbConnector.deleteInventoryItem(newInvItem.inventoryItemId);

    }

    /**
     * Checks if PUT correctly updates Inventory information
     * */
    @Test
    void putInventoryItemCorrectlyUpdatesInfo() {

        InventoryItem[] oldItemArray = getInventoryItems(baseUrl);
        int randIdx = rand.nextInt(oldItemArray.length);

        InventoryItem origInvItem = oldItemArray[randIdx];

        // round to two decimal places
        double newCost = Math.round((origInvItem.cost + 0.05)*100.0)/100.0;

        InventoryItem newInvItem = new InventoryItem(
                origInvItem.inventoryItemId,
                newCost,
                origInvItem.availableStock + 12,
                "Special " + origInvItem.itemName
        );

        // perform the PUT request
        this.restTemplate.put(baseUrl,
                newInvItem
        );

        InventoryItem[] newItemArray = getInventoryItems(baseUrl);
        Optional<InventoryItem> findInvItem = Arrays.stream(newItemArray).filter(
                inventoryItem -> {
                    return inventoryItem.inventoryItemId.equals(newInvItem.inventoryItemId);
                }
        ).findFirst();

        // check that new item is not null
        assertThat(findInvItem).isPresent();

        // check if PUT correctly updated fields
        InventoryItem safeItem = findInvItem.get();

        assertThat(
                safeItem.cost
        ).isEqualTo(newInvItem.cost);

        assertThat(
                safeItem.availableStock
        ).isEqualTo(newInvItem.availableStock);

        assertThat(
                safeItem.itemName
        ).isEqualTo(newInvItem.itemName);

        printResult(getRawJson(baseUrl), "Inventory Items");

        // put back he original item after tests have succeeded
        this.restTemplate.put(baseUrl,
                origInvItem
        );

    }


}
