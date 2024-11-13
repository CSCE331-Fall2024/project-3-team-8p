package org.project3.rest_api.services;

import org.project3.rest_api.models.Order;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;


/**
 * Exposes order-related services through endpoints
 * @author Soham Nagawanshi
 * */
@RestController
@RequestMapping("api/order")
@CrossOrigin
public class OrderServiceController extends BaseAPIController {

    /**
     * Queries provided number of orders from database
     * @param mostRecent number of most recent orders to query
     * @return list of Order
     * */
    @GetMapping
    public List<Order> getOrders(@RequestParam(defaultValue = "50") Integer mostRecent) {
        return dbConnector.selectOrders(mostRecent);
    }

    /**
     * Creates new orders in database
     * @param newOrder Order object to be created in database
     * */
    @PostMapping
    public void addOrder(@RequestBody Order newOrder) {

        // Create an order id if not provided by the user
        if (newOrder.orderId == null) {
            newOrder.orderId = UUID.randomUUID();
        }

        dbConnector.insertOrder(newOrder);
    }
    @GetMapping("/XorZ")
    public List<Map<String, List<Double>>> selectXorZ(@RequestParam boolean wholeday) {
        Map<String, List<Double>> reportData = dbConnector.fetchXOrZReport(wholeday);
        return List.of(reportData);
    }
}
