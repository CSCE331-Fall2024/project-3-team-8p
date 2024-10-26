package org.project3.rest_api;


import org.project3.rest_api.models.MenuItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


/**
* This class is used to expose database items through rest endpoints
* @author Soham Nagawanshi
*/
@RestController
@RequestMapping("api/v1")
public class RestAPIController {
    /**
     * Instance of RestService layer
     * autowired instantiates restService automatically
     * */
    @Autowired
    private RestAPIService restService;

    /**
     * This method is used to query all menu items from the database
     * @return list of MenuItem
     */
    @GetMapping("/menuitems")
    public List<MenuItem> getMenuItems() {
        return restService.selectMenuItems();
    }

}
