package org.project3.rest_api.services;

import org.project3.rest_api.models.Order;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


/**
 * Exposes order-related services through endpoints
 * @author Soham Nagawanshi
 * */
@RestController
@RequestMapping("api/order-service")
@CrossOrigin
public class OrderServiceController extends RestAPIController {

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
}
