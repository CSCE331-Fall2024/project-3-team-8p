package org.project3.rest_api.services;

import org.project3.rest_api.database.services.DBMenuService;
import org.project3.rest_api.models.MenuItem;
import org.springframework.beans.factory.annotation.Autowired;
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
public class MenuServiceController {

    /**
     * Database connector instance
     * */
    @Autowired
    DBMenuService dbMenuService;

    /**
     * Queries all menu items from database
     * @return list of MenuItem
     */
    @GetMapping
    public List<MenuItem> getMenuItems() {
        return dbMenuService.selectMenuItems();
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

        dbMenuService.insertMenuItem(newMenuItem);
        return newMenuItem;
    }

    /**
     * Updates menu items in database
     * @param updatedMenuItem MenuItem object to be updated in database
     * */
    @PutMapping
    public void updateMenuItem(@RequestBody MenuItem updatedMenuItem) {

        dbMenuService.updateMenuItem(updatedMenuItem);
    }

    @GetMapping("/sales-report")
    public Map<String, Integer> getSalesReport(
            @RequestParam Integer startMonth,
            @RequestParam Integer endMonth,
            @RequestParam Integer startDay,
            @RequestParam Integer endDay
    ) {
        return dbMenuService.selectSales(startMonth, endMonth, startDay, endDay);
    }

    /**
     * Updates menu item discount
     * */
    @PutMapping("/update-discount")
    public void updateDiscount(@RequestParam Boolean discount) {
        dbMenuService.updateDiscountStatus(discount);
    }

}
