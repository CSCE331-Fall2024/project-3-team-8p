package org.project3.rest_api;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.project3.rest_api.models.MenuItem;


import java.util.Arrays;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

/**
* Tests endpoints related to menu service
* */
public class MenuServiceTests extends RestAPIApplicationTests {

    @BeforeEach
    void menuSetup() {
        baseUrl += "menu";
    }

    /**
     * GET request for menu tests
     * */
    MenuItem[] getMenuItems() {
        return this.restTemplate.getForObject(baseUrl, MenuItem[].class);
    }

    /**
    * Checks if GET returns expected menu item count
    * */
    @Test
    void getMenuItemReturnsCorrectCount() {

        MenuItem[] itemArray = getMenuItems();

        final int EXPECTED_ITEM_COUNT = 10;
        assertThat(
                itemArray.length
        ).isGreaterThanOrEqualTo(EXPECTED_ITEM_COUNT);

        printResult(getRawJson(baseUrl), "Menu Items");
    }

    /**
     * Checks if POST correctly increments menu item count
     * */
    @Test
    void postMenuItemIncrementsCount() {

        MenuItem[] oldItemArray = getMenuItems();

        final int EXPECTED_ITEM_COUNT = oldItemArray.length + 1;

        // perform the post request
        this.restTemplate.postForObject(baseUrl,
                new MenuItem(
                        12.99,
                        "Test Menu Item"
                ),
                MenuItem.class
        );

        MenuItem[] newItemArray = getMenuItems();

        assertThat(
                newItemArray.length
        ).isGreaterThanOrEqualTo(EXPECTED_ITEM_COUNT);

        printResult(getRawJson(baseUrl), "Menu Items");

    }

    /**
     * Checks if PUT request correctly updates Menu Item information
     * */
    @Test
    void putMenuItemCorrectlyCorrectlyUpdatesInfo() {

        MenuItem[] oldItemArray = getMenuItems();
        int randIdx = rand.nextInt(oldItemArray.length);
        MenuItem origMenuItem = oldItemArray[randIdx];

        final double EXPECTED_ITEM_PRICE = ++origMenuItem.price;
        final String EXPECTED_NAME = "Spicy " + origMenuItem.itemName;

        origMenuItem.itemName = "Spicy " + origMenuItem.itemName;

        // perform the PUT request
        this.restTemplate.put(baseUrl,
                origMenuItem
        );

        MenuItem[] newItemArray = getMenuItems();
        Optional<MenuItem> newItem = Arrays.stream(newItemArray).filter(
                menuItem -> {
                    return menuItem.menuItemId.equals(origMenuItem.menuItemId);
                }
        ).findFirst();

        // check that new item is not null
        assertThat(newItem).isPresent();

        // check if PUT correctly updated fields
        MenuItem safeItem = newItem.get();

        assertThat(
                safeItem.price
        ).isEqualTo(EXPECTED_ITEM_PRICE);

        assertThat(
                safeItem.itemName
        ).isEqualTo(EXPECTED_NAME);

        printResult(getRawJson(baseUrl), "Menu Items");

    }



}
