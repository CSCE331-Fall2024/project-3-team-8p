import axios from 'axios';
// Sends GET, POST, PUT, and DELETE requests to server

// used to gain typescript typings

export class HTTPClientService {
    baseUrl: string = "http://localhost:8080/api/v1/";

    // Sends GET Requests
    // @param endpoint: request endpoint
    getRequest(endpoint:string) {
        axios.get(this.baseUrl + endpoint)
            .then((response: any) => {

            })
            .catch((error: any) => {
                console.log("GET Request Error: ", error);
            })
            .finally(() => {

            })

    }

    // Sends POST Requests


    // Sends PUT Requests

    // Sends DELETE Requests

}