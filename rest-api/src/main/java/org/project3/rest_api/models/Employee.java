package org.project3.rest_api.models;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class Employee {
    public UUID employeeId;
    public boolean isManager;
    public String name;

    public Employee(UUID employeeId, boolean isManager, String name){
        this.employeeId = employeeId;
        this.isManager = isManager;
        this.name = name;
    }
    public Employee(boolean isManager, String name){
        this(UUID.randomUUID(), isManager, name);
    }
   }