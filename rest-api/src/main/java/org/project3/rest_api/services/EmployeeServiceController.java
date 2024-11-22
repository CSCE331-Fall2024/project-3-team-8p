package org.project3.rest_api.services;

import org.project3.rest_api.models.Employee;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * Exposes employee-related services through endpoints
 * @author Soham Nagawanshi
 * */

@RestController
@RequestMapping("api/employee")
@CrossOrigin
public class EmployeeServiceController extends BaseAPIController {

    @GetMapping("/{name}")
    public Employee getEmployee(@PathVariable String name) {
        return dbConnector.selectEmployee(name);
    }

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
     * @param updatedEmployee Employee object to be updated in database
     * */
    @PutMapping
    public void updateEmployee(@RequestBody Employee updatedEmployee) {
        //TODO: add validation for updatedEmployee's id
        dbConnector.updateEmployee(updatedEmployee);
    }

}
