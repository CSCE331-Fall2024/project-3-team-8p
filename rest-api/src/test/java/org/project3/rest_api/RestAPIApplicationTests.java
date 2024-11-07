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
	protected TestRestTemplate restTemplate;

	protected String baseUrl;

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


}
