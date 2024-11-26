package org.project3.rest_api.models;

import java.util.UUID;

/**
 * The Employee class represents an employee in the Panda Express POS system.
 * It stores information about the employee, including their ID, whether they are a manager, and their name.
 *
 * @author Kevin Zhang
 * @author Soham Nagawanshi
 * @author Ryan Kha
 */

public class Employee {
    /**
     * Unique identifier for the employee
     */
    public UUID employeeId;

    /**
     * Boolean indicating if the employee is a manager
     */
    public boolean isManager;

    /**
     * Name of the employee
     */
    public String name;

    /**
     * Constructor to create an Employee with a specified ID.
     *
     * @param employeeId the unique ID of the employee
     * @param isManager  whether the employee is a manager
     * @param name       the name of the employee
     */
    public Employee(UUID employeeId, boolean isManager, String name) {
        this.employeeId = employeeId;
        this.isManager = isManager;
        this.name = name;
    }
    /**
     * Constructor to create an Employee with an automatically generated ID.
     *
     * @param isManager whether the employee is a manager
     * @param name      the name of the employee
     */
    public Employee(boolean isManager, String name) {
        this(UUID.randomUUID(), isManager, name);
    }
    /**
     * No-arg default constructor for Employee
     */
    public Employee() {}

}