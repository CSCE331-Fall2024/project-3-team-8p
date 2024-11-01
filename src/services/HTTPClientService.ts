import axios, {AxiosResponse} from 'axios';

/*
Sends GET, POST, PUT, and DELETE requests to server
*/
export class HTTPClientService {
    private readonly _baseUrl: string = "http://localhost:8080/api/v1/";

    /*
    Sends GET Requests
    @param endpoint: request endpoint
    @param successCallback: called when get request is successful
    @param failureCallback: called when get request fails
    @return returns a promise for asynchronous api call
    */
    getRequest(endpoint:string): Promise<AxiosResponse> {
        return axios.get(this._baseUrl + endpoint);
    }

    /*
    Sends POST Requests
    */
    postRequest():void{
        //TODO:
    }

    /*
    Sends PUT Requests
    */
    putRequest():void {
        //TODO:
    }

    // Sends DELETE Requests
    deleteRequest():void {
        //TODO:
    }

}