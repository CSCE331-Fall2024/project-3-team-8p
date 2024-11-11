package org.project3.rest_api.services;

import org.project3.rest_api.models.InventoryItem;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * Exposes inventory-related services through endpoints
 * @author Soham Nagawanshi
 * */

@RestController
@RequestMapping("api/inventory")
@CrossOrigin
public class InventoryServiceController extends BaseAPIController {

    /**
     * Queries all inventory items from database
     * @return list of InventoryItem
     */
    @GetMapping
    public List<InventoryItem> getInventoryItems() {
        return dbConnector.selectInventoryItems();
    }

    /**
     * Creates new inventory items in database
     * @param newInventoryItem  InventoryItem object to be created in database
     * */
    @PostMapping
    public void addInventoryItem(@RequestBody InventoryItem newInventoryItem) {

        // Create an inventory item id if not provided by the user
        if (newInventoryItem.inventoryItemId == null) {
            newInventoryItem.inventoryItemId = UUID.randomUUID();
        }

        dbConnector.insertInventoryItem(newInventoryItem);
    }
}
