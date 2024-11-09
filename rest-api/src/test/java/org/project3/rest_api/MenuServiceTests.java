package org.project3.rest_api;
import org.junit.jupiter.api.Test;


import static org.assertj.core.api.Assertions.assertThat;

/*
* Tests endpoints related to menu service
* */
public class MenuServiceTests extends RestAPIApplicationTests {


    /*
    * Checks if expected count of menu items is returned
    * */
    @Test
    void getMenuItemsReturnsCorrectCount() {
        String url = baseUrl+"menuitems";

        String rawJson = this.restTemplate.getForObject(url, String.class);
        Object[] rawArray = this.restTemplate.getForObject(url, Object[].class);

        final int EXPECTED_ITEM_COUNT = 10;
        assertThat(
                rawArray.length
        ).isGreaterThanOrEqualTo(EXPECTED_ITEM_COUNT);

        printResult(rawJson, "Menu Items");
    }



}
