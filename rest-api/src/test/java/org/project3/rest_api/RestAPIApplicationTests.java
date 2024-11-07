package org.project3.rest_api;

import static org.assertj.core.api.Assertions.assertThat;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.test.context.event.annotation.BeforeTestExecution;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class RestAPIApplicationTests {

	@Autowired
	private RestAPIController controller;

	@LocalServerPort
	private int port;

	@Autowired
	private TestRestTemplate restTemplate;

	private String baseUrl;

	String jsonPrettier(String uglyJson) {
		String prettyJson = "";
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			Object jsonObject = objectMapper.readValue(uglyJson, Object.class);
			prettyJson = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(jsonObject);
		} catch (Exception e) {
			System.out.println("An error has occured: ");
			e.printStackTrace();
		}

		return prettyJson;
	}

	void printResult(String rawJson, String name) {
		System.out.println(name+": ");
		System.out.println(
				jsonPrettier(rawJson)
		);
		System.out.println("-".repeat(100));
	}


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
		String url = baseUrl+"menuitems";

		String rawJson = this.restTemplate.getForObject(url, String.class);
		Object[] rawArray = this.restTemplate.getForObject(url, Object[].class);

		// check that there are at least 10 menu items
		assertThat(
				rawArray.length
		).isGreaterThanOrEqualTo(10);

		printResult(rawJson, "Menu Items");
	}

	@Test
	void getInventoryItemsReturnsCorrectCount() throws Exception {
		String url = baseUrl+"inventoryitems";

		String rawJson = this.restTemplate.getForObject(url, String.class);
		Object[] rawArray = this.restTemplate.getForObject(url, Object[].class);

		// check that there are at least 20 inventory items
		assertThat(
				rawArray.length
		).isGreaterThanOrEqualTo(20);

		printResult(rawJson, "Inventory Items");

	}

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
