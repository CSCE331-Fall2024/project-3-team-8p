package org.project3.rest_api;


import org.project3.rest_api.models.MenuItem;
import org.project3.rest_api.models.InventoryItem;
import org.project3.rest_api.models.Order;
import org.project3.rest_api.models.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


/**
* This class exposes database items through REST API endpoints
* @author Soham Nagawanshi
*/
@RestController
@RequestMapping("api/v1")
public class RestAPIController {
    /**
     * Instance of RestService layer
     * '@autowired' automatically instantiates restService
     * */
    @Autowired
    private RestAPIService restService;

    /**
     * Queries all menu items from database
     * @return list of MenuItem
     */
    @GetMapping("/menuitem")
    public List<MenuItem> getMenuItems() {
        return restService.selectMenuItems();
    }

    @GetMapping("/inventoryitem")
    public List<InventoryItem> getInventoryItems() {return restService.selectInventoryItems();}

    @GetMapping("/order")
    public List<Order> getOrders() {return restService.selectOrders();}

    @GetMapping("/employee")
    public List<Employee> getEmployees() {return restService.selectEmployees();}

}
