/*
endpoints for employee-related requests
*/
import BaseApi from "./base-api";
import Employee from "../models/Employee";
import EmployeeDict from "../models/dict-types/EmployeeDict";

export default class EmployeeApi extends BaseApi {
    constructor() {
        // Set the base menu item endpoint
        super("employee");
    }

    async getEmployeeByName(name: string): Promise<Employee | null> {
        const response = await this.apiClient.get<EmployeeDict>(`/${name}`);
        return response.data ? Employee.fromDict(response.data) : null;
    }

    /*
    Gets all menu items
    */
    async getEmployees(): Promise<Employee[]> {
        const response = await this.apiClient.get<EmployeeDict[]>("");
        return response.data
            .map((item: EmployeeDict) => Employee.fromDict(item))
            .sort((a: Employee, b: Employee) => a.name.localeCompare(b.name));
    }

    async addEmployee(employee: Employee): Promise<void> {
        await this.apiClient.post("", employee.toDict());
    }

    async updateEmployee(employee: Employee): Promise<void> {
        await this.apiClient.put("", employee.toDict());
    }
}
