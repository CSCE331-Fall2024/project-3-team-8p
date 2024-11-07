/*
endpoints for employee-related requests
*/
import BaseApi from "./base-api";
import Employee from "../models/Employee";

export class EmployeeApi extends BaseApi {
    constructor() {
        // Set the base menu item endpoint
        super("employees");

        // Map API JSON responses to our MenuItem model
        this.apiClient.interceptors.response.use(
            response => {
                return response.data.map((item: any) => (
                    new Employee(
                        item.employeeId,
                        item.name,
                        item.isManager,
                    )
                ));
            }
        )
    }

    /*
    Gets all menu items
    */
    async getEmployees(): Promise<Employee[]> {
        return await this.apiClient.get("");
    }
}
