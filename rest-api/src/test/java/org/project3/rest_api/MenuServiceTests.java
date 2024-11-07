package org.project3.rest_api;
import org.junit.jupiter.api.Test;


import static org.assertj.core.api.Assertions.assertThat;

public class MenuServiceTests extends RestAPIApplicationTests {

    @Test
    void getMenuItemsReturnsCorrectCount() throws Exception {
        String url = baseUrl+"menuitems";

        String rawJson = this.restTemplate.getForObject(url, String.class);
        Object[] rawArray = this.restTemplate.getForObject(url, Object[].class);

        // check that there are at least 10 menu items
        assertThat(
                rawArray.length
        ).isGreaterThanOrEqualTo(10);

        printResult(rawJson, "Menu Items");
    }



}
