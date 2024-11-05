
/*
implements common functionality between all services
*/
import {HTTPClient} from "./HTTPClient";
import {AxiosError, AxiosResponse} from "axios";

export class MenuItemService {

    private readonly _client: HTTPClient = new HTTPClient();

    /*Gets menu items by calling httpclient service
    @param successCallback: function to call when request succeeds
    @param failureCallback: function to call when request fails
    */
    getMenuItems(successCallback: (data: AxiosResponse) => void,
                 failureCallback:(error: AxiosError) => void): void {
         this._client.getRequest("menuitems")
             .then(successCallback)
             .catch(failureCallback);
    };

}
