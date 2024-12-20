package org.project3.rest_api;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.internal.matchers.Or;
import org.project3.rest_api.database.services.DBEmployeeService;
import org.project3.rest_api.database.services.DBMenuService;
import org.project3.rest_api.database.services.DBOrderService;
import org.project3.rest_api.models.Employee;
import org.project3.rest_api.models.MenuItem;
import org.project3.rest_api.models.Order;
import org.project3.rest_api.models.wrappers.MenuItemWithQty;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;

/*
* Tests endpoints related to order service
* */
public class OrdersServiceTests extends RestAPIApplicationTests{


    /**
     * Database order connector instance
     * */
    @Autowired
    DBOrderService dbOrderService;

    /**
     * Database employee connector instance
    * */
    @Autowired
    DBEmployeeService dbEmployeeService;

    /**
     * Database menu connector instance
     * */
    @Autowired
    DBMenuService dbMenuService;

    /**
     * Possible order statuses
     * */
    private static final List<String> statuses = Arrays.asList(
            "placed",
            "in progress",
            "ready",
            "delivered"
    );


    /**
     * Calendar info for order tests
     * */
    private final Calendar calendar = Calendar.getInstance();
    private final TimeZone timeZone = TimeZone.getTimeZone("America/Chicago");
    private Integer currentMonth;
    private Integer currentWeek;
    private Integer currentDay;
    private Integer currentHour;

    @BeforeEach
    void orderSetup() {
        calendar.setTimeZone(timeZone);
        baseUrl+="order";
        currentMonth = calendar.get(Calendar.MONTH);
        currentWeek = calendar.get(Calendar.WEEK_OF_YEAR);
        currentDay = calendar.get(Calendar.DAY_OF_MONTH);
        currentHour = calendar.get(Calendar.HOUR_OF_DAY);
        normalizeDateFields();
    }

    void normalizeDateFields() {
        // 12 PM  is represented as 0
        currentHour = currentHour == 0 ? 12 : currentHour;

        // Workday starts at 10am and ends at 10pm
        currentHour = (currentHour - 10) % 12 + 1;

        // Return the positive modulus rather than negative
        if (currentHour <= 0)
            currentHour += 12;

        // current month is 0 indexed
        currentMonth++;
    }

    /**
     * GET request for orders
     */
    Order[] getOrders(String url) {
        return restTemplate.getForObject(url, Order[].class);
    }

    /**
    * Checks if GET returns correct order count
    * */
    @Test
    void getOrderReturnsCorrectDefaultCount() {

        Order[] itemArray = getOrders(baseUrl);

        final int DEFAULT_ORDER_COUNT = dbOrderService.selectOrders(50).size();
        assertThat(
                itemArray.length
        ).isEqualTo(DEFAULT_ORDER_COUNT);

        printResult(getRawJson(baseUrl), "Orders");
    }

    /**
    * Checks if GET returns correct parameterized order count
    * */
    @Test
    void getOrderReturnsCorrectParamCount() {
        int EXPECTED_ORDER_COUNT = dbOrderService.selectOrders(75).size();
        String url = baseUrl+"?mostRecent="+EXPECTED_ORDER_COUNT;

        Order[] rawArray = getOrders(url);

        assertThat(rawArray.length).isEqualTo(EXPECTED_ORDER_COUNT);

        printResult(getRawJson(url), "Orders (Parameterized)");
    }

    /**
     * Checks if POST correctly creates new order
     * */
    @Test
    void postOrdersCorrectlyCreatesOrder() {

        List<Employee> allEmployees = dbEmployeeService.selectEmployees();
        int randIdx = rand.nextInt(allEmployees.size());
        Employee someEmployee = allEmployees.get(randIdx);

        List<MenuItem> allItems = dbMenuService.selectMenuItems();
        int startInd = rand.nextInt(0, allItems.size());
        int endInd = rand.nextInt(startInd, allItems.size());
        List<MenuItem> randItems = allItems.subList(startInd, endInd);

        Order newOrder = new Order(
                someEmployee.employeeId,
                currentMonth,
                currentWeek,
                currentDay,
                currentHour,
                10.59,
                "delivered"
        );

        // add the menu items
        newOrder.menuItemsWithQty = randItems.stream().map(menuItem -> {
            return new MenuItemWithQty(menuItem, 2);
        }).toList();

        // post the order
        restTemplate.postForObject(baseUrl,
                newOrder,
                Order.class
        );

        int avgOrderPerMonth = 5700;
        Order[] newOrders = getOrders(baseUrl+"?mostRecent="+avgOrderPerMonth);
        Optional<Order> postedOrder = Arrays.stream(newOrders).filter(
                order -> {
                    return order.orderId.equals(newOrder.orderId);
                }
        ).findFirst();

        // check that the order exists
        assertThat(postedOrder).isPresent();

        // remove the order after testing is successful
        dbOrderService.deleteOrder(newOrder.orderId);

    }

    /**
     * Checks if PUT order status functions correctly
     */
    @Test
    void putOrderStatusCorrectlyUpdatesStatus() {


        Order[] allOrders = getOrders(baseUrl);

        int randIdx = rand.nextInt(allOrders.length);

        Order randomOrder = allOrders[randIdx];

        String oldStatus = randomOrder.status;

        randIdx = rand.nextInt(statuses.size());

        String newStatus = statuses.get(randIdx);

        String putUrl ="%s/%s/updateStatus?newStatus=%s";

        this.restTemplate.put(
                String.format(putUrl,
                        baseUrl,
                        randomOrder.orderId,
                        newStatus),
                null
        );

        allOrders = getOrders(baseUrl+"?mostRecent="+70000);

        Optional<Order> updatedOrder = Arrays.stream(allOrders).filter(
                order -> {
                    return  order.orderId.equals(randomOrder.orderId);
                }
        ).findFirst();

        assertThat(updatedOrder).isPresent();

        Order safeUpdatedOrder = updatedOrder.get();

        assertThat(safeUpdatedOrder.status).isEqualTo(
                newStatus
        );

        // undo changes
        this.restTemplate.put(
                String.format(putUrl,
                        baseUrl,
                        randomOrder.orderId,
                        oldStatus),
                null
        );


    }

    @Test
    void getUndeliveredOrdersReturnsCorrectCount () {

        String url = baseUrl+"/undelivered";

        List<Order> undeliveredOrders = dbOrderService.selectUndeliveredOrders();

        Order[] getOrders = getOrders(url);

        assertThat(
                getOrders.length
        ).isEqualTo(undeliveredOrders.size());


    }

}
