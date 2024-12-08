import BaseApi from "./base-api";
import Employee from "../models/Employee";
import EmployeeDict from "../models/dict-types/EmployeeDict";

/**
 * API client for employee-specific functionality
 */
export default class EmployeeApi extends BaseApi {
    /**
     * Constructs a new {@linkcode EmployeeApi} instance
     */
    constructor() {
        super("employee");
    }

    /**
     * Gets an employee from the backend with the specified name
     * @async
     * @param name - The name of the employee to find
     * @returns A `Promise` containing the employee found or `null` if no employee with the specified name was found
     */
    async getEmployeeByName(name: string): Promise<Employee | null> {
        const response = await this.apiClient.get<EmployeeDict>(`/${name}`);
        return response.data ? Employee.fromDict(response.data) : null;
    }

    /**
     * Gets all employees from the backend
     * @async
     * @returns a `Promise` containing a list of all {@linkcode Employee}s
     */
    async getEmployees(): Promise<Employee[]> {
        const response = await this.apiClient.get<EmployeeDict[]>("");
        return response.data
            .map((item: EmployeeDict) => Employee.fromDict(item))
            .sort((a: Employee, b: Employee) => a.name.localeCompare(b.name));
    }

    /**
     * Adds an employee to the backend
     * @async
     * @param employee - The employee to add
     *
     * @remarks
     * The passed in object contains all the employee's information
     */
    async addEmployee(employee: Employee): Promise<void> {
        await this.apiClient.post("", employee.toDict());
    }

    /**
     * Updates an employee on the backend
     * @param employee - The employee to update
     *
     * @remarks
     * - The passed in object contains the updated employee information
     * - The passed in object's `employeeId` must match an existing employee's ID
     */
    async updateEmployee(employee: Employee): Promise<void> {
        await this.apiClient.put("", employee.toDict());
    }
}
