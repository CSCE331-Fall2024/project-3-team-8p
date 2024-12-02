package org.project3.rest_api.database.services;

import org.project3.rest_api.database.DBConnector;
import org.project3.rest_api.database.QueryTemplate;
import org.project3.rest_api.database.SQLToJavaMapper;
import org.project3.rest_api.models.InventoryItem;
import org.project3.rest_api.models.MenuItem;
import org.project3.rest_api.models.Order;
import org.project3.rest_api.models.wrappers.InventoryItemWithQty;
import org.project3.rest_api.models.wrappers.MenuItemWithQty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;
import java.util.*;

/**
 * Implements order-related database actions
 * */

@Repository
public class DBOrderService extends DBConnector {
    /**
     * Interacts with DBMenuservice
     * */
    @Autowired
    private DBMenuService dbMenuService;

    /**
     * Interacts with DBInventoryService
     * */
    @Autowired
    private DBInventoryService dbInventoryService;

    /**
     * Selects the {@code mostRecent} most recent orders from the database
     *
     * @param mostRecent the number of most recent orders to select
     * @return a {@code List<Order>} of most recent orders
     */
    public List<Order> selectOrders(Integer mostRecent) {
        List<Order> orders = null;
        try {
            int currentMonth = calendar.get(Calendar.MONTH) + 1;
            orders = executeQuery(
                    String.format(QueryTemplate.selectRecentOrders, currentMonth, mostRecent),
                    SQLToJavaMapper::orderMapper
            );

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return orders;
    }

    /**
     * Places an order
     *
     * @param newOrder the order to place
     */
    public void insertOrder(Order newOrder) {
        executeUpdate(String.format(QueryTemplate.insertOrder,
                newOrder.orderId,
                newOrder.cashierId,
                newOrder.month,
                newOrder.week,
                newOrder.day,
                newOrder.hour,
                newOrder.price,
                newOrder.status
        ));
        affectOrderQuantities(newOrder.orderId, newOrder.menuItemsWithQty);
    }

    /**
     * Updates orderToMenuItem table
     * @param orderId ID of order associated with menuItemsWithQties
     * @param menuItemsWithQties List of menu items and quantities included in order
     * */
    public void affectOrderQuantities(UUID orderId,
                                      List<MenuItemWithQty> menuItemsWithQties) {

        menuItemsWithQties.forEach(
                menuItem -> {
                    List<InventoryItem> invItems = dbMenuService.selectMenuItemInventoryItems(
                            menuItem.menuItem.menuItemId
                    );

                    List<InventoryItemWithQty> invItemsWithQty = invItems.stream().map(inventoryItem -> {
                        // update stock of inventory item
                        dbInventoryService.decreaseInventoryItemQty(
                                inventoryItem.inventoryItemId, menuItem.quantity
                        );
                        // return an object associating each inventory item with its quantity in the order
                        return new InventoryItemWithQty(inventoryItem, menuItem.quantity);
                    }).toList();

                    // insert each associated inventory item into orderToInventoryItem
                    insertOrderInventoryItems(orderId, invItemsWithQty);
                }
        );
        // insert menu items into orderToMenuItem
        insertOrderMenuItems(orderId, menuItemsWithQties);
    }

    /**
     * Maps order to inventory items
     *
     * @param orderId ID of the placed order
     * @param invItemWithQty Inventory items and quantities associated with order
     * */
    public void insertOrderInventoryItems(UUID orderId, List<InventoryItemWithQty> invItemWithQty) {
        invItemWithQty.forEach(
                invItem -> {
                    executeUpdate(String.format(QueryTemplate.insertOrderToInventoryItem,
                            orderId,
                            invItem.inventoryItem.inventoryItemId,
                            invItem.quantity
                    ));
                }
        );
    }

    /**
     * Maps order to menu items
     *
     * @param orderId ID of placed order
     * @param itemWithQties Menu Items and quantities associated with order
     * */
    public void insertOrderMenuItems(UUID orderId, List<MenuItemWithQty> itemWithQties) {
        itemWithQties.forEach(
                item -> {
                    executeUpdate(String.format(QueryTemplate.insertOrderToMenuItem,
                            orderId,
                            item.menuItem.menuItemId,
                            item.quantity
                    ));
                }
        );
    }

    /**
     * SQL query to select orders' menu items
     *
     * @param orderId ID of order to select menu items for
     * */
    public List<MenuItemWithQty> selectOrderMenuItems(UUID orderId) {

        List<MenuItemWithQty> menuItemWithQties = null;

        try {
            menuItemWithQties = executeQuery(String.format(QueryTemplate.selectOrderMenuItems,
                    orderId
            ), SQLToJavaMapper::menuItemWithQtyMapper);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return menuItemWithQties;
    }

    /**
     * SQL query to select all undelivered orders
     *
     * */
    public List<Order> selectUndeliveredOrders() {
        List<Order> undeliveredOrders = Collections.emptyList();

        try {
            undeliveredOrders = executeQuery(QueryTemplate.selectAllUndeliveredOrders,
                    SQLToJavaMapper::orderMapper
            );

            // map each order to its menu item
            undeliveredOrders.forEach(
                    order -> {
                        order.menuItemsWithQty = selectOrderMenuItems(order.orderId);
                    }
            );

        } catch (Exception e) {
            e.printStackTrace();
        }

        return undeliveredOrders;
    }

    /**
     * Updates orders' kitchen status
     * @param orderId order's UUID
     * @param newStatus order's new status
     * */
    public void updateOrderStatus(UUID orderId, String newStatus) {
        executeUpdate(String.format(QueryTemplate.updateOrderStatus,
                newStatus,
                orderId
        ));
    }

    /**
     * Deletes an order from the database
     *
     * @param orderId ID of order to be deleted
     * */
    public void deleteOrder(UUID orderId) {

        // delete order to menu item
        executeUpdate(String.format(QueryTemplate.deleteOrderToMenuItem,
                orderId
        ));

        // delete order to inventory item
        executeUpdate(String.format(QueryTemplate.deleteOrderToInvItem,
                orderId
        ));

        // delete actual order
        executeUpdate(String.format(QueryTemplate.deleteOrder,
                orderId
        ));
    }



    /**
     * Selects the total number of orders grouped by hour. This only returns hours of the day up until the current hour,
     * determined by Java's internal DateTime methods.
     *
     * @return a {@code List<Double>} of orders placed, grouped by hour. Index 0 corresponds to the 1st hour, etc.
     */
    public List<Double> selectOrdersByHour() {
        List<Double> ordersByHour = null;
        try {

            // Add one because January = 0 in calendar
            int currentMonth = calendar.get(Calendar.MONTH) + 1;
            int currentDay = calendar.get(Calendar.DAY_OF_MONTH);

            // Get the current hour in 12h format
            int currentHour = calendar.get(Calendar.HOUR);

            // 12 PM  is represented as 0
            currentHour = currentHour == 0 ? 12 : currentHour;

            // Workday starts at 10am and ends at 10pm
            currentHour = (currentHour - 10) % 12 + 1;

            // Return the positive modulus rather than negative
            if (currentHour < 0)
                currentHour += 12;

            ordersByHour = executeQuery(
                    String.format(QueryTemplate.selectOrderByHour, currentMonth, currentDay, currentHour),
                    SQLToJavaMapper::orderTotalMapper
            );
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return ordersByHour;
    }

    /**
     * Selects the total number of orders placed grouped by hour. This returns all hours of the day (1-12).
     *
     * @return a {@code List<Double>} of order placed, grouped by hour. Index 0 corresponds to the 1st hour, etc.
     */
    public List<Double> selectOrdersByHourForDay() {
        List<Double> selectOrderByHourForDay = null;
        try {
            // Add one because January = 0 in calendar
            int currentMonth = calendar.get(Calendar.MONTH) + 1;
            int currentDay = calendar.get(Calendar.DAY_OF_MONTH);
            final int totalWorkingHoursPerDay = 12;

            selectOrderByHourForDay = executeQuery(
                    String.format(QueryTemplate.selectOrderByHour, currentMonth, currentDay, totalWorkingHoursPerDay),
                    SQLToJavaMapper::orderTotalMapper
            );
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return selectOrderByHourForDay;
    }

    /**
     * Selects the sum of order prices grouped by hour. This only returns hours of the day up until the current hour,
     * determined by Java's internal DateTime methods.
     *
     * @return a {@code List<Double>} of order price totals, grouped by hour. Index 0 corresponds to the 1st hour, etc.
     */
    public List<Double> selectSalesByHour() {
        List<Double> salesByHour = null;
        try {
            // Add one because January = 0 in calendar
            int currentMonth = calendar.get(Calendar.MONTH) + 1;
            int currentDay = calendar.get(Calendar.DAY_OF_MONTH);

            // Get the current hour in 12h format
            int currentHour = calendar.get(Calendar.HOUR);

            // 12 PM  is represented as 0
            currentHour = currentHour == 0 ? 12 : currentHour;

            // Workday starts at 10am and ends at 10pm
            currentHour = (currentHour - 10) % 12 + 1;

            // Return the positive modulus rather than negative
            if (currentHour < 0)
                currentHour += 12;

            salesByHour = executeQuery(
                    String.format(QueryTemplate.selectOrderSumsByHour, currentMonth, currentDay, currentHour),
                    SQLToJavaMapper::orderSumMapper
            );
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return salesByHour;
    }

    /**
     * Selects the sum of order prices grouped by hour. This returns all hours of the day (1-12).
     *
     * @return a {@code List<Double>} of order price totals, grouped by hour. Index 0 corresponds to the 1st hour, etc.
     */
    public List<Double> selectSalesByHourForDay() {
        List<Double> selectOrderByHourForDay = null;
        try {

            // Add one because January = 0 in calendar
            int currentMonth = calendar.get(Calendar.MONTH) + 1;
            int currentDay = calendar.get(Calendar.DAY_OF_MONTH);
            final int totalWorkingHoursPerDay = 12;

            selectOrderByHourForDay = executeQuery(
                    String.format(QueryTemplate.selectOrderSumsByHour, currentMonth, currentDay, totalWorkingHoursPerDay),
                    SQLToJavaMapper::orderSumMapper
            );
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return selectOrderByHourForDay;
    }

    /**
     * Generates X/Z Report showing the total sales
     * and orders per hour, determines whether
     * to show the entire day or the hours since opening
     * based on which report is being requested.
     *
     * @param wholeDay true if we're fetching the Z report, false for X report
     */
    public Map<String, List<Double>> fetchXOrZReport(boolean wholeDay) {
        // Get sales per hour data from DBDriverSingleton
        List<Double> hourlySales;
        List<Double> hourlyOrders;
        Map<String, List<Double>> reportData = new TreeMap<>();

        if (wholeDay) {
            hourlySales = selectSalesByHourForDay();
            hourlyOrders = selectOrdersByHourForDay();
        } else {
            hourlyOrders = selectOrdersByHour();
            hourlySales = selectSalesByHour();
        }
        reportData.put("salesByHour", hourlySales);
        reportData.put("ordersByHour", hourlyOrders);

        return reportData;

    }

}
