package org.project3.rest_api.models.wrappers;

import java.util.UUID;

/**
 * The InventoryItemWithQty class is a wrapper for InventoryItem,
 * pairing an inventory item with a specific quantity.
 * This class is useful for tracking the quantity of an item in various contexts.
 *
 * @author Kevin Zhang
 * @author Soham
 */
public class InventoryItemWithQty {
    /**
     * The inventory item being tracked
     */
    public UUID id;

    /**
     * The quantity of the inventory item
     */
    public Integer quantity;

    /**
     * Constructor to create an instance of InventoryItemWithQty.
     *
     * @param id the inventory item to be tracked
     * @param quantity      the quantity of the inventory item
     */
    public InventoryItemWithQty(UUID id, Integer quantity) {
        this.id = id;
        this.quantity = quantity;
    }
}
