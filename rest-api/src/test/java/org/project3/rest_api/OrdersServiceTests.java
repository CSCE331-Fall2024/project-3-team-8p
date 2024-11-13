package org.project3.rest_api;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.project3.rest_api.models.MenuItem;
import org.project3.rest_api.models.Order;

import static org.assertj.core.api.Assertions.assertThat;

/*
* Tests endpoints related to order service
* */
public class OrdersServiceTests extends RestAPIApplicationTests{

    @BeforeEach
    void orderSetup() {
        baseUrl+="order";
    }

    /**
    * Checks if GET returns correct order count
    * */
    @Test
    void getOrderReturnsCorrectDefaultCount() {
        String url = baseUrl;

        String rawJson = this.restTemplate.getForObject(url, String.class);
        Order[] itemArray = this.restTemplate.getForObject(url, Order[].class);

        final int DEFAULT_ORDER_COUNT = 50;
        assertThat(
                itemArray.length
        ).isEqualTo(DEFAULT_ORDER_COUNT);

        printResult(rawJson, "Orders");
    }

    /**
    * Checks if GET returns correct parameterized order count
    * */
    @Test
    void getOrderReturnsCorrectParamCount() {
        int EXPECTED_ORDER_COUNT = 75;
        String url = baseUrl+"?mostRecent="+EXPECTED_ORDER_COUNT;

        String rawJson = this.restTemplate.getForObject(url, String.class);
        Order[] rawArray = this.restTemplate.getForObject(url, Order[].class);

        assertThat(rawArray.length).isEqualTo(EXPECTED_ORDER_COUNT);

        printResult(rawJson, "Orders (Parameterized)");
    }


}
