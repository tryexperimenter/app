/*Sources: 
Logic: https://dev.to/nagatodev/consuming-rest-api-in-react-with-axios-7j3
*/

/*Import our Axios WebsiteAPI function to access our WebsiteAPI.*/
import { BackendAPI } from "services/APIConnections.js";

/*Create a data service function that allows us to access an API.
Note: We create an async function so that we can use "await" within the function.*/
async function ExperimentObservationsDataService({
  request_type = "GET",
  payload = null,
}) {
  console.log("Using ExperimentObservationsDataService");

  //Initialize dictionary of the response from the API
  var base_response_dict = {
    api: "BackendAPI/experiment-observations/",
    request_type: request_type,
    response_status: null,
    data: null,
    error: null,
  };

  /*Execute GET request.*/
  if (request_type === "GET") {
    console.log("GET Request");

    /*Call the API and return an updated response_dict.
    Note: We use await so that we wait until we've finished executing this code to continue executing later code.*/
    var response_dict = await BackendAPI.get("experiment-observations/?id=1")
      /*If API returns successfully, log the response, update the response_dict, and return it to the variable we're creating.*/
      .then((response) => {
        console.log("Response:");
        console.log(response);
        base_response_dict["response_status"] = "success";
        base_response_dict["data"] = response.data.data;
        return base_response_dict;
      })
      /*If API returns an error (or API request times out because API is not accessible), log the response, update the response_dict, and return it to the variable we're creating.*/
      .catch((error) => {
        console.log("Error");
        console.log(error);
        base_response_dict["response_status"] = "error";
        base_response_dict["error"] = error;
        return base_response_dict;
      });

    return response_dict;
  }

  /*Execute POST request.*/
  if (request_type === "POST") {
    console.log("POST Request");

    /*Call the API and return an updated response_dict.
    Note: We use await so that we wait until we've finished executing this code to continue executing later code.*/
    var response_dict = await BackendAPI.post("experiment-observations/", payload)
      /*If API returns successfully, log the response, update the response_dict, and return it to the variable we're creating.*/
      .then((response) => {
        console.log("Response:");
        console.log(response);
        base_response_dict["response_status"] = "success";
        base_response_dict["response"] = response;
        return base_response_dict;
      })
      /*If API returns an error (or API request times out because API is not accessible), log the response, update the response_dict, and return it to the variable we're creating.*/
      .catch((error) => {
        console.log("Error");
        console.log(error);
        base_response_dict["response_status"] = "error";
        base_response_dict["response"] = error;
        return base_response_dict;
      });

    return response_dict;
  }
}

export {ExperimentObservationsDataService}