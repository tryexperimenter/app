/*Sources: 
Logic: https://dev.to/nagatodev/consuming-rest-api-in-react-with-axios-7j3
*/

import { BackendAPI } from "services/APIConnections.js"; //Import our axios function to access the API
import { Honeybadger } from '@honeybadger-io/react'

/*Note: We create an async function so that we can use "await" within the function.*/
async function BackendAPIDataService({
  endpoint_stub = null,
  request_type = null,
  payload = null,
}) {

  console.log("BackendAPIDataService() called")

  //Prepare API call
  const endpoint = BackendAPI.defaults.baseURL + endpoint_stub

  console.log("endpoint: " + endpoint)
  console.log("request_type: " + request_type)
  console.log("payload: " + payload)

  //Initialize dict_response
  var dict_response = {successful_api_request: false}

  //Call API
  //Note: We use await so that we wait until we've finished executing this code to continue executing later code.*/

  /*GET*/
  if (request_type === "GET") {

    console.log("Making GET request to: " + endpoint);

    dict_response = await BackendAPI.get(endpoint_stub)

      //Success
      .then((response) => {

        return {successful_api_request: true, api_response: response};
      })

      //Failure (non-2xx response or API request timed out)
      .catch((error) => {

        return {successful_api_request: false, error: error};
        
      });

  }

  /*POST*/
  if (request_type === "POST") {

    console.log("Making POST request to: " + endpoint);

    dict_response = await BackendAPI.post(endpoint_stub, payload)

      //Success
      .then((response) => {

        return {successful_api_request: true, api_response: response};
      })

      //Failure (non-2xx response or API request timed out)
      .catch((error) => {

        return {successful_api_request: false, error: error};
        
      });

  }

  /*Successful Request: Log*/
  if (dict_response.successful_api_request === true) {
    console.log("Successful API Request")
    console.log(dict_response.api_response)
  }

  /*Failed Request: Log and Notify Honeybadger*/
  /*Situations: API returns an error OR API request times out because API is not accessible*/
  //Note that the honeybadger.io error boundary is not triggered since we caught the error above, so manually logging it here
  //https://axios-http.com/docs/handling_errors
  if (dict_response.successful_api_request === false) {

    console.log("Failed API Request")
    console.log(dict_response.error)

    const error_class = "App:Services:BackendAPIDataService()"
    const error_message = "API Error (endpoint: " + endpoint + "):"
    console.log("Error Class: " + error_class)
    console.log("Error Message: " + error_message)
    Honeybadger.notify(error_message, error_class)

    const error = dict_response["error"]

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("error.response(the request was made and the server responded with a status code that falls out of the range of 2xx):")
      console.log("error.response.data:");
      console.log(error.response.data);
      console.log("error.response.status:");
      console.log(error.response.status);
      console.log("error.response.headers:");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log("error.request(the request was made but no response was received):")
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("error.message(something happened in setting up the request that triggered an Error):")
      console.log('Error', error.message);
    }
    console.log("error.config:")
    console.log(error.config);

  }

  /*Return the response*/
  //Note that if none of the if statements above are triggered, then the dict_response will be returned as is with dict_response["successful_request"] = false
  console.log("Returning the dict_response")
  console.log("dict_response:")
  console.log(dict_response)
  return dict_response;

}

export { BackendAPIDataService }