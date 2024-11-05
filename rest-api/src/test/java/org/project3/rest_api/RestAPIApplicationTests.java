package org.project3.rest_api;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class RestAPIApplicationTests {

	@Autowired
	private RestAPIController controller;

	@LocalServerPort
	private int port;

	@Autowired
	private TestRestTemplate restTemplate;

	String baseUrl = " ";

	@BeforeEach
	public void setup() {
		baseUrl = "http://localhost:" + port + "/api/v1/";
	}
	@Test
	void contextLoads() {
		assertThat(controller).isNotNull();
	}

	@Test
	void getMenuItemsReturnsCorrectCount() throws Exception {
		// check that there are at least 10 menu items
		String url = baseUrl+"menuitems";

		assertThat(
				this.restTemplate.getForObject(url, String.class)
		).hasSizeGreaterThanOrEqualTo(10);
	}

	@Test
	void getInventoryItemsReturnsCorrectCount() throws Exception {
		// check that there are at least 20 inventory items
		String url = baseUrl+"inventoryitems";

		assertThat(
				this.restTemplate.getForObject(url, String.class)
		).hasSizeGreaterThanOrEqualTo(20);
	}

	@Test
	void getOrdersReturnsCorrectCount() throws  Exception {
		// check that there are at least 100 orders
		String url = baseUrl+"orders";

		assertThat(
				this.restTemplate.getForObject(url, String.class)
		).hasSizeGreaterThanOrEqualTo(100);
	}

	@Test
	void getEmployeesReturnsCorrectCount() throws  Exception {
		// check that there are at least 5 employees
		String url = baseUrl+"employees";

		assertThat(
				this.restTemplate.getForObject(url, String.class)
		).hasSizeGreaterThanOrEqualTo(5);
	}

}
