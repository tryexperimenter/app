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

  //Set up API call and initialize dictionary of the response from the API

  const endpoint = BackendAPI.defaults.baseURL + endpoint_stub
  
  let dict_response = {
    endpoint: endpoint,
    request_type: request_type,
    successful_request: false,
    response: null,
    data: null,
    error: null,
  };

  /*Call the API and return the response
  Note: We use await so that we wait until we've finished executing this code to continue executing later code.*/

  /*GET*/
  if (request_type === "get") {

    console.log("Making GET request to: " + endpoint);

    dict_response = await BackendAPI.get(endpoint_stub)
      /*Success: If API returns successfully, log the response, update the response_dict, and return it to the variable we're creating.*/
      .then((response) => {
        dict_response["successful_request"] = true;
        dict_response["data"] = response.data;
        return dict_response;
      })
      /*Failure: If API returns an error (or API request times out because API is not accessible), record the error for further processing.*/
      .catch(function (error) {
        dict_response["successful_request"] = false;
        dict_response["error"] = error;
        return dict_response;
      });
  }

  /*POST*/
  if (request_type === "post") {

    console.log("Making POST request to: " + endpoint);

    dict_response = await BackendAPI.post(endpoint_stub, payload)
      /*Success: If API returns successfully, log the response, update the response_dict, and return it to the variable we're creating.*/
      .then((response) => {
        dict_response["successful_request"] = true;
        dict_response["response"] = response;
        return dict_response;
      })
      /*Failure: If API returns an error (or API request times out because API is not accessible), record the error for further processing.*/
      .catch(function (error) {
        dict_response["successful_request"] = false;
        dict_response["error"] = error;
        return dict_response;
      });
  }

  /*Successful Request: Log*/
  if (dict_response["successful_request"] === true) {
    console.log("Successful API Request")
    console.log("dict_response:")
    console.log(dict_response)
  }

  /*Failed Request: Log and Notify Honeybadger*/
  /*Situations: API returns an error OR API request times out because API is not accessible*/
  //Note that the honeybadger.io error boundary is not triggered since we caught the error above, so manually logging it here
  //https://axios-http.com/docs/handling_errors
  if (dict_response["successful_request"] === false) {

    console.log("Failed API Request")
    console.log("dict_response:")
    console.log(dict_response)

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
  return dict_response;

}

export { BackendAPIDataService }