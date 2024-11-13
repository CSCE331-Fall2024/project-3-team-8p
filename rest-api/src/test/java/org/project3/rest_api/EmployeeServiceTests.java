package org.project3.rest_api;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.project3.rest_api.models.Employee;
import org.project3.rest_api.models.InventoryItem;

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
    * Checks if expected count of employees is returned
    * */
    @Test
    void getEmployeeReturnsCorrectCount() {
        String url = baseUrl;

        String rawJson = this.restTemplate.getForObject(url, String.class);
        Object[] rawArray = this.restTemplate.getForObject(url, Object[].class);

        final int EXPECTED_EMPLOYEE_COUNT = 5;
        assertThat(
                rawArray.length
        ).isGreaterThanOrEqualTo(EXPECTED_EMPLOYEE_COUNT);

        printResult(rawJson, "Employees");
    }

    /**
     * Checks if POST correctly increments employee count
     * */
    @Test
    void postEmployeeIncrementsCount() {
        String url = baseUrl;

        Employee[] oldEmpArray = this.restTemplate.getForObject(url, Employee[].class);

        final int EXPECTED_ITEM_COUNT = oldEmpArray.length + 1;

        // perform the post request
        this.restTemplate.postForObject(baseUrl,
                new Employee(
                        false,
                        "Test Employee"
                ),
                Employee.class
        );

        String rawJson = this.restTemplate.getForObject(url, String.class);
        Employee[] newEmpArray = this.restTemplate.getForObject(url, Employee[].class);

        assertThat(
                newEmpArray.length
        ).isGreaterThanOrEqualTo(EXPECTED_ITEM_COUNT);

        printResult(rawJson, "Employees");

    }

}
