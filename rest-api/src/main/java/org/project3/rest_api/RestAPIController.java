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
            @RequestParam (name = "employeeId", required = false) UUID employeeId,
            @RequestParam boolean isManager,
            @RequestParam String name) {
        Employee newEmployee;
        if (employeeId == null) {
            newEmployee = new Employee(employeeId, isManager, name);
        }
        else{
            newEmployee = new Employee(isManager, name);
        }
        restService.insertEmployee(newEmployee);
    }
    @PostMapping("/menu-items")
    public void addMenuItem(
            @RequestParam (name = "menuItemId", required = false) UUID menuitemId,
            @RequestParam Double price,
            @RequestParam String itemName) {
        MenuItem newMenuItem;
        if (menuitemId == null) {
            newMenuItem = new MenuItem(menuitemId, price, itemName);
        }
        else{
            newMenuItem = new MenuItem(price, itemName);
        }
        restService.insertMenuItem(newMenuItem);
    }
    @PostMapping("/inventory-items")
    public void addInventoryItem(
            @RequestParam (name = "inventoryItemId", required = false) UUID inventoryItemId,
            @RequestParam Double cost,
            @RequestParam Integer availableStock,
            @RequestParam String itemName) {
        InventoryItem newInventoryItem;
        if (inventoryItemId == null) {
            newInventoryItem = new InventoryItem(inventoryItemId, cost, availableStock, itemName);
        }
        else{
            newInventoryItem = new InventoryItem(cost, availableStock, itemName);
        }
        restService.insertInventoryItem(newInventoryItem);
    }
    @PostMapping("/orders")
    public void addOrder(
            @RequestParam (name = "orderId", required = false) UUID orderId,
            @RequestParam (name = "cashierId") UUID cashierId,
            @RequestParam Integer month,
            @RequestParam Integer week,
            @RequestParam Integer day,
            @RequestParam Integer hour,
            @RequestParam Double price) {
        Order newOrder;
        if (orderId == null) {
            newOrder = new Order( cashierId, month, week, day, hour, price);
        }
        else{
            newOrder = new Order(orderId, cashierId, month, week, day, hour, price);
        }
        restService.insertOrder(newOrder);
    }

}
