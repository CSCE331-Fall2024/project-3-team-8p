package org.project3.rest_api.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class Order {
    @JsonProperty("orderId")
    public UUID orderId;
    @JsonProperty("cashierId")
    public UUID cashierId;
    @JsonProperty("month")
    public Integer month;
    @JsonProperty("week")
    public Integer week;
    @JsonProperty("day")
    public Integer day;
    @JsonProperty("hour")
    public Integer hour;
    @JsonProperty("price")
    public Double price;
    public Order() {
    }
    /**
     * A map to store inventory items in the order and their quantities
     */
//    public Map<InventoryItem, Integer> inventoryItems = new HashMap<>();

    /**
     * A map to store menu items in the order and their quantities
     */
//    public Map<MenuItem, Integer> menuItems = new HashMap<>();


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
//    public void addOrUpdateInventoryItem(InventoryItem item, int quantity) {
//        inventoryItems.put(item, quantity);
//    }

    /**
     * Adds or updates the quantity of a MenuItem in the order.
     * Adjusts the total price of the order based on the new quantity of the menu item.
     *
     * @param item     the menu item to be added or updated
     * @param quantity the quantity of the item
     */
//    public void addOrUpdateMenuItem(MenuItem item, int quantity) {
//        double priceDiff = (quantity - menuItems.getOrDefault(item, 0)) * item.price;
//        price += priceDiff;
//        menuItems.put(item, quantity);
//    }
}

