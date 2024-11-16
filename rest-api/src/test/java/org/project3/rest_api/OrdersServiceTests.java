package org.project3.rest_api;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.project3.rest_api.models.MenuItem;
import org.project3.rest_api.models.Order;

import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;

/*
* Tests endpoints related to order service
* */
public class OrdersServiceTests extends RestAPIApplicationTests{

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
        return this.restTemplate.getForObject(url, Order[].class);
    }

    /**
    * Checks if GET returns correct order count
    * */
    @Test
    void getOrderReturnsCorrectDefaultCount() {

        Order[] itemArray = getOrders(baseUrl);

        final int DEFAULT_ORDER_COUNT = 50;
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
        int EXPECTED_ORDER_COUNT = 75;
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

        Order newOrder = new Order(
                UUID.fromString("46ffb227-8283-43b5-97aa-0a519a62f721"),
                currentMonth,
                currentWeek,
                currentDay,
                currentHour,
                10.59
        );

        // post the order
        this.restTemplate.postForObject(baseUrl,
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

        // check item association logic
        mapOrderToMenuUpdatesCorrectly(newOrder.orderId);

        // no print because large query

    }

    /**
     * Check if order to menu item/inventory item is updated correctly
     * */
    @Test
    void mapOrderToMenuUpdatesCorrectly(UUID orderId) {

        // select two random menu items to associate with the order
        List<MenuItem> menuItems = dbConnector.selectMenuItems();
        int randIdx1 = rand.nextInt(menuItems.size());
        int randIdx2 = rand.nextInt(menuItems.size());
        int randQty = rand.nextInt(5);

        MenuItem randItem1 = menuItems.get(randIdx1);
        MenuItem randItem2 = menuItems.get(randIdx2);



    }


}
