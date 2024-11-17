package org.project3.rest_api;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.project3.rest_api.models.Employee;
import org.project3.rest_api.models.InventoryItem;

import java.util.Arrays;
import java.util.Optional;
import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;

/**
* Tests endpoints related to employee service
* */
public class EmployeeServiceTests extends RestAPIApplicationTests{

    @BeforeEach
    void employeeSetup() {
        baseUrl += "employee";
    }

    /**
     * GET request for employee tests
     * */
    Employee[] getEmployees() {
       return this.restTemplate.getForObject(baseUrl, Employee[].class);
    }


    /**
    * Checks if expected count of employees is returned
    * */
    @Test
    void getEmployeeReturnsCorrectCount() {

        final int EXPECTED_EMPLOYEE_COUNT = 5;
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

        // perform the post request
        this.restTemplate.postForObject(baseUrl,
                new Employee(
                        false,
                        "Test Employee"
                ),
                Employee.class
        );

        Employee[] newEmpArray = getEmployees();

        assertThat(
                newEmpArray.length
        ).isGreaterThanOrEqualTo(EXPECTED_ITEM_COUNT);

        printResult(getRawJson(baseUrl), "Employees");

    }

    /**
     * Checks if PUT correctly updates Employee information
     * */
    @Test
    void putEmployeeCorrectlyUpdatesInfo() {

        Employee[] oldEmpArray = getEmployees();
        int randIdx = rand.nextInt(oldEmpArray.length);
        Employee originalEmployee = oldEmpArray[randIdx];

        final String EXPECTED_EMPLOYEE_NAME = originalEmployee.name + " Jr.";
        final Boolean EXPECTED_IS_MANAGER = !originalEmployee.isManager;

        originalEmployee.name = EXPECTED_EMPLOYEE_NAME;
        originalEmployee.isManager = EXPECTED_IS_MANAGER;

        // perform the put request
        this.restTemplate.put(baseUrl,
                originalEmployee
        );

        // check if the new array contains the new name
        Employee[] newEmpArray = getEmployees();
        Optional<Employee> newEmp = Arrays.stream(newEmpArray).filter(
                employee -> {
                    return employee.employeeId.equals(originalEmployee.employeeId);
                }
        ).findFirst();

        // check if new employee is not null
        assertThat(newEmp).isPresent();

        Employee safeEmp = newEmp.get();

        // check is PUT correctly updated fields
        assertThat(
                safeEmp.name
        ).isEqualTo(EXPECTED_EMPLOYEE_NAME);
        assertThat(
                safeEmp.isManager
        ).isEqualTo(EXPECTED_IS_MANAGER);


        printResult(getRawJson(baseUrl), "Employees");

    }

}
