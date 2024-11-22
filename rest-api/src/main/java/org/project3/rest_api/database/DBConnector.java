package org.project3.rest_api.database;

import org.project3.rest_api.models.MenuItem;
import org.project3.rest_api.models.InventoryItem;
import org.project3.rest_api.models.Employee;
import org.project3.rest_api.models.Order;
import org.project3.rest_api.models.wrappers.ItemWithQty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;




import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.function.Function;
import java.util.Calendar;
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
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return items;
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
     * Deletes an order from the database
     *
     * @param orderId ID of order to be deleted
     * */
    public void deleteOrder(UUID orderId) {
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
    }

    /**
     * Maps order to inventory items
     *
     * @param orderId ID of the placed order
     * @param itemWithQties Inventory items and quantities associated with order
     * */
    public void insertOrderInventoryItems(UUID orderId, List<ItemWithQty> itemWithQties) {
        for (ItemWithQty item : itemWithQties) {
            executeUpdate(String.format(QueryTemplate.insertOrderToInventoryItem,
                    orderId,
                    item.id,
                    item.quantity
                    ));
        }
    }

    /**
     * Maps order to menu items
     *
     * @param orderId ID of placed order
     * @param itemWithQties Menu Items and quantities associated with order
     * */
    public void insertOrderMenuItems(UUID orderId, List<ItemWithQty> itemWithQties) {
        for (ItemWithQty item : itemWithQties) {
            executeUpdate(String.format(QueryTemplate.insertOrderToMenuItem,
                    orderId,
                    item.id,
                    item.quantity
                    ));
        }
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
    }

    /**
     * Maps menu items to inventory items
     *
     * @param invItemsWithQty inventory items and quantities associated with menu items
     * */
    public void insertMenuItemInventoryItems(UUID menuItemId, List<ItemWithQty> invItemsWithQty) {

        for (ItemWithQty invItem : invItemsWithQty) {
            executeUpdate(String.format(QueryTemplate.insertMenuItemToInventoryItem,
                    menuItemId,
                    invItem.id,
                    invItem.quantity
            ));
        }


    }

    /**
     * Deletes menu item with given UUID
     *
     * @param menuItemId ID of menu item to be deleted
     * */
    public void deleteMenuItem(UUID menuItemId) {
        executeUpdate(String.format(QueryTemplate.deleteMenuItem,
                menuItemId
                ));
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



}
