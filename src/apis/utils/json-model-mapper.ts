/*
* Converts JSON objects to type script objects
*/
import MenuItem from "../../models/MenuItem";
import { AxiosResponse } from "axios";

export class JsonModelMapper {

    /*
    * Converts JSON to `MenuItem` model
    */
    static mapToMenuItem(response: AxiosResponse): MenuItem[] {
        return response.data.map((item: any): MenuItem => {
            return new MenuItem(
                item.menuItemId,
                item.price,
                item.itemName
            )
        });
    }
}