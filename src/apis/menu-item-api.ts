/*
endpoints for menu item-related requests
*/
import BaseApi from "./base-api";
import MenuItem from "../models/MenuItem";

export class MenuItemApi extends BaseApi {
    constructor() {
        // Set the base menu item endpoint
        super("menu");
    }

    /*
    Gets all menu items
    */
    async getMenuItems(): Promise<MenuItem[]> {
        const response = await this.apiClient.get("");
        return response.data.map((item: any) => (
            new MenuItem(
                item.menuItemId,
                item.price,
                item.itemName
            )
        ));
    }

    async addMenuItem(item: MenuItem): Promise<void> {
        try {
            const menuItemData = {
                menuItemId: item.menuItemId,
                price: item.price,
                itemName: item.itemName,
            };

            this.apiClient.post("", menuItemData)
                .then(response => {
                    console.log("Response: ", response.data)
                })
                .catch(error => {
                    throw new Error("Error when adding menu item: " + error);
                })
        } catch (error) {
            console.error(error);
        }
    }
}
