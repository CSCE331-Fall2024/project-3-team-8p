/*
endpoints for menu item-related requests
*/
import { ApiClient } from "./utils/api-client";
import { AxiosError, AxiosResponse } from "axios";

export class MenuItemApi {

    private readonly _client: ApiClient = new ApiClient();

    /* Gets menu items by calling ApiClient
    @param successCallback: function to call when request succeeds
    @param failureCallback: function to call when request fails
    */
    getMenuItems(successCallback: (data: AxiosResponse) => void,
                 failureCallback: (error: AxiosError) => void): void {
        this._client.getRequest("menuitems")
            .then(successCallback)
            .catch(failureCallback);
    };

}
