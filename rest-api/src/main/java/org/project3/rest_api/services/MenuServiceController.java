package org.project3.rest_api.services;

import org.project3.rest_api.models.MenuItem;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * Exposes menu-related services through endpoints
 * @author Soham Nagawanshi
 * */

@RestController
@RequestMapping("api/menu")
@CrossOrigin
public class MenuServiceController extends RestAPIController {

    /**
     * Queries all menu items from database
     * @return list of MenuItem
     */
    @GetMapping
    public List<MenuItem> getMenuItems() {
        return dbConnector.selectMenuItems();
    }

    /**
     * Creates new menu item in database
     * @param newMenuItem MenuItem object to be created in database
     * */
    @PostMapping
    public void addMenuItem(@RequestBody MenuItem newMenuItem) {

        // Create a menu item id if not provided by the user
        if (newMenuItem.menuItemId == null) {
            newMenuItem.menuItemId = UUID.randomUUID();
        }

        dbConnector.insertMenuItem(newMenuItem);
    }
}
