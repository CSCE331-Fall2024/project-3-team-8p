package org.project3.rest_api;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.project3.rest_api.database.DBInventoryService;
import org.project3.rest_api.database.DBMenuService;
import org.project3.rest_api.models.InventoryItem;
import org.project3.rest_api.models.MenuItem;
import org.project3.rest_api.models.NutritionInfo;
import org.springframework.beans.factory.annotation.Autowired;


import java.util.List;
import java.util.Arrays;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

/**
* Tests endpoints related to menu service
* */
public class MenuServiceTests extends RestAPIApplicationTests {

    /**
     * Database menu connector instance
     * */
    @Autowired
    DBMenuService dbMenuService;

    /**
     * Database inventory connector instance
     * */
    @Autowired
    DBInventoryService dbInventoryService;


    /**
     * Reused nutrition info dummy data
     * */
    private final NutritionInfo nutritionInfo = new NutritionInfo(
            List.of("Peanuts", "Soy"),
            300,
            10,
            15,
            5,
            30,
            true,
            true
    );

    @BeforeEach
    void menuSetup() {
        baseUrl += "menu";
    }

    /**
     * GET request for menu tests
     * */
    MenuItem[] getMenuItems() {
        return restTemplate.getForObject(baseUrl, MenuItem[].class);
    }

    /**
    * Checks if GET returns expected menu item count
    * */
    @Test
    void getMenuItemReturnsCorrectCount() {

        MenuItem[] itemArray = getMenuItems();

        final int EXPECTED_ITEM_COUNT = dbMenuService.selectMenuItems().size();
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
        List<InventoryItem> invItems = dbInventoryService.selectInventoryItems();

        final int EXPECTED_ITEM_COUNT = oldItemArray.length + 1;

        MenuItem newMenuItem = new MenuItem(
                12.99,
                "Test Menu Item",
                nutritionInfo
        );

       newMenuItem.inventoryItems = invItems.subList(0,3);

        // perform the post request
        restTemplate.postForObject(baseUrl,
                newMenuItem,
                MenuItem.class
        );

        MenuItem[] newItemArray = getMenuItems();

        assertThat(
                newItemArray.length
        ).isGreaterThanOrEqualTo(EXPECTED_ITEM_COUNT);

        printResult(getRawJson(baseUrl), "Menu Items");

        // remove the menu item after testing is succesful
        dbMenuService.deleteMenuItem(newMenuItem.menuItemId);
    }

    /**
     * Checks if PUT request correctly updates Menu Item information
     * */
    @Test
    void putMenuItemCorrectlyCorrectlyUpdatesInfo() {

        MenuItem[] oldItemArray = getMenuItems();
        int randIdx = rand.nextInt(oldItemArray.length);

        MenuItem origMenuItem = oldItemArray[randIdx];

        double newPrice = Math.round((origMenuItem.price + 0.05)*100.0)/100.0;
        String newName = "Spicy " + origMenuItem.itemName;

        List<InventoryItem> allInvItems = dbInventoryService.selectInventoryItems();
        int startIdx = rand.nextInt(allInvItems.size());
        int endIdx = rand.nextInt(startIdx, allInvItems.size());
        List<InventoryItem> randInvItems = allInvItems.subList(startIdx, endIdx);

        MenuItem newMenuItem = new MenuItem(
                origMenuItem.menuItemId,
                newPrice,
                newName,
                nutritionInfo
        );
        newMenuItem.inventoryItems = randInvItems;

        // perform the PUT request
        restTemplate.put(baseUrl,
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
        ).isEqualTo(newPrice);

        assertThat(
                safeItem.itemName
        ).isEqualTo(newName);

        assertThat(
                safeItem.inventoryItems.size()
        ).isEqualTo(randInvItems.size());

        printResult(getRawJson(baseUrl), "Menu Items");

        // put the original menu item back after testing is over
        restTemplate.put(baseUrl,
                origMenuItem);
    }



}
