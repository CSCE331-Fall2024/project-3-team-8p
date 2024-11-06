/*
endpoints for menu item-related requests
*/
import { BaseApiClient } from "./base-api-client";
import MenuItem from "../models/MenuItem";

export class MenuItemApi extends BaseApiClient {
    constructor() {
        super("menuitems");

        // Add data model mapping interceptor
        this.apiClient.interceptors.response.use(
            response => {
                const mapMenuItem = (item: any): MenuItem => {
                    return new MenuItem(
                        item.menuItemId,
                        item.price,
                        item.itemName
                    );
                };

                response.data = response.data.map(mapMenuItem);
                return response;
            }
        )
    }

    /* Gets menu items by calling ApiClient
    @param successCallback: function to call when request succeeds
    @param failureCallback: function to call when request fails
    */
    async getMenuItems(): Promise<MenuItem[]> {
        return await this.apiClient.get("");
    }
}
