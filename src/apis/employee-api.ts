/*
endpoints for employee-related requests
*/
import BaseApi from "./base-api";
import Employee from "../models/Employee";

export default class EmployeeApi extends BaseApi {
    constructor() {
        // Set the base menu item endpoint
        super("employee");
    }

    async getEmployeeByName(name: string): Promise<Employee | null> {
        const response = await this.apiClient.get(`/${name}`);
        if (response.data) {
            console.log(response.data);
            return new Employee(
                response.data.employeeId,
                response.data.name,
                response.data.isManager
            );
        }
        return null;
    }

    /*
    Gets all menu items
    */
    async getEmployees(): Promise<Employee[]> {
        const response = await this.apiClient.get("");
        return response.data
            .map((item: any) => (
                new Employee(
                    item.employeeId,
                    item.name,
                    item.isManager
                )
            ))
            .sort((a: Employee, b: Employee) => a.name.localeCompare(b.name));
    }

    async addEmployee(employee: Employee): Promise<void> {
        const employeeData = {
            employeeId: employee.id,
            isManager: employee.isManager,
            name: employee.name,
        };

        await this.apiClient.post("", employeeData);
    }

    async updateEmployee(employee: Employee): Promise<void> {
        const employeeData = {
            employeeId: employee.id,
            isManager: employee.isManager,
            name: employee.name,
        };

        await this.apiClient.put("", employeeData);
    }
}
