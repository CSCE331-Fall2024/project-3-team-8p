package org.project3.rest_api;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

/*
* Tests endpoints related to employee service
* */
public class EmployeeServiceTests extends RestAPIApplicationTests{

    /*
    * Checks if expected count of employees is returned
    * */
    @Test
    void getEmployeesReturnsCorrectCount() throws  Exception {
        String url = baseUrl+"employees";

        String rawJson = this.restTemplate.getForObject(url, String.class);
        Object[] rawArray = this.restTemplate.getForObject(url, Object[].class);

        final int EXPECTED_EMPLOYEE_COUNT = 5;
        assertThat(
                rawArray.length
        ).isGreaterThanOrEqualTo(EXPECTED_EMPLOYEE_COUNT);

        printResult(rawJson, "Employees");
    }
}
