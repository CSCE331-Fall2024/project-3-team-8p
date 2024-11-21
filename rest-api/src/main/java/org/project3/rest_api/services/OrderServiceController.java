package org.project3.rest_api.services;

import org.project3.rest_api.models.InventoryItem;
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
     * Updates orderToMenuItem table
     * @param orderId ID of order associated with menuItemsWithQties
     * @param menuItemsWithQties List of menu items and quantities included in order
     * */
    @PostMapping("{orderId}/menu")
    public void mapOrderToMenu(@PathVariable UUID orderId,
                               @RequestBody List<ItemWithQty> menuItemsWithQties) {

        for (ItemWithQty menuItem : menuItemsWithQties) {
            List<InventoryItem> invItems = dbConnector.selectMenuItemInventoryItems(menuItem.id);

            List<ItemWithQty> invItemsWithQty = invItems.stream().map(inventoryItem -> {
                // update stock of inventory item
                dbConnector.decreaseInventoryItemQty(inventoryItem.inventoryItemId, menuItem.quantity);
                // return an object associating each inventory item with its quantity in the order
                return new ItemWithQty(inventoryItem.inventoryItemId, menuItem.quantity);
            }).toList();

            // insert each associated inventory item into orderToInventoryItem
            dbConnector.insertOrderInventoryItems(orderId, invItemsWithQty);
        }


        // insert menu items into orderToMenuItem
        dbConnector.insertOrderMenuItems(orderId, menuItemsWithQties);

    }

}
