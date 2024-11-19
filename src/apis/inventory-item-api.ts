/*
endpoints for inventory-related requests
*/
import BaseApi from "./base-api";
import InventoryItem from "../models/InventoryItem";

export default class InventoryItemApi extends BaseApi {
    constructor() {
        // Set the base menu item endpoint
        super("inventory");
    }

    /*
    Gets all menu items
    */
    async getInventoryItems(): Promise<InventoryItem[]> {
        const response = await this.apiClient.get("");
        return response.data.map((item: any) => (
            new InventoryItem(
                item.inventoryItemId,
                item.cost,
                item.availableStock,
                item.itemName
            )
        ))
    }

    async getProductUsageReport(
        startMonth: number,
        endMonth: number,
        startDay: number,
        endDay: number): Promise<Record<string, number>> {

        const response = await this.apiClient.get<Record<string, number>>("/product-usage", {
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
