
// Sends GET, POST, PUT, and DELETE requests to server

// used to gain typescript typings
const axios = require('axios');

export class HTTPClientService {
    baseUrl: string = "http://localhost:8080/api/v1/";

    // Sends GET Requests
    // @param endpoint to call
    getRequest(endpoint:string) {

        axios.get(this.baseUrl + endpoint)
            .then((response: any) => {
            console.log(response);
            })
            .catch((error: any) => {
                console.log(error);
            })
            .finally(() => {
                console.log("finished executing")
            })

    }

    // Sends POST Requests

    // Sends PUT Requests

    // Sends DELETE Requests

}