/*
endpoints for inventory-related requests
*/
import BaseApi from "./base-api";
import InventoryItem from "../models/InventoryItem";

export class InventoryItemApi extends BaseApi {
    constructor() {
        // Set the base menu item endpoint
        super("inventoryitems");

        // Map API JSON responses to our MenuItem model
        this.apiClient.interceptors.response.use(
            response => {
                return response.data.map((item: any) => (
                    new InventoryItem(
                        item.inventoryItemId,
                        item.cost,
                        item.availableStock,
                        item.itemName
                    )
                ));
            }
        )
    }

    /*
    Gets all menu items
    */
    async getInventoryItems(): Promise<InventoryItem[]> {
        return await this.apiClient.get("");
    }
}
