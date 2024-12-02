/*
endpoints for inventory-related requests
*/
import BaseApi from "./base-api";
import InventoryItem from "../models/InventoryItem";
import ProductUsageDict from "../models/dict-types/ProductUsageDict";
import InventoryItemDict from "../models/dict-types/InventoryItemDict";

export default class InventoryItemApi extends BaseApi {
    constructor() {
        // Set the base menu item endpoint
        super("inventory");
    }

    /*
    Gets all menu items
    */
    async getInventoryItems(): Promise<InventoryItem[]> {
        const response = await this.apiClient.get<InventoryItemDict[]>("");
        return response.data
            .map((item: InventoryItemDict) => InventoryItem.fromDict(item))
            .sort((a: InventoryItem, b: InventoryItem) => a.itemName.localeCompare(b.itemName));
    }

    async addInventoryItem(item: InventoryItem): Promise<void> {
        await this.apiClient.post("", item.toDict());
    }

    async updateInventoryItem(item: InventoryItem): Promise<void> {
        await this.apiClient.put("", item.toDict());
    }

    async getProductUsageReport(
        startMonth: number,
        endMonth: number,
        startDay: number,
        endDay: number): Promise<ProductUsageDict> {

        const response = await this.apiClient.get<ProductUsageDict>("/product-usage", {
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
