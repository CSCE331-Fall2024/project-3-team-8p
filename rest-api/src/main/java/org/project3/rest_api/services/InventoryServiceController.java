package org.project3.rest_api.services;

import org.project3.rest_api.database.DBInventoryService;
import org.project3.rest_api.models.InventoryItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * Exposes inventory-related services through endpoints
 * @author Soham Nagawanshi
 * */

@RestController
@RequestMapping("api/inventory")
@CrossOrigin
public class InventoryServiceController {

    /**
     * Database connector instance
     * */
    @Autowired
    DBInventoryService dbInventoryService;

    /**
     * Queries all inventory items from database
     * @return list of InventoryItem
     */
    @GetMapping
    public List<InventoryItem> getInventoryItems() {

        return dbInventoryService.selectInventoryItems();

    }

    /**
     * Creates new inventory items in database
     * @param newInventoryItem  InventoryItem object to be created in database
     * */
    @PostMapping
    public InventoryItem addInventoryItem(@RequestBody InventoryItem newInventoryItem) {

        // Create an inventory item id if not provided by the user
        if (newInventoryItem.inventoryItemId == null) {
            newInventoryItem.inventoryItemId = UUID.randomUUID();
        }

        dbInventoryService.insertInventoryItem(newInventoryItem);

        return newInventoryItem;
    }

    /**
     * Updates inventory items in database
     * @param updatedInventoryItem InventoryItem object to be updated in database
     * */
    @PutMapping
    public void updateInventoryItem(@RequestBody InventoryItem updatedInventoryItem) {

        //TODO: add validation for updatedInventoryItem's id
        dbInventoryService.updateInventoryItem(updatedInventoryItem);
    }

    @GetMapping("/product-usage")
    public Map<String, Integer> getProductUsageReport(
            @RequestParam Integer startMonth,
            @RequestParam Integer endMonth,
            @RequestParam Integer startDay,
            @RequestParam Integer endDay
    ) {
        return dbInventoryService.selectProductUsage(startMonth, endMonth, startDay, endDay);
    }
}
