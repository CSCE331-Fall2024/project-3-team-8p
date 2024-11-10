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
    private RestAPIService restService;

    /**
     * Queries all menu items from database
     * @return list of MenuItem
     */
    @GetMapping("/menu-items")
    public List<MenuItem> getMenuItems() {
        return restService.selectMenuItems();
    }

    /**
    * Queries all inventory items from database
    * @return list of InventoryItem
    */
    @GetMapping("/inventory-items")
    public List<InventoryItem> getInventoryItems() {
        return restService.selectInventoryItems();
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
     * Queries employees from database
     * @return list of employee
     * */
    @GetMapping("/employees")
    public List<Employee> getEmployees() {
        return restService.selectEmployees();
    }

    /**
     * Creates new employee in database
     * @param newEmployee Employee object to be created in database
    */
    @PostMapping("/employees")
    public void addEmployee(@RequestBody Employee newEmployee) {

        // Create an employee id if not provided by the user
        if (newEmployee.employeeId == null) {
            newEmployee.employeeId = UUID.randomUUID();
        }

        restService.insertEmployee(newEmployee);
    }

    /**
     * Creates new menu item in database
     * @param newMenuItem MenuItem object to be created in database
    * */
    @PostMapping(value = "/menu-items")
    public void addMenuItem(@RequestBody MenuItem newMenuItem) {

        // Create a menu item id if not provided by the user
        if (newMenuItem.menuItemId == null) {
            newMenuItem.menuItemId = UUID.randomUUID();
        }

        restService.insertMenuItem(newMenuItem);
    }

    @PostMapping("/inventory-items")
    public void addInventoryItem(@RequestBody InventoryItem newInventoryItem) {
        restService.insertInventoryItem(newInventoryItem);
    }
    @PostMapping(value = "/orders")
    public void addOrder(@RequestBody Order newOrder) {
        System.out.println(newOrder);
        restService.insertOrder(newOrder);
    }
}
