package org.project3.rest_api.services;

import org.project3.rest_api.models.Employee;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.service.annotation.PatchExchange;

import java.util.List;
import java.util.UUID;

/**
 * Exposes employee-related services through endpoints
 * @author Soham Nagawanshi
 * */

@RestController
@RequestMapping("api/employee-service")
@CrossOrigin
public class EmployeeServiceController extends RestAPIController {

    /**
     * Queries employees from database
     * @return list of employee
     * */
    @GetMapping
    public List<Employee> getEmployees() {
        return dbConnector.selectEmployees();
    }

    /**
     * Creates new employee in database
     * @param newEmployee Employee object to be created in database
     */
    @PostMapping
    public void addEmployee(@RequestBody Employee newEmployee) {

        // Create an employee id if not provided by the user
        if (newEmployee.employeeId == null) {
            newEmployee.employeeId = UUID.randomUUID();
        }

        dbConnector.insertEmployee(newEmployee);
    }

    /**
     * Updates employees in database
     * @param employeeId ID of employee to update
     * @param newIsManager new employee position
     * @param newName new employee name
     * */
    @PutMapping
    public void updateEmployee(@PathVariable UUID employeeId,
                               @RequestParam(required = false) Boolean newIsManager,
                               @RequestParam(required = false) String newName) {
        System.out.println(employeeId);
        System.out.println(newIsManager);
        System.out.println(newName);

    }

}
