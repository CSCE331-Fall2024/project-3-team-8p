package org.project3.rest_api.database;

import org.project3.rest_api.models.MenuItem;
import org.project3.rest_api.models.InventoryItem;
import org.project3.rest_api.models.Employee;
import org.project3.rest_api.models.Order;
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

    public void insertEmployee(Employee newEmployee) {
        executeUpdate(String.format(QueryTemplate.insertEmployee,
                newEmployee.employeeId,
                newEmployee.isManager,
                newEmployee.name
        ));
    }

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

    public void insertInventoryItem(InventoryItem newInventoryItem) {
        executeUpdate(String.format(QueryTemplate.insertInventoryItem,
                newInventoryItem.inventoryItemId,
                newInventoryItem.cost,
                newInventoryItem.availableStock,
                newInventoryItem.itemName
        ));
    }

    public void insertMenuItem(MenuItem newMenuItem) {
        executeUpdate(String.format(QueryTemplate.insertMenuItem,
                newMenuItem.menuItemId,
                newMenuItem.price,
                newMenuItem.itemName
        ));
    }

}
