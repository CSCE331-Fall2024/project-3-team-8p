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

        final int EXPECTED_ITEM_COUNT = 20;
        assertThat(
                getInventoryItems(baseUrl).length
        ).isGreaterThanOrEqualTo(EXPECTED_ITEM_COUNT);

        printResult(getRawJson(baseUrl), "Inventory Items");

    }

    /**
     * Checks if GET menu items' inventory items returns correctly
     * */
    @Test
    void getMenuItemInventoryItemsReturnsCorrectCount() {
        List<MenuItem> menuItems =  dbConnector.selectMenuItems();
        int randIdx = rand.nextInt(menuItems.size());
        MenuItem randItem = menuItems.get(randIdx);

        final int EXPECTED_INV_COUNT = this.dbConnector.selectMenuItemInventoryItems(
                randItem.menuItemId
        ).size();

        InventoryItem[] invItem = getInventoryItems(baseUrl+"?menuItemId="+randItem.menuItemId);

        assertThat(
                invItem.length
        ).isEqualTo(EXPECTED_INV_COUNT);

    }

    /**
     * Checks if POST correctly increments inventory item count
     * */
    @Test
    void postInventoryItemIncrementsCount() {

        InventoryItem[] oldItemArray = getInventoryItems(baseUrl);

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


        InventoryItem[] newItemArray = getInventoryItems(baseUrl);

        assertThat(
                newItemArray.length
        ).isGreaterThanOrEqualTo(EXPECTED_ITEM_COUNT);

        printResult(getRawJson(baseUrl), "Inventory Items");

    }

    /**
     * Checks if PUT correctly updates Inventory information
     * */
    @Test
    void putInventoryItemCorrectlyUpdatesInfo() {

        InventoryItem[] oldItemArray = getInventoryItems(baseUrl);
        int randIdx = rand.nextInt(oldItemArray.length);
        InventoryItem origInvItem = oldItemArray[randIdx];

        final double EXPECTED_ITEM_COST = ++origInvItem.cost;
        final int EXPECTED_STOCK = ++origInvItem.availableStock;
        final String EXPECTED_NAME = "Special " + origInvItem.itemName;

        origInvItem.itemName = "Special " + origInvItem.itemName;

        // perform the PUT request
        this.restTemplate.put(baseUrl,
                origInvItem
        );

        InventoryItem[] newItemArray = getInventoryItems(baseUrl);
        Optional<InventoryItem> newItem = Arrays.stream(newItemArray).filter(
                inventoryItem -> {
                    return inventoryItem.inventoryItemId.equals(origInvItem.inventoryItemId);
                }
        ).findFirst();

        // check that new item is not null
        assertThat(newItem).isPresent();

        // check if PUT correctly updated fields
        InventoryItem safeItem = newItem.get();

        assertThat(
                safeItem.cost
        ).isEqualTo(EXPECTED_ITEM_COST);

        assertThat(
                safeItem.availableStock
        ).isEqualTo(EXPECTED_STOCK);

        assertThat(
                safeItem.itemName
        ).isEqualTo(EXPECTED_NAME);

        printResult(getRawJson(baseUrl), "Inventory Items");

    }


}
