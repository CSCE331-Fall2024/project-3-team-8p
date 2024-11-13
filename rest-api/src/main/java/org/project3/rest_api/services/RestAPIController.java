package org.project3.rest_api.services;


import org.project3.rest_api.database.DBConnector;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


/**
* Exposes database items through REST API endpoints
* @author Soham Nagawanshi
*/
public class RestAPIController {
    /**
     * Instance of DBConnector layer
     * '@autowired' automatically instantiates dbConnector
     * */
    @Autowired
    protected DBConnector dbConnector;
}
