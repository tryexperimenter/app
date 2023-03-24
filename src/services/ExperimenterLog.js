/*Sources: 
Logic: https://dev.to/nagatodev/consuming-rest-api-in-react-with-axios-7j3
*/

import { BackendAPI } from "services/APIConnections.js"; //Import our axios function to access the API
import { Honeybadger } from '@honeybadger-io/react'

/*getExperimenterLog
Note: We create an async function so that we can use "await" within the function.*/
async function getExperimenterLog({
  log_id = null,
}) {

  //Set up API call and initialize dictionary of the response from the API

  const endpoint_stub = "experimenter-log/?log_id=" + log_id
  const endpoint = BackendAPI.defaults.baseURL + endpoint_stub
  
  var dict_base_response = {
    endpoint: endpoint,
    request_type: 'get',
    api_error: true,
    data: null,
    error: null,
  };

  /*Call the API and return the response
  Note: We use await so that we wait until we've finished executing this code to continue executing later code.*/

  console.log("Calling endpoint:" + endpoint);

  var dict_response = await BackendAPI.get(endpoint_stub)
    /*If API returns successfully, log the response, update the response_dict, and return it to the variable we're creating.*/
    .then((response) => {
      console.log("API Response:");
      console.log(response);
      dict_base_response["api_error"] = false;
      dict_base_response["data"] = response.data;
      return dict_base_response;
    })
    /*If API returns an error (or API request times out because API is not accessible), log the response, update the response_dict, and return it to the variable we're creating.*/
    //Note that the honeybadger.io error boundary is not triggered here because we're catching the error here
    //https://axios-http.com/docs/handling_errors
    .catch(function (error) {

      const error_class = "App:Services:ExperimenterLog:getExperimenterLog()"
      const error_message = "API Error (endpoint: " + endpoint + "):"
      console.log("Error Class: " + error_class)
      console.log("Error Message: " + error_message)
      Honeybadger.notify(error_message, error_class)

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

      //Set api_error to true and return the dict_base_response
      dict_base_response["api_error"] = true;
      return dict_base_response;
    });

  console.log("Returning the dict_response")
  return dict_response;
}

export { getExperimenterLog }