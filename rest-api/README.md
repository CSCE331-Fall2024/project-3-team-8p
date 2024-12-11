# Build Dependencies

1. Apache Maven 3.9.9
2. OpenJDK 21.0.4
3. Spring Boot 3.4.0

# Backend Project Structure

## Main Directory Structure (src/main/java/org.project3.rest_api)
- __database__: classes that directly interact with PSQL database
- __models__: classes that represent database entities 
- __services__: classes that declare endpoints for services (menu, inventory, employee, order)

## Testing Directory (src/test/java/org.project3.rest_api)
- Tests associated with menu, inventory, employee, order services

# Running The Spring Boot Application
In the rest-api directory, you can run:

`mvn spring-boot:run`

Runs the app locally. You should be able to access APIs at

# URL and Endpoints

`http://{base_url}/api/{endpoint}`

Replace {base_url} with:
1. localhost:8080 for local development
2. deployment url for production

Replace {endpoint} with:
1. "menu" for menu item related tasks
2. "inventory" for inventory item related tasks
3. "employee" for employee related tasks
4. "order" for order related tasks

# Spring Initializr
This project was initialized with [Spring Initializr](https://start.spring.io/)


