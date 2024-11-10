package org.project3.rest_api.menu_service;

import org.project3.rest_api.RestAPIController;
import org.project3.rest_api.models.MenuItem;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/menu-service")
@CrossOrigin
public class MenuServiceController extends RestAPIController {

    /**
     * Queries all menu items from database
     * @return list of MenuItem
     */
    @GetMapping
    public List<MenuItem> getMenuItems() {
        return restService.selectMenuItems();
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

        restService.insertMenuItem(newMenuItem);
    }
}
