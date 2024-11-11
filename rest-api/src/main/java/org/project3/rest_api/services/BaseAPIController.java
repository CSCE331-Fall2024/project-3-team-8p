package org.project3.rest_api.services;


import org.project3.rest_api.database.DBConnector;
import org.springframework.beans.factory.annotation.Autowired;


/**
* Serves as base class for services that expose database items through REST API endpoints
* @author Soham Nagawanshi
*/
public abstract class BaseAPIController {
    /**
     * Instance of RestService layer
     * '@autowired' automatically instantiates restService
     * */
    @Autowired
    protected DBConnector dbConnector;
}
