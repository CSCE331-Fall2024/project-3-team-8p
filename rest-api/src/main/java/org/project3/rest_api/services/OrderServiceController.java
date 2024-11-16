package org.project3.rest_api.services;

import org.project3.rest_api.models.Order;
import org.project3.rest_api.models.wrappers.ItemWithQty;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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
     * @param menuItems List of menu items and quantities included in order
     * */
    @PostMapping
    public Order addOrder(@RequestBody Order newOrder) {

        // Create an order id if not provided by the user
        if (newOrder.orderId == null) {
            newOrder.orderId = UUID.randomUUID();
        }

        dbConnector.insertOrder(newOrder);
        return newOrder;
    }

    /**
     * Updates orderToInventoryItem table
     * @param itemsWithQties List of inventory items and quantities included in order
     * @param orderId ID of order associated with itemsWithQties
     * */
    @PostMapping("{orderId}/inventory")
    public void mapOrderToInventory(@RequestBody ItemWithQty[] itemsWithQties,
                                    @PathVariable UUID orderId) {
        dbConnector.insertOrderInventoryItems(orderId, itemsWithQties);
    }

    /**
     * Updates orderToMenuItem table
     * @param itemsWithQties List of menu items and quantities included in order
     * @param orderId ID of order associated with itemsWithQties
     * */
    @PostMapping("{orderId}/menu")
    public void mapOrderToMenu(@RequestBody )

}
