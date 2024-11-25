package org.project3.rest_api;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.project3.rest_api.database.services.DBEmployeeService;
import org.project3.rest_api.models.Employee;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Arrays;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

/**
* Tests endpoints related to employee service
* */
public class EmployeeServiceTests extends RestAPIApplicationTests{

    /**
     * Database connector instance
     * */
    @Autowired
    DBEmployeeService dbEmployeeService;

    @BeforeEach
    void employeeSetup() {
        baseUrl += "employee";
    }

    /**
     * GET request for employee tests
     * */
    Employee[] getEmployees() {
       return restTemplate.getForObject(baseUrl, Employee[].class);
    }


    /**
    * Checks if expected count of employees is returned
    * */
    @Test
    void getEmployeeReturnsCorrectCount() {

        final int EXPECTED_EMPLOYEE_COUNT = dbEmployeeService.selectEmployees().size();
        assertThat(
                getEmployees().length
        ).isGreaterThanOrEqualTo(EXPECTED_EMPLOYEE_COUNT);

        printResult(getRawJson(baseUrl), "Employees");
    }

    /**
     * Checks if POST correctly increments employee count
     * */
    @Test
    void postEmployeeIncrementsCount() {

        Employee[] oldEmpArray = getEmployees();

        final int EXPECTED_ITEM_COUNT = oldEmpArray.length + 1;

        Employee newEmployee = new Employee(
                false,
                "Test Employee"
        );
        // perform the post request
        restTemplate.postForObject(baseUrl,
                newEmployee,
                Employee.class
        );

        Employee[] newEmpArray = getEmployees();

        assertThat(
                newEmpArray.length
        ).isGreaterThanOrEqualTo(EXPECTED_ITEM_COUNT);

        printResult(getRawJson(baseUrl), "Employees");

        // remove the new employee from the database after testing
        dbEmployeeService.deleteEmployee(newEmployee.employeeId);

    }

    /**
     * Checks if PUT correctly updates Employee information
     * */
    @Test
    void putEmployeeCorrectlyUpdatesInfo() {

        Employee[] oldEmpArray = getEmployees();
        int randIdx = rand.nextInt(oldEmpArray.length);

        Employee originalEmployee = oldEmpArray[randIdx];
        Employee newEmployee = new Employee(
                originalEmployee.employeeId,
                !originalEmployee.isManager,
                originalEmployee.name + " Jr."

        );

        // perform the put request
        restTemplate.put(baseUrl,
                newEmployee
        );

        // check if the new array contains the new name
        Employee[] newEmpArray = getEmployees();
        Optional<Employee> findEmployee = Arrays.stream(newEmpArray).filter(
                employee -> {
                    return employee.employeeId.equals(newEmployee.employeeId);
                }
        ).findFirst();

        // check if new employee is not null
        assertThat(findEmployee).isPresent();

        Employee safeEmp = findEmployee.get();

        // check is PUT correctly updated fields
        assertThat(
                safeEmp.name
        ).isEqualTo(newEmployee.name);
        assertThat(
                safeEmp.isManager
        ).isEqualTo(newEmployee.isManager);

        printResult(getRawJson(baseUrl), "Employees");

        // put the original employee back after testing
        restTemplate.put(baseUrl,
                originalEmployee
        );

    }

}
