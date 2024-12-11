package org.project3.rest_api.services;

import org.project3.rest_api.database.services.DBEmployeeService;
import org.project3.rest_api.models.Employee;
import org.springframework.beans.factory.annotation.Autowired;
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
/**
 * Controller class for handling employee services.
 */
public class EmployeeServiceController {
    /**
     * Default constructor for EmployeeServiceController
     */
    public EmployeeServiceController() {
        // Default constructor
    }

    /**
     * Database connector instance
     * */
    @Autowired
    DBEmployeeService dbEmployeeService;
    /**
     * Retrieves an employee by name from the database
     * @param name the name of the employee to retrieve
     * @return the employee object corresponding to the given name
     */
    @GetMapping("/{name}")
    public Employee getEmployee(@PathVariable String name) {
        return dbEmployeeService.selectEmployee(name);
    }

    /**
     * Queries employees from database
     * @return list of employee
     * */
    @GetMapping
    public List<Employee> getEmployees() {
        return dbEmployeeService.selectEmployees();
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
        dbEmployeeService.insertEmployee(newEmployee);
    }

    /**
     * Updates employees in database
     * @param updatedEmployee Employee object to be updated in database
     * */
    @PutMapping
    public void updateEmployee(@RequestBody Employee updatedEmployee) {
        //TODO: add validation for updatedEmployee's id
        dbEmployeeService.updateEmployee(updatedEmployee);
    }

}
