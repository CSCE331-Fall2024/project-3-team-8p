package org.project3.rest_api.models;

import java.util.UUID;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Employee {
    @JsonProperty("employeeId")
    public UUID employeeId;
    @JsonProperty("isManager")
    public boolean isManager;
    @JsonProperty("name")
    public String name;

    public Employee(@JsonProperty("employeeId") UUID employeeId, @JsonProperty("isManager")boolean isManager,  @JsonProperty("name")String name) {
        this.employeeId = employeeId;
        this.isManager = isManager;
        this.name = name;
    }

    public Employee(boolean isManager, String name) {
        this(UUID.randomUUID(), isManager, name);
    }
    Employee() {

    }

}