import BaseApi from "./base-api";
import Employee from "../models/Employee";

export default class OrderApi extends BaseApi {
    constructor() {
        // Set the base menu item endpoint
        super("order");
    }

    /*
    Gets all menu items
    */
    async getXReport(): Promise<Record<string, number[]>> {
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
