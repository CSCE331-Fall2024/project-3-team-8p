package org.project3.rest_api;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

/*
* Tests endpoints related to order service
* */
public class OrdersServiceTests extends RestAPIApplicationTests{

    /*
    * Checks if correct default count of orders is returned
    * */
    @Test
    void getOrdersReturnsCorrectDefaultCount() throws Exception {
        String url = baseUrl+"orders";

        String rawJson = this.restTemplate.getForObject(url, String.class);
        Object[] rawArray = this.restTemplate.getForObject(url, Object[].class);

        final int DEFAULT_ORDER_COUNT = 50;
        assertThat(
                rawArray.length
        ).isEqualTo(DEFAULT_ORDER_COUNT);

        printResult(rawJson, "Orders");
    }

    /*
    * Checks if correct parameterized count of orders is returned
    * */
    @Test
    void getOrdersReturnsCorrectParamCount() throws Exception {
        int EXPECTED_ORDER_COUNT = 75;
        String url = baseUrl+"orders?mostRecent="+EXPECTED_ORDER_COUNT;

        String rawJson = this.restTemplate.getForObject(url, String.class);
        Object[] rawArray = this.restTemplate.getForObject(url, Object[].class);

        assertThat(rawArray.length).isEqualTo(EXPECTED_ORDER_COUNT);

        printResult(rawJson, "Orders (Parameterized)");
    }
}
