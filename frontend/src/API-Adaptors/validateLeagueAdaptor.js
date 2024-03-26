import axios from "axios";

const VALIDATE_ENDPOINT = "http://localhost:3001/validateLeague"; // move to constants file in future

/**
 * Function responsible for handling API call to validate league. If any changes need to
 * be made to handle API calls, it will only be done in this file
 */
async function validateLeague(league_id) {
  // attempt to call the backend
  try {
    // return the t/f value returned by the backend
    const response = await axios.post(VALIDATE_ENDPOINT, { league_id });
    return response.data === true; // return true if the response data was true
  } catch (error) {
    // in case of error, log it (find way to show to user?)
    console.log(error);
    return false;
  }
}

export { validateLeague };
