
/*
* Converts JSON objects to type script objects
*/
import MenuItem from "../models/MenuItem";
import {AxiosResponse} from "axios";

export class JSONToTypeScriptService {

    /*
    * Converts JSON to menu items
    */
    static JSONtoMenuItem(response:AxiosResponse): MenuItem[] {
        return response.data.map((item: any):MenuItem => {
            return new MenuItem(
                        item.menuItemId,
                        item.price,
                        item.itemName
            )
        });
    }

}