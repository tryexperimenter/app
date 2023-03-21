/*Sources: 
Logic: https://dev.to/nagatodev/consuming-rest-api-in-react-with-axios-7j3
*/

import axios from "axios";

/*Create an instance of axios for connecting to a specific URL*/
const BackendAPI = axios.create({
  timeout: 10000, /*time in ms*/
  //Local development
  //baseURL: "http://localhost:5000/v1/",
  //Production
  baseURL: "https://api.tryexperimenter.com/v1/"
});

export { BackendAPI };
