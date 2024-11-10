package org.project3.rest_api.order_service;

import org.project3.rest_api.RestAPIController;
import org.project3.rest_api.models.Order;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/order-service")
@CrossOrigin
public class OrderServiceController extends RestAPIController {

    /**
     * Queries provided number of orders from database
     * @param mostRecent number of most recent orders to query
     * @return list of Order
     * */
    @GetMapping("/orders")
    public List<Order> getOrders(@RequestParam(defaultValue = "50") Integer mostRecent) {
        return restService.selectOrders(mostRecent);
    }

    /**
     * Creates new orders in database
     * @param newOrder Order object to be created in database
     * */
    @PostMapping(value = "/orders")
    public void addOrder(@RequestBody Order newOrder) {

        // Create an order id if not provided by the user
        if (newOrder.orderId == null) {
            newOrder.orderId = UUID.randomUUID();
        }

        restService.insertOrder(newOrder);
    }
}
