import BaseApi from "./base-api";
import InventoryItem from "../models/InventoryItem";
import ProductUsageDict from "../models/dict-types/ProductUsageDict";
import InventoryItemDict from "../models/dict-types/InventoryItemDict";

/**
 * API client for inventory item-specific functionality
 */
export default class InventoryItemApi extends BaseApi {
    /**
     * Constructs a new {@linkcode InventoryItemApi} instance
     */
    constructor() {
        super("inventory");
    }

    /**
     * Gets all inventory items from the backend
     * @async
     * @returns a `Promise` containing all {@linkcode InventoryItem}s
     */
    async getInventoryItems(): Promise<InventoryItem[]> {
        const response = await this.apiClient.get<InventoryItemDict[]>("");
        return response.data
            .map((item: InventoryItemDict) => InventoryItem.fromDict(item))
            .sort((a: InventoryItem, b: InventoryItem) => a.itemName.localeCompare(b.itemName));
    }

    /**
     * Adds an inventory item to the backend
     * @async
     * @param item - The inventory item to add
     */
    async addInventoryItem(item: InventoryItem): Promise<void> {
        await this.apiClient.post("", item.toDict());
    }

    /**
     * Updates an existing inventory item on the backend
     * @async
     * @param item - The item to update
     */
    async updateInventoryItem(item: InventoryItem): Promise<void> {
        await this.apiClient.put("", item.toDict());
    }

    /**
     * Gets the product usage report for a specified time period
     * @async
     * @param startMonth - The start month
     * @param endMonth - The end month
     * @param startDay - The start day
     * @param endDay - The end day
     * @returns A `Promise` containing a {@linkcode ProductUsageDict}, where:
     * - keys are inventory item names
     * - corresponding values are the amount of that item used in the specified time period
     */
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
