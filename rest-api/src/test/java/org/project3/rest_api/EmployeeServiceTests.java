package org.project3.rest_api;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class EmployeeServiceTests extends RestAPIApplicationTests{

    @Test
    void getEmployeesReturnsCorrectCount() throws  Exception {
        String url = baseUrl+"employees";

        String rawJson = this.restTemplate.getForObject(url, String.class);
        Object[] rawArray = this.restTemplate.getForObject(url, Object[].class);

        // check that there are at least 5 employees
        assertThat(
                rawArray.length
        ).isGreaterThanOrEqualTo(5);

        printResult(rawJson, "Employees");
    }
}
