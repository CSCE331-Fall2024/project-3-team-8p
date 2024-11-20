/*
endpoints for menu item-related requests
*/
import BaseApi from "./base-api";
import MenuItem from "../models/MenuItem";
import SalesReportData from "../models/typedefs/SalesReportData";

export default class MenuItemApi extends BaseApi {
    constructor() {
        // Set the base menu item endpoint
        super("menu");
    }

    /*
    Gets all menu items
    */
    async getMenuItems(): Promise<MenuItem[]> {
        const response = await this.apiClient.get("");
        return response.data.map((item: any) => (
            new MenuItem(
                item.menuItemId,
                item.price,
                item.itemName
            )
        ));
    }

    async addMenuItem(item: MenuItem): Promise<void> {
        const menuItemData = {
            menuItemId: item.menuItemId,
            price: item.price,
            itemName: item.itemName,
        };

        try {
            const response = await this.apiClient.post("", menuItemData);
            console.log("Response: ", response.data);
        } catch (error) {
            console.error("Error when adding menu item: " + error);
            throw error
        }
    }

    async getSalesReport(
        startMonth: number,
        endMonth: number,
        startDay: number,
        endDay: number): Promise<SalesReportData> {

        const response = await this.apiClient.get<SalesReportData>("/sales-report", {
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
