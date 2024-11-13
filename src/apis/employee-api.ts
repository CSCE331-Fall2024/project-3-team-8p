/*
endpoints for employee-related requests
*/
import BaseApi from "./base-api";
import Employee from "../models/Employee";

export class EmployeeApi extends BaseApi {
    constructor() {
        // Set the base menu item endpoint
        super("employee");
    }

    /*
    Gets all menu items
    */
    async getEmployees(): Promise<Employee[]> {
        const response = await this.apiClient.get("");
        return response.data.map((item: any) => (
            new Employee(
                item.employeeId,
                item.name,
                item.isManager
            )
        ))
    }
}
