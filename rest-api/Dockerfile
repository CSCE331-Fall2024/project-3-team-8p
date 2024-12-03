FROM maven:3.8.8-eclipse-temurin-21-alpine AS build
COPY . .
RUN  mvn clean package

FROM openjdk:21-slim
COPY --from=build /target/rest-api-0.0.1-SNAPSHOT.jar rest-api.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "rest-api.jar"]