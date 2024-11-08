package org.project3.rest_api.models;

import java.util.UUID;

public class Employee {
    public UUID employeeId;
    public boolean isManager;
    public String name;

    // Default constructor
    public Employee() {
    }

    // Constructor with parameters
    public Employee(UUID employeeId, boolean isManager, String name) {
        this.employeeId = employeeId;
        this.isManager = isManager;
        this.name = name;
    }
}