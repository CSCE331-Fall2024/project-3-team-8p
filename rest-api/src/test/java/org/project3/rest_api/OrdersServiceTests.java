package org.project3.rest_api;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class OrdersServiceTests extends RestAPIApplicationTests{
    @Test
    void getOrdersReturnsCorrectDefaultCount() throws Exception {
        String url = baseUrl+"orders";

        String rawJson = this.restTemplate.getForObject(url, String.class);
        Object[] rawArray = this.restTemplate.getForObject(url, Object[].class);

        // check that there are a default 50 orders
        assertThat(
                rawArray.length
        ).isEqualTo(50);

        printResult(rawJson, "Orders");
    }

    @Test
    void getOrdersReturnsCorrectParamCount() throws Exception {
        int numOrders = 75;
        String url = baseUrl+"orders?mostRecent="+numOrders;

        String rawJson = this.restTemplate.getForObject(url, String.class);
        Object[] rawArray = this.restTemplate.getForObject(url, Object[].class);

        assertThat(rawArray.length).isEqualTo(numOrders);

        printResult(rawJson, "Orders (Parameterized)");
    }
}
