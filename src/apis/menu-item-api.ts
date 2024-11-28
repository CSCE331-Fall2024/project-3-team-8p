/*
endpoints for menu item-related requests
*/
import BaseApi from "./base-api";
import MenuItem from "../models/MenuItem";
import SalesReportDict from "../models/dict-types/SalesReportDict";
import MenuItemDict from "../models/dict-types/MenuItemDict";

export default class MenuItemApi extends BaseApi {
    constructor() {
        // Set the base menu item endpoint
        super("menu");
    }

    /*
    Gets all menu items
    */
    async getMenuItems(): Promise<MenuItem[]> {
        const response = await this.apiClient.get<MenuItemDict[]>("");
        return response.data
            .map((item: MenuItemDict) => MenuItem.fromDict(item))
            .sort((a: MenuItem, b: MenuItem) => a.itemName.localeCompare(b.itemName));
    }

    async addMenuItem(item: MenuItem): Promise<void> {
        await this.apiClient.post("", item.toDict());
    }

    async updateMenuItem(item: MenuItem): Promise<void> {
        await this.apiClient.put("", item.toDict());
    }

    async getSalesReport(
        startMonth: number,
        endMonth: number,
        startDay: number,
        endDay: number): Promise<SalesReportDict> {

        const response = await this.apiClient.get<SalesReportDict>("/sales-report", {
            params: {
                startMonth: startMonth,
                endMonth: endMonth,
                startDay: startDay,
                endDay: endDay,
            }
        });
        return response.data;
    }
}
