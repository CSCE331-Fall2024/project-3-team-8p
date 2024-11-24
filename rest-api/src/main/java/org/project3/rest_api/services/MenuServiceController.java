package org.project3.rest_api.services;

import org.project3.rest_api.models.InventoryItem;
import org.project3.rest_api.models.MenuItem;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
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

        dbConnector.insertMenuItem(newMenuItem);
        return newMenuItem;
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

    @GetMapping("/sales-report")
    public Map<String, Integer> getSalesReport(
            @RequestParam Integer startMonth,
            @RequestParam Integer endMonth,
            @RequestParam Integer startDay,
            @RequestParam Integer endDay
    ) {
        return dbConnector.selectSales(startMonth, endMonth, startDay, endDay);
    }
}
