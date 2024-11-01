
// implements common functionality between all services
import {HTTPClientService} from "./HTTPClientService";
import {AxiosError, AxiosResponse} from "axios";

export class APIService {

    private readonly _client: HTTPClientService = new HTTPClientService();

    // Gets menu items by calling httpclient service
    // @param successCallback: function to call when request succeeds
    // @param failureCallback: function to call when request fails
    getMenuItems(successCallback: (data: AxiosResponse) => void,
                 failureCallback:(error: AxiosError) => void): void {
         this._client.getRequest("menuitems")
             .then(successCallback)
             .catch(failureCallback);
    };

}
