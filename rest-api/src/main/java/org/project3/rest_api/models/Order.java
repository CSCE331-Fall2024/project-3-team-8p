package org.project3.rest_api.models;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class Order {
    public UUID orderId;
    public UUID cashierId;
    public Integer month;
    public Integer week;
    public Integer day;
    public Integer hour;
    public Double price;
    /**
     * A map to store inventory items in the order and their quantities
     */
    public Map<InventoryItem, Integer> inventoryItems = new HashMap<>();

    /**
     * A map to store menu items in the order and their quantities
     */
    public Map<MenuItem, Integer> menuItems = new HashMap<>();

    public Order(UUID orderId, UUID cashierId, Integer month, Integer week, Integer day, Integer hour, Double price) {
        this.orderId = orderId;
        this.cashierId = cashierId;
        this.month = month;
        this.week = week;
        this.day = day;
        this.hour = hour;
        this.price = price;
    }

    public Order(UUID cashierId, Integer month, Integer week, Integer day, Integer hour, Double price) {
            this(UUID.randomUUID(), cashierId ,month, week, day, hour, price);

    }
    public void addOrUpdateInventoryItem(InventoryItem item, int quantity) {
        inventoryItems.put(item, quantity);
    }

    /**
     * Adds or updates the quantity of a MenuItem in the order.
     * Adjusts the total price of the order based on the new quantity of the menu item.
     *
     * @param item     the menu item to be added or updated
     * @param quantity the quantity of the item
     */
    public void addOrUpdateMenuItem(MenuItem item, int quantity) {
        double priceDiff = (quantity - menuItems.getOrDefault(item, 0)) * item.price;
        price += priceDiff;
        menuItems.put(item, quantity);
    }
}

