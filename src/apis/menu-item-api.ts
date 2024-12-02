/*
endpoints for menu item-related requests
*/
import BaseApi from "./base-api";
import MenuItem from "../models/MenuItem";
import SalesReportDict from "../models/dict-types/SalesReportDict";
import MenuItemDict from "../models/dict-types/MenuItemDict";
import TranslateApi from "./translate-api";

export default class MenuItemApi extends BaseApi {
    private readonly _translateApi: TranslateApi;

    constructor() {
        // Set the base menu item endpoint
        super("menu");
        this._translateApi = new TranslateApi();
    }

    /*
    Gets all menu items
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

    async getDiscountStatus(): Promise<boolean> {
        const response = await this.apiClient.get<boolean>("discount");
        return response.data;
    }

    async updateDiscount(isDiscounted: boolean): Promise<void> {
        await this.apiClient.put(`update-discount?isDiscounted=${isDiscounted}`);
    }
}
