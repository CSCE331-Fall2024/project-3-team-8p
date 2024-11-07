package org.project3.rest_api;


import org.project3.rest_api.models.MenuItem;
import org.project3.rest_api.models.InventoryItem;
import org.project3.rest_api.models.Order;
import org.project3.rest_api.models.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

import java.util.List;


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
    @GetMapping("/menuitems")
    public List<MenuItem> getMenuItems() {
        return restService.selectMenuItems();
    }

    @GetMapping("/inventoryitems")
    public List<InventoryItem> getInventoryItems() {
        return restService.selectInventoryItems();
    }

    @GetMapping("/orders")
    public List<Order> getOrders(@RequestParam(defaultValue = "50") Integer mostRecent) {
        return restService.selectOrders(mostRecent);
    }

    @GetMapping("/employees")
    public List<Employee> getEmployees() {
        return restService.selectEmployees();
    }

    @PostMapping("/employees")
    public void addEmployee(
            @RequestParam (name = "employeeId", required = false) UUID employeeid,
            @RequestParam boolean isManager,
            @RequestParam String name) {
            Employee newEmployee = new Employee(employeeid, isManager, name);
        restService.insertEmployee(newEmployee);
    }
    @PostMapping("/menuitems")
    public void addMenuItem(
            @RequestParam (name = "menuItemId", required = false) UUID menuitemid,
            @RequestParam Double price,
            @RequestParam String itemName) {
        if (menuitemid == null) {
            menuitemid = UUID.randomUUID(); // Or handle as needed
        }
        MenuItem newMenuItem = new MenuItem(menuitemid, price, itemName);
        restService.insertMenuItem(newMenuItem);
    }
    @PostMapping("/inventoryitems")
    public void addInventoryItem(
            @RequestParam (name = "inventoryItemId", required = false) UUID inventoryitemid,
            @RequestParam Double cost,
            @RequestParam Integer availableStock,
            @RequestParam String itemName) {
        if (inventoryitemid == null) {
            inventoryitemid = UUID.randomUUID(); // Or handle as needed
        }
        InventoryItem newInventoryItem = new InventoryItem(inventoryitemid, cost, availableStock, itemName);
        restService.insertInventoryItem(newInventoryItem);
    }
    @PostMapping("/orders")
    public void addOrder(
            @RequestParam (name = "orderId", required = false) UUID orderid,
            @RequestParam (name = "cashierId") UUID cashierid,
            @RequestParam Integer month,
            @RequestParam Integer week,
            @RequestParam Integer day,
            @RequestParam Integer hour,
            @RequestParam Double price) {
        if (orderid == null) {
            orderid = UUID.randomUUID();
        }
        Order newOrder = new Order(orderid, cashierid, month, week, day, hour, price);
        restService.insertOrder(newOrder);
    }

}
