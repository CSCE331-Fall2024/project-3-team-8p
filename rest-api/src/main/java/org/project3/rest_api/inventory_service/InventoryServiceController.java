package org.project3.rest_api.inventory_service;

import org.project3.rest_api.RestAPIController;
import org.project3.rest_api.models.InventoryItem;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/inventory-service")
@CrossOrigin
public class InventoryServiceController extends RestAPIController {

    /**
     * Queries all inventory items from database
     * @return list of InventoryItem
     */
    @GetMapping
    public List<InventoryItem> getInventoryItems() {
        return restService.selectInventoryItems();
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

        restService.insertInventoryItem(newInventoryItem);
    }
}
