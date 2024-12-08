import BaseApi from "./base-api";
import TranslateApi from "./translate-api";
import MenuItem from "../models/MenuItem";
import SalesReportDict from "../models/dict-types/SalesReportDict";
import MenuItemDict from "../models/dict-types/MenuItemDict";

/**
 * API client for menu item-specific functionality
 */
export default class MenuItemApi extends BaseApi {
    /**
     * Private {@linkcode TranslateApi} instance, used to translate menu item names
     * @private
     */
    private readonly _translateApi: TranslateApi;

    /**
     * Constructs a new {@linkcode MenuItemApi instance}
     */
    constructor() {
        super("menu");
        this._translateApi = new TranslateApi();
    }

    /**
     * Gets all menu items from the backend
     * @async
     * @returns A `Promise` containing a list of all {@linkcode MenuItem}s
     */
    async getMenuItems(): Promise<MenuItem[]> {
        const response = await this.apiClient.get<MenuItemDict[]>("");
        const items: MenuItem[] = response.data
            .map((item: MenuItemDict) => MenuItem.fromDict(item))
            .sort((a: MenuItem, b: MenuItem) => a.itemName.localeCompare(b.itemName));

        // Fetch the translations as well, in case we need them
        await Promise.all(
            items.map(async (item: MenuItem) => {
                item.translatedItemName = await this._translateApi.translate(item.itemName, "es")
            })
        );

        return items;
    }

    /**
     * Adds a menu item to the backend
     * @async
     * @param item - The menu item to add
     */
    async addMenuItem(item: MenuItem): Promise<void> {
        await this.apiClient.post("", item.toDict());
    }

    /**
     * Updates a menu item on the backend
     * @async
     * @param item - The menu item to update
     */
    async updateMenuItem(item: MenuItem): Promise<void> {
        await this.apiClient.put("", item.toDict());
    }

    /**
     * Gets the sales report for a specified time period
     * @async
     * @param startMonth - The start month
     * @param endMonth - The end month
     * @param startDay - The start day
     * @param endDay - The end day
     * @returns A `Promise` containing a {@linkcode SalesReportDict} where:
     * - keys correspond to menu item names
     * - values correspond to the amount of that menu item sold in the specified time period
     */
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

    /**
     * Gets the current restaurant discount status (i.e. whether it's happy hour)
     * @async
     * @returns a `Promise` containing a `boolean` that is `true` if the restaurant is currently in happy hour mode,
     * otherwise `false`
     */
    async getDiscountStatus(): Promise<boolean> {
        const response = await this.apiClient.get<boolean>("discount");
        return response.data;
    }

    /**
     * Updates the restaurant's discount status
     * @async
     * @param isDiscounted - A boolean set to `true` to start happy hour mode and `false` to stop happy hour mode
     */
    async updateDiscount(isDiscounted: boolean): Promise<void> {
        await this.apiClient.put(`update-discount?isDiscounted=${isDiscounted}`);
    }
}
