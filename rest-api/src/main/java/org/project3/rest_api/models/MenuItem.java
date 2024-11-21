package org.project3.rest_api.models;

import java.util.UUID;

/**
 * The MenuItem class represents an item on the menu in the Panda Express POS system.
 * It stores information about the menu item, including its ID, price, name, and associated inventory items.
 *
 * @author Kevin Zhang
 * @author Soham Nagawanshi
 */
public class MenuItem {
    /**
     * Unique identifier for the menu item
     */
    public UUID menuItemId;

    /**
     * Price of the menu item
     */
    public Double price;

    /**
     * Name of the menu item
     */
    public String itemName;

    /**
     * Constructor to create a MenuItem with a specified ID.
     *
     * @param menuItemId the unique ID of the menu item
     * @param price      the price of the menu item
     * @param itemName   the name of the menu item
     */
    public MenuItem(UUID menuItemId, Double price, String itemName) {
        this.menuItemId = menuItemId;
        this.price = price;
        this.itemName = itemName;
    }

    /**
     * Constructor to create a MenuItem with an automatically generated ID.
     *
     * @param price    the price of the menu item
     * @param itemName the name of the menu item
     */
    public MenuItem(Double price, String itemName) {
        this(UUID.randomUUID(), price, itemName);
    }

    /**
     * No-arg default constructor for MenuItem
     * */
    public MenuItem() {}

}
