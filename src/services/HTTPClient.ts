import axios, {AxiosResponse} from 'axios';

/*
Sends GET, POST, PUT, and DELETE requests to server
*/
export class HTTPClient {
    private readonly _baseUrl: string = "http://localhost:8080/api/v1/";

    /*
    Sends GET Requests
    @param endpoint: request endpoint
    @return returns a promise AxiosResponse for asynchronous get call
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