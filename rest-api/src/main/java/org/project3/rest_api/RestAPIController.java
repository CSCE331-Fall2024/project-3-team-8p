package org.project3.rest_api;


import org.project3.rest_api.models.MenuItem;
import org.project3.rest_api.models.InventoryItem;
import org.project3.rest_api.models.Order;
import org.project3.rest_api.models.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;


/**
* This class exposes database items through REST API endpoints
* @author Soham Nagawanshi
*/
@RestController
@RequestMapping("api/v1")
@CrossOrigin
public class RestAPIController {
    /**
     * Instance of RestService layer
     * '@autowired' automatically instantiates restService
     * */
    @Autowired
    protected RestAPIService restService;

    /**
     * Queries all menu items from database
     * @return list of MenuItem
     */
    @GetMapping("/menu-items")
    public List<MenuItem> getMenuItems() {
        return restService.selectMenuItems();
    }



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
     * Creates new menu item in database
     * @param newMenuItem MenuItem object to be created in database
    * */
    @PostMapping("/menu-items")
    public void addMenuItem(@RequestBody MenuItem newMenuItem) {

        // Create a menu item id if not provided by the user
        if (newMenuItem.menuItemId == null) {
            newMenuItem.menuItemId = UUID.randomUUID();
        }

        restService.insertMenuItem(newMenuItem);
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
