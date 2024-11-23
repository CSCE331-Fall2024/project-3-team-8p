package org.project3.rest_api.services;

import org.project3.rest_api.models.MenuItem;
import org.project3.rest_api.models.wrappers.ItemWithQty;
import org.springframework.web.bind.annotation.*;

import java.awt.*;
import java.util.List;
import java.util.UUID;

/**
 * Exposes menu-related services through endpoints
 * @author Soham Nagawanshi
 * */

@RestController
@RequestMapping("api/menu")
@CrossOrigin
public class MenuServiceController extends BaseAPIController {

    /**
     * Queries all menu items from database
     * @return list of MenuItem
     */
    @GetMapping
    public List<MenuItem> getMenuItems() {
        return dbConnector.selectMenuItems();
    }

    /**
     * Creates new menu item in database
     * @param newMenuItem MenuItem object to be created in database
     * */
    @PostMapping
    public MenuItem addMenuItem(@RequestBody MenuItem newMenuItem) {

        // Create a menu item id if not provided by the user
        if (newMenuItem.menuItemId == null) {
            newMenuItem.menuItemId = UUID.randomUUID();
        }
        dbConnector.insertNutritionInfo(newMenuItem.nutritionInfo, newMenuItem);
//        dbConnector.insertMenuItem(newMenuItem);
        return newMenuItem;
    }

    /**
     * Updates menuItemToInventoryItem table
     * @param menuItemId ID of menu item associated with ItemWithQties
     * @param invItemsWithQties List of inventory items and quantities included in menu item
     * */
    @PostMapping("{menuItemId}/inventory")
    public void mapMenutoInventory(@PathVariable UUID menuItemId,
                                   @RequestBody List<ItemWithQty> invItemsWithQties) {
        // add a new entry for each inventory item
        dbConnector.insertMenuItemInventoryItems(menuItemId, invItemsWithQties);

    }

    /**
     * Updates menu items in database
     * @param updatedMenuItem MenuItem object to be updated in database
     * */
    @PutMapping
    public void updateMenuItem(@RequestBody MenuItem updatedMenuItem) {

        //TODO: add validation for updatedMenuItem's item id
        dbConnector.updateMenuItem(updatedMenuItem);
    }
}
