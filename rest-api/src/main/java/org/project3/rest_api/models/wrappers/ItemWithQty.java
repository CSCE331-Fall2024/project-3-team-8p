package org.project3.rest_api.models.wrappers;

import java.util.UUID;

/**
 * The ItemWithQty class is a wrapper for MenuItem and InventoryItem,
 * pairing each with a specific quantity.
 * This class is useful for tracking the quantity of an item in various contexts.
 *
 * @author Kevin Zhang
 * @author Soham
 */
public class ItemWithQty {
    /**
     * The id of the item being tracked
     */
    public UUID id;

    /**
     * The quantity of the item being tracked
     */
    public Integer quantity;

    /**
     * Constructor to create an instance of ItemWithQty.
     *
     * @param id the id of item to be tracked
     * @param quantity      the quantity of the item
     */
    public ItemWithQty(UUID id, Integer quantity) {
        this.id = id;
        this.quantity = quantity;
    }
}
