package org.project3.rest_api.models.wrappers;

import org.project3.rest_api.models.MenuItem;

/**
 * The MenuItemWithQty class is a wrapper for MenuItem,
 * associating a menu item with a specific quantity.
 * This class is useful for tracking the quantity of a menu item in various contexts.
 *
 * @author Kevin Zhang
 */
public class MenuItemWithQty {
    /**
     * The menu item being tracked
     */
    public MenuItem menuItem;

    /**
     * The quantity of the menu item
     */
    public int quantity;

    /**
     * Constructor to create an instance of MenuItemWithQty.
     *
     * @param menuItem the menu item to be tracked
     * @param quantity the quantity of the menu item
     */
    public MenuItemWithQty(MenuItem menuItem, int quantity) {
        this.menuItem = menuItem;
        this.quantity = quantity;
    }
}

