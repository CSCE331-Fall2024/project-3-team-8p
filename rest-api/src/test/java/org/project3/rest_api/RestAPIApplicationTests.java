package org.project3.rest_api;

import static org.assertj.core.api.Assertions.assertThat;

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

	@Test
	void contextLoads() {
		assertThat(controller).isNotNull();
	}

	@Test
	void getMenuItemsReturnsCorrectCount() throws Exception {
		System.out.print(this.restTemplate.getForObject("https://localhost:" + port + "/menuitems", String.class));
		assertThat(
				this.restTemplate.getForObject("https://localhost:" + port + "/menuitems", String.class)
		).hasSizeGreaterThanOrEqualTo(10);
	}

}
