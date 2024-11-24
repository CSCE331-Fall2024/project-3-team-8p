package org.project3.rest_api.database;

import org.project3.rest_api.models.MenuItem;
import org.project3.rest_api.models.InventoryItem;
import org.project3.rest_api.models.Employee;
import org.project3.rest_api.models.Order;
import org.project3.rest_api.models.wrappers.InventoryItemWithQty;
import org.project3.rest_api.models.wrappers.MenuItemWithQty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.sql.*;
import java.util.*;
import java.util.function.Function;

/**
 * This class directly interacts with the database
 *
 *  @author Soham Nagawanshi
 */

@Repository
public class DBConnector {
    public final Calendar calendar = Calendar.getInstance();
    /**
     * maintains single connection to database;
     * '@autowired' instantiates dataSource automatically
     **/
    @Autowired
    private DataSource dataSource;


    /**
     * Executes all necessary SQL queries
     *
     * @param query  query string from QueryTemplate
     * @param mapper mapper from SQLToJavaMapper
     * @return list of query results
     */
    public <T> List<T> executeQuery(String query, Function<ResultSet, T> mapper) throws SQLException {
        List<T> results = new ArrayList<>();

        try (Connection conn = dataSource.getConnection();
             Statement stmt = conn.createStatement()) {

            ResultSet rs = stmt.executeQuery(query);

            while (rs.next()) {
                T item = mapper.apply(rs);
                results.add(item);
            }

            rs.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return results;
    }

    /**
     * Inserts or modifies database
     * @param query query used to modify database
     * */
    private void executeUpdate(String query) {
        try (Connection conn = dataSource.getConnection();
             Statement stmt = conn.createStatement()) {

            stmt.executeUpdate(query);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    /**
     * Selects all menu items
     *
     * @return a list of all menu items
     */
    public List<MenuItem> selectMenuItems() {
        List<MenuItem> items = null;
        try {
            items = executeQuery(
                    String.format(QueryTemplate.selectAllMenuItems),
                    SQLToJavaMapper::menuItemMapper
            );

            items.forEach(menuItem -> {
                menuItem.inventoryItems = selectMenuItemInventoryItems(menuItem.menuItemId);
            });

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return items;
    }

    /**
     * Updates menuItemToInventoryItem table
     * @param menuItemId ID of menu item associated with ItemWithQties
     * @param inventoryItems List of inventory items and quantities included in menu item
     * */
    public void mapMenutoInventory(UUID menuItemId,
                                   List<InventoryItem> inventoryItems) {

        // create an item with quantities object
        List<InventoryItemWithQty> invItemsWithQty = new ArrayList<>();

        inventoryItems.forEach(
                inventoryItem -> {
                    invItemsWithQty.add(
                            new InventoryItemWithQty(
                                    inventoryItem,
                                    1
                            )
                    );
                }
        );
        // add a new entry for each inventory item
        insertMenuItemInventoryItems(menuItemId, invItemsWithQty);

    }

    /**
     * Selects all inventory items associated with a given menu item
     *
     * @param menuItemId the UUID of the menu item to select inventory items for
     * @return a {@code List<InventoryItem>} of inventory items associated with the given menu item
     */
    public List<InventoryItem> selectMenuItemInventoryItems(UUID menuItemId) {
        List<InventoryItem> items = null;
        try {
            items = executeQuery(
                    String.format(QueryTemplate.selectMenuItemInventoryItem, menuItemId),
                    SQLToJavaMapper::inventoryItemMapper
            );
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return items;
    }

    /**
     * Selects all inventory items
     *
     * @return a {@code List<InventoryItem>} of all inventory items
     */
    public List<InventoryItem> selectInventoryItems() {
        List<InventoryItem> items = null;
        try {
            items = executeQuery(
                    String.format(QueryTemplate.selectAllInventoryItems),
                    SQLToJavaMapper::inventoryItemMapper
            );
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return items;
    }

    /**
     * Selects all the employees
     *
     * @return a {@code List<Employee>} of all employees
     */
    public List<Employee> selectEmployees() {
        List<Employee> items = null;
        try {
            items = executeQuery(
                    String.format(QueryTemplate.selectAllEmployees),
                    SQLToJavaMapper::employeeMapper
            );
        } catch (SQLException e) {
            e.printStackTrace();

        }
        return items;
    }

    /**
     * Updates an employee's information
     *
     * @param updatedEmployee an {@code Employee} object containing an employee's updated information
     */
    public void updateEmployee(Employee updatedEmployee) {
        executeUpdate(String.format(QueryTemplate.updateEmployee,
                updatedEmployee.isManager,
                updatedEmployee.name,
                updatedEmployee.employeeId
        ));
    }

    /**
     * Deletes an employee with given UUID
     * @param employeeId ID of menu item to be deleted
     * */
    public void deleteEmployee(UUID employeeId) {
        executeUpdate(String.format(QueryTemplate.deleteEmployee,
                employeeId
        ));
    }

    /**
     * Selects the {@code mostRecent} most recent orders from the database
     *
     * @param mostRecent the number of most recent orders to select
     * @return a {@code List<Order>} of most recent orders
     */
    public List<Order> selectOrders(Integer mostRecent) {
        List<Order> items = null;
        try {
            int currentMonth = calendar.get(Calendar.MONTH) + 1;
            items = executeQuery(
                    String.format(QueryTemplate.selectRecentOrders, currentMonth, mostRecent),
                    SQLToJavaMapper::orderMapper
            );
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return items;
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
     * Adds a new employee
     *
     * @param newEmployee the employee to add
     */
    public void insertEmployee(Employee newEmployee) {
        executeUpdate(String.format(QueryTemplate.insertEmployee,
                newEmployee.employeeId,
                newEmployee.isManager,
                newEmployee.name
        ));
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
                newOrder.price
        ));
        mapOrderToMenu(newOrder.orderId, newOrder.menuItemsWithQty);
    }

    /**
     * Updates orderToMenuItem table
     * @param orderId ID of order associated with menuItemsWithQties
     * @param menuItemsWithQties List of menu items and quantities included in order
     * */
    public void mapOrderToMenu(UUID orderId,
                               List<MenuItemWithQty> menuItemsWithQties) {

        menuItemsWithQties.forEach(
                menuItem -> {
                    List<InventoryItem> invItems = selectMenuItemInventoryItems(menuItem.menuItem.menuItemId);

                    List<InventoryItemWithQty> invItemsWithQty = invItems.stream().map(inventoryItem -> {
                        // update stock of inventory item
                        decreaseInventoryItemQty(inventoryItem.inventoryItemId, menuItem.quantity);
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
     * Adds a new inventory item
     *
     * @param newInventoryItem the inventory item to add
     */
    public void insertInventoryItem(InventoryItem newInventoryItem) {
        executeUpdate(String.format(QueryTemplate.insertInventoryItem,
                newInventoryItem.inventoryItemId,
                newInventoryItem.cost,
                newInventoryItem.availableStock,
                newInventoryItem.itemName
        ));
    }
    public Map<String, Integer> selectSales(
            Integer startMonth,
            Integer endMonth,
            Integer startDay,
            Integer endDay
    ) {
        // Let's use `TreeMap` here so the items are ordered alphabetically in the UI
        Map<String, Integer> sales = new TreeMap<>();
        try {
            List<MenuItemWithQty> itemsWithQty = executeQuery(
                    String.format(QueryTemplate.selectMenuItemSalesByTimePeriod,
                            startMonth,
                            endMonth,
                            startDay,
                            endDay,
                            startMonth,
                            endMonth
                    ),
                    SQLToJavaMapper::menuItemWithQtyMapper
            );
            for (MenuItemWithQty item : itemsWithQty) {
                sales.put(item.menuItem.itemName, item.quantity);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return sales;
    }


    /**
     *
     * */
    /**
     * Deletes an employee with given UUID
     * @param invItemId ID of menu item to be deleted
     * */
    public void deleteInventoryItem(UUID invItemId) {
        executeUpdate(String.format(QueryTemplate.deleteInventoryItem,
                invItemId
        ));
    }

    /**
     * Decreases quantity of inventory item
     *
     * @param inventoryItemId ID of inventory item to update
     * @param decreaseBy How much to subtract from inventory item stock
     * */
    public void decreaseInventoryItemQty(UUID inventoryItemId, int decreaseBy) {
        executeUpdate(String.format(QueryTemplate.decreaseInventoryItemQty,
                decreaseBy,
                inventoryItemId
        ));
    }

    /**
     * Adds a new menu item
     *
     * @param newMenuItem the menu item to add
     */
    public void insertMenuItem(MenuItem newMenuItem) {
        executeUpdate(String.format(QueryTemplate.insertMenuItem,
                newMenuItem.menuItemId,
                newMenuItem.price,
                newMenuItem.itemName
        ));
        mapMenutoInventory(newMenuItem.menuItemId, newMenuItem.inventoryItems);

    }

    /**
     * Maps menu items to inventory items
     *
     * @param invItemsWithQty inventory items and quantities associated with menu items
     * */
    public void insertMenuItemInventoryItems(UUID menuItemId, List<InventoryItemWithQty> invItemsWithQty) {

        invItemsWithQty.forEach(
                invItem -> {
                    executeUpdate(String.format(QueryTemplate.insertMenuItemToInventoryItem,
                            menuItemId,
                            invItem.inventoryItem.inventoryItemId,
                            invItem.quantity
                    ));
                }
        );

    }

    /**
     * Deletes menu item with given UUID
     *
     * @param menuItemId ID of menu item to be deleted
     * */
    public void deleteMenuItem(UUID menuItemId) {

        // delete inventory item association
        executeUpdate(String.format(QueryTemplate.deleteMenuItemToInventoryItem,
                menuItemId
        ));

        // delete actual menu item
        executeUpdate(String.format(QueryTemplate.deleteMenuItem,
                menuItemId
        ));
    }
    public Map<String, Integer> selectProductUsage(
            Integer startMonth,
            Integer endMonth,
            Integer startDay,
            Integer endDay
    ) {
        Map<String, Integer> productUsage = new TreeMap<>();
        try {
            List<InventoryItemWithQty> menuItemToInventoryItems = executeQuery(
                    String.format(QueryTemplate.selectInventoryUseByTimePeriod,
                            startMonth,
                            endMonth,
                            startDay,
                            endDay,
                            startMonth,
                            endMonth
                    ),
                    SQLToJavaMapper::inventoryItemWithQtyMapper
            );
            for (InventoryItemWithQty item : menuItemToInventoryItems) {
                productUsage.put(item.inventoryItem.itemName, item.quantity);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return productUsage;
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


    /**
     * Updates an existing menu item
     *
     * @param updatedMenuItem a {@code MenuItem} object representing the menu item to update
     */
    public void updateMenuItem(MenuItem updatedMenuItem) {
        executeUpdate(String.format(QueryTemplate.updateMenuItem,
                updatedMenuItem.price,
                updatedMenuItem.itemName,
                updatedMenuItem.menuItemId
        ));
    }


    /**
     * Updates an existing inventory item
     *
     * @param updatedInventoryItem an {@code InventoryItem} object containing an inventory item's updated information
     */
    public void updateInventoryItem(InventoryItem updatedInventoryItem) {
        executeUpdate(String.format(QueryTemplate.updateInventoryItem,
                updatedInventoryItem.cost,
                updatedInventoryItem.availableStock,
                updatedInventoryItem.itemName,
                updatedInventoryItem.inventoryItemId
        ));
    }

}
