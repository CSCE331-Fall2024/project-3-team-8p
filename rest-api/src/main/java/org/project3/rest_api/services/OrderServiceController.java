package org.project3.rest_api.services;

import org.project3.rest_api.database.services.DBOrderService;
import org.project3.rest_api.models.Order;
import org.springframework.beans.factory.annotation.Autowired;
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
public class OrderServiceController {


    @Autowired
    DBOrderService dbOrderService;

    /**
     * Queries provided number of orders from database
     * @param mostRecent number of most recent orders to query
     * @return list of Order
     * */
    @GetMapping
    public List<Order> getOrders(@RequestParam(defaultValue = "50") Integer mostRecent) {
        return dbOrderService.selectOrders(mostRecent);
    }

    /**
     * Creates new orders in database
     * @param newOrder Order object to be created in database
     * */
    @PostMapping
    public Order addOrder(@RequestBody Order newOrder) {

        // Create an order id if not provided by the user
        if (newOrder.orderId == null) {
            newOrder.orderId = UUID.randomUUID();
        }
        dbOrderService.insertOrder(newOrder);
        return newOrder;
    }

    /**
     * Updates order status in database
     * @param orderId ID of order to be updated
     * @param newStatus order's new status
     * */
    @PutMapping("{orderId}/updateStatus")
    public void updateOrderStatus(@PathVariable UUID orderId,
                                  @RequestParam String newStatus) {
        dbOrderService.updateOrderStatus(orderId, newStatus);
    }

    /**
     * Queries X and Z reports from database
     * @param wholeDay Boolean used to determine X or Z report
     * */
    @GetMapping("/report")
    public Map<String, List<Double>> getXOrZReport(@RequestParam boolean wholeDay) {
        return dbOrderService.fetchXOrZReport(wholeDay);
    }
}
