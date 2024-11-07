/*
endpoints for menu item-related requests
*/
import BaseApi from "./base-api";
import MenuItem from "../models/MenuItem";

export class MenuItemApi extends BaseApi {
    constructor() {
        // Set the base menu item endpoint
        super("menuitems");

        // Map API JSON responses to our MenuItem model
        this.apiClient.interceptors.response.use(
            response => {
                return response.data.map((item: any) => (
                    new MenuItem(
                        item.menuItemId,
                        item.price,
                        item.itemName,
                    )
                ));
            }
        )
    }

    /*
    Gets all menu items
    */
    async getMenuItems(): Promise<MenuItem[]> {
        return await this.apiClient.get("");
    }
}
