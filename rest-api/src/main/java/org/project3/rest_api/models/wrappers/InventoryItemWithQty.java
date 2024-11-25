package org.project3.rest_api.models.wrappers;

import org.project3.rest_api.models.InventoryItem;

/**
 * The InventoryItemWithQty class is a wrapper for InventoryItem,
 * pairing an inventory item with a specific quantity.
 * This class is useful for tracking the quantity of an item in various contexts.
 *
 * @author Kevin Zhang
 */
public class InventoryItemWithQty {
    /**
     * The inventory item being tracked
     */
    public InventoryItem inventoryItem;

    /**
     * The quantity of the inventory item
     */
    public Integer quantity;

    /**
     * Constructor to create an instance of InventoryItemWithQty.
     *
     * @param inventoryItem the inventory item to be tracked
     * @param quantity      the quantity of the inventory item
     */
    public InventoryItemWithQty(InventoryItem inventoryItem, Integer quantity) {
        this.inventoryItem = inventoryItem;
        this.quantity = quantity;
    }
}

