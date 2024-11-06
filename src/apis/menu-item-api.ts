/*
endpoints for menu item-related requests
*/
import { BaseApiClient } from "./base-api-client";
import MenuItem from "../models/MenuItem";

export class MenuItemApi extends BaseApiClient {
    constructor() {
        // Set the base menu item endpoint
        super("menuitems");

        // Map API JSON responses to our MenuItem model
        this.apiClient.interceptors.response.use(
            response => {
                response.data = response.data.map((item: any) => (
                    new MenuItem(
                        item.menuItemId,
                        item.price,
                        item.itemName,
                    )
                ));
                return response;
            }
        )
    }

    /*
    Gets all menu items
    */
    async getAllMenuItems(): Promise<MenuItem[]> {
        return await this.apiClient.get("");
    }
}
