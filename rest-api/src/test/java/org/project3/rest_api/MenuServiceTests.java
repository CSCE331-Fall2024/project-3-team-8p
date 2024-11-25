package org.project3.rest_api;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.project3.rest_api.models.MenuItem;
import org.project3.rest_api.models.NutritionInfo;
import org.project3.rest_api.models.InventoryItem;


import java.util.List;

import java.awt.*;
import java.util.Arrays;
import java.util.Optional;

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

        final int EXPECTED_ITEM_COUNT = dbConnector.selectMenuItems().size();
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


        List<InventoryItem> invItems = dbConnector.selectInventoryItems();



        MenuItem newMenuItem = new MenuItem(
                12.99,
                "Test Menu Item",
                new NutritionInfo(
                        List.of("Peanuts", "Soy"),
                        250,
                        10,
                        15,
                        5,
                        30,
                        true,
                        true
                )
        );



        // perform the post request
        restTemplate.postForObject(baseUrl,
                newMenuItem,
                MenuItem.class
        );

        // remove the menu item after testing is succesful
        dbConnector.deleteMenuItem(newMenuItem.menuItemId);
    }
    /**
     * Checks if PUT request correctly updates Menu Item information
     * */
    @Test
    void putMenuItemCorrectlyCorrectlyUpdatesInfo() {
        NutritionInfo nutritionInfo = new NutritionInfo(
                List.of("Peanuts", "Soy"),
                250,
                10,
                15,
                5,
                30,
                true,
                true
        );
        MenuItem[] oldItemArray = getMenuItems();
        int randIdx = rand.nextInt(oldItemArray.length);

        MenuItem origMenuItem = oldItemArray[randIdx];
        MenuItem newMenuItem = new MenuItem(
                origMenuItem.menuItemId,
                origMenuItem.price + 0.03,
                "Spicy " + origMenuItem.itemName,
                nutritionInfo
        );

        // perform the PUT request
        this.restTemplate.put(baseUrl,
                newMenuItem
        );

        MenuItem[] newItemArray = getMenuItems();
        Optional<MenuItem> newItem = Arrays.stream(newItemArray).filter(
                menuItem -> {
                    return menuItem.menuItemId.equals(newMenuItem.menuItemId);
                }
        ).findFirst();

        // check that new item is not null
        assertThat(newItem).isPresent();

        // check if PUT correctly updated fields
        MenuItem safeItem = newItem.get();

        assertThat(
                safeItem.price
        ).isEqualTo(newMenuItem.price);

        assertThat(
                safeItem.itemName
        ).isEqualTo(newMenuItem.itemName);

        printResult(getRawJson(baseUrl), "Menu Items");
        printResult(rawJson, "Menu Items");

        // put the original menu item back after testing is over
        this.restTemplate.put(baseUrl,
                origMenuItem);
    }



}
