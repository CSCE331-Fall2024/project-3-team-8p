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

    public void insertMenuItem(MenuItem newMenuItem) {
        executeUpdate(String.format(QueryTemplate.insertMenuItem,
                newMenuItem.menuItemId,
                newMenuItem.price,
                newMenuItem.itemName
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
        Map<String, List<Double>> reportData = null;

        if (wholeDay) {
            hourlySales = selectSalesByHourForDay();
            hourlyOrders = selectOrdersByHourForDay();
        } else {
            hourlyOrders = selectOrdersByHour();
            hourlySales = selectSalesByHour();
        }
        reportData.put("sales", hourlySales);
        reportData.put("orders", hourlyOrders);

        return reportData;

    }


}
