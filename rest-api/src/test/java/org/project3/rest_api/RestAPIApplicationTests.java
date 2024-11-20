package org.project3.rest_api;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;

import java.util.Random;

/**
* Parent class for service tests
* @author Soham Nagawanshi
*/
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class RestAPIApplicationTests {

	/**
	* Random port number
	* */
	@LocalServerPort
	private int port;

	/**
	* Template that calls endpoints
	* */
	@Autowired
	protected TestRestTemplate restTemplate;

	/**
	* Base url for endpoints
	* */
	protected String baseUrl;

	/**
	 * Random object for generating random numbers
	 * */
	protected Random rand = new Random();


	/**
	* Prettifies raw json input
	* @param uglyJson: raw json input
	* @return prettyJson: prettified json result
	* */
	protected String jsonPrettier(String uglyJson) {
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

	/**
	* Prints json to console
	* @param rawJson: raw json input
	* @param name: service name
	* */

	protected void printResult(String rawJson, String name) {
		System.out.println(name+": ");
		System.out.println(
				jsonPrettier(rawJson)
		);
		System.out.println("-".repeat(100));
	}

	/**
	* Builds baseurl with random port and shared endpoint
	* */
	@BeforeEach
	public void setup() {
		baseUrl = "http://localhost:" + port +"/api/";
	}

	/**
	 * Generic get request utilized by children
	 * */
	String getRawJson(String url) {
		return this.restTemplate.getForObject(url, String.class);
	}



}
