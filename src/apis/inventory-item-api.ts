/*
endpoints for inventory-related requests
*/
import BaseApi from "./base-api";
import InventoryItem from "../models/InventoryItem";
import ProductUsageData from "../models/typedefs/ProductUsageData";

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
        return response.data
            .map((item: any) => (
                new InventoryItem(
                    item.inventoryItemId,
                    item.cost,
                    item.availableStock,
                    item.itemName
                )
            ))
            .sort((a: InventoryItem, b: InventoryItem) => a.itemName.localeCompare(b.itemName));
    }

    async addInventoryItem(inventoryItem: InventoryItem): Promise<void> {
        const inventoryItemData = {
            inventoryItemId: inventoryItem.inventoryItemId,
            cost: inventoryItem.cost,
            availableStock: inventoryItem.availableStock,
            itemName: inventoryItem.itemName,
        };

        await this.apiClient.post("", inventoryItemData);
    }

    async updateInventoryItem(inventoryItem: InventoryItem): Promise<void> {
        const inventoryItemData = {
            inventoryItemId: inventoryItem.inventoryItemId,
            cost: inventoryItem.cost,
            availableStock: inventoryItem.availableStock,
            itemName: inventoryItem.itemName,
        };

        await this.apiClient.put("", inventoryItemData);
    }

    async getProductUsageReport(
        startMonth: number,
        endMonth: number,
        startDay: number,
        endDay: number): Promise<ProductUsageData> {

        const response = await this.apiClient.get<ProductUsageData>("/product-usage", {
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
