package org.project3.rest_api.models;

import org.project3.rest_api.models.wrappers.MenuItemWithQty;

import java.util.List;
import java.util.UUID;

/**
 * The Order class represents a customer order in the Panda Express POS system.
 * It stores information about the order, including the order ID, cashier ID, date and time details,
 * total price, and items purchased. The items are divided into two categories: inventory items and menu items.
 *
 * @author Kevin Zhang
 * @author Soham Nagawanshi
 * @author Ryan Kha
 */
public class Order {
    /**
     * Unique identifier for the order
     */
    public UUID orderId;

    /**
     * Unique identifier for the cashier handling the order
     */
    public UUID cashierId;

    /**
     * Month the order was placed
     */
    public Integer month;

    /**
     * Week the order was placed
     */
    public Integer week;

    /**
     * Day the order was placed
     */
    public Integer day;

    /**
     * Hour the order was placed
     */
    public Integer hour;

    /**
     * Total price of the order
     */
    public Double price;

    /**
     * Kitchen status of the order
     * */
    public String status;

    /**
     * List of menu items & quantities associated with the order
     * */
    public List<MenuItemWithQty> menuItemsWithQty;

    /**
     * Constructor to create an Order with an automatically generated order ID.
     *
     * @param cashierId the unique ID of the cashier handling the order
     * @param month     the month the order was placed
     * @param week      the week the order was placed
     * @param day       the day the order was placed
     * @param hour      the hour the order was placed
     * @param price     the total price of the order
     * @param status    the kitchen status of the order
     */
    public Order(
            UUID cashierId,
            Integer month,
            Integer week,
            Integer day,
            Integer hour,
            Double price,
            String status
            ) {
        this(UUID.randomUUID(), cashierId, month, week, day, hour, price, status);
    }

    /**
     * Constructor to create an Order with a specified order ID.
     *
     * @param orderId   the unique ID of the order
     * @param cashierId the unique ID of the cashier handling the order
     * @param month     the month the order was placed
     * @param week      the week the order was placed
     * @param day       the day the order was placed
     * @param hour      the hour the order was placed
     * @param price     the total price of the order
     * @param status    the kitchen status of the order
     */
    public Order(
            UUID orderId,
            UUID cashierId,
            Integer month,
            Integer week,
            Integer day,
            Integer hour,
            Double price,
            String status
            ) {
        this.orderId = orderId;
        this.cashierId = cashierId;
        this.month = month;
        this.week = week;
        this.day = day;
        this.hour = hour;
        this.price = price;
        this.status = status;
    }

    /**
     * No-arg default constructor for order
     * */
    public Order() {}

}

