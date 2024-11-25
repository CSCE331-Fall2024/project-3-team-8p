package org.project3.rest_api.database;

import org.project3.rest_api.models.Employee;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Implements employee-related database actions
 * @author Soham Nagawanshi
 * */
@Repository
public class DBEmployeeService extends DBConnector {

    /**
     * Selects employee by name
     * @param name name of employee to select
     * @return employee named name
     * */
    public Employee selectEmployee(String name) {
        List<Employee> employees = new ArrayList<>();
        try {
            employees = executeQuery(
                    String.format(QueryTemplate.selectEmployeeByName, name),
                    SQLToJavaMapper::employeeMapper
            );
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return employees.isEmpty() ? null : employees.getFirst();
    }

    /**
     * Selects all the employees
     *
     * @return a {@code List<Employee>} of all employees
     */
    public List<Employee> selectEmployees() {
        List<Employee> items = null;
        try {
            items = executeQuery(
                    QueryTemplate.selectAllEmployees,
                    SQLToJavaMapper::employeeMapper
            );
        } catch (SQLException e) {
            e.printStackTrace();

        }
        return items;
    }

    /**
     * Updates an employee's information
     *
     * @param updatedEmployee an {@code Employee} object containing an employee's updated information
     */
    public void updateEmployee(Employee updatedEmployee) {
        executeUpdate(String.format(QueryTemplate.updateEmployee,
                updatedEmployee.isManager,
                updatedEmployee.name,
                updatedEmployee.employeeId
        ));
    }

    /**
     * Deletes an employee with given UUID
     * @param employeeId ID of menu item to be deleted
     * */
    public void deleteEmployee(UUID employeeId) {
        executeUpdate(String.format(QueryTemplate.deleteEmployee,
                employeeId
        ));
    }

    /**
     * Adds a new employee
     *
     * @param newEmployee the employee to add
     */
    public void insertEmployee(Employee newEmployee) {
        executeUpdate(String.format(QueryTemplate.insertEmployee,
                newEmployee.employeeId,
                newEmployee.isManager,
                newEmployee.name
        ));
    }

}
