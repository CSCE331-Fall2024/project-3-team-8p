package org.project3.rest_api.services;

import org.project3.rest_api.database.services.DBMenuService;
import org.project3.rest_api.models.MenuItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;

import java.awt.*;
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
@EnableScheduling
public class MenuServiceController {

    /**
     * Database connector instance
     * */
    @Autowired
    DBMenuService dbMenuService;

    /**
     * Discount hour discount rate
     * */
    public static final double DISCOUNT_RATE = 0.85;

    /**
     * Discount period start time: every day at 4:00 PM
     * */
    private final String startTime = "0 0 16 * * *";
    /**
     * Discount period end time: every ay at 7:59 PM
     * */
    private final static String endTime = "0 59 19 * * *";

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
     * Decreases menu item price during happy hour start
     * */
    @Scheduled(cron = startTime)
    public void decreaseItemPrice() {

        List<MenuItem> allMenuItem = dbMenuService.selectMenuItems();

        allMenuItem.forEach(menuItem -> {
            double newPrice = Math.round(
                    (menuItem.price) * DISCOUNT_RATE * 100
            )/100.0;

            menuItem.price = newPrice;

            dbMenuService.updateMenuItem(
                    menuItem
            );

        });
    }

    /**
     * Increases menu item price during happy hour end
     * */
    @Scheduled(cron = endTime)
    public void increaseItemPrice() {

        List<MenuItem> allMenuItem = dbMenuService.selectMenuItems();

        allMenuItem.forEach(menuItem -> {
            double newPrice = Math.round(
                    (menuItem.price) * (1/DISCOUNT_RATE) * 100
            )/100.0;

            menuItem.price = newPrice;

            dbMenuService.updateMenuItem(
                    menuItem
            );
        });

    }
}
