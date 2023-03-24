/*Sources: 
Logic: https://dev.to/nagatodev/consuming-rest-api-in-react-with-axios-7j3
*/

import axios from "axios";

//Create axios instance for connecting to BackendAPI

let BackendAPIURL = "";

if (process.env.REACT_APP_ENVIRONMENT === "production") {
  BackendAPIURL = process.env.REACT_APP_BACKEND_API_URL_PRODUCTION;
} 

else if (process.env.REACT_APP_ENVIRONMENT === "development") {
  BackendAPIURL = process.env.REACT_APP_BACKEND_API_URL_DEVELOPMENT;
}

console.log("BackendAPIURL: " + BackendAPIURL)

const BackendAPI = axios.create({
  timeout: 10000, /*time in ms*/
  baseURL: BackendAPIURL,
});

export { BackendAPI };
