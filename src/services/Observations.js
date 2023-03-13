/*Sources: 
Logic: https://dev.to/nagatodev/consuming-rest-api-in-react-with-axios-7j3
*/

/*Import our Axios WebsiteAPI function to access our WebsiteAPI.*/
import { BackendAPI } from "services/APIConnections.js";

/*getObservations
Note: We create an async function so that we can use "await" within the function.*/
async function getObservations({
  id = null,
}) {

  const endpoint = "experiment-observations/?id=" + id

  console.log("Calling getObservations (from ObservationsDataService) at endpoint:" + endpoint);
  
  //Initialize dictionary of the response from the API
  var dict_base_response = {
    endpoint: "BackendAPI/" + endpoint,
    request_type: 'get',
    response_status: null,
    data: null,
    error: null,
  };

  /*Call the API and return an updated dict_response.
  Note: We use await so that we wait until we've finished executing this code to continue executing later code.*/
  
  var dict_response = await BackendAPI.get(endpoint)
    /*If API returns successfully, log the response, update the response_dict, and return it to the variable we're creating.*/
    .then((response) => {
      console.log("Response:");
      console.log(response);
      dict_base_response["response_status"] = "success";
      dict_base_response["data"] = response.data.data;
      return dict_base_response;
    })
    /*If API returns an error (or API request times out because API is not accessible), log the response, update the response_dict, and return it to the variable we're creating.*/
    .catch((error) => {
      console.log("Error");
      console.log(error);
      dict_base_response["response_status"] = "error";
      dict_base_response["error"] = error;
      return dict_base_response;
    });

  return dict_response;
}


export { getObservations }