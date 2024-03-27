const axios = require("axios");

// league_sleeper
// - hit league endpoint
// - make sure wanted elements are in response as needed
// - return league object
// - throw error in case of any non-200 or missing data
async function getSleeperLeague(league_id) {
  // construct the api url
  const url = `https://api.sleeper.app/v1/league/${league_id}`;

  try {
    // call the sleeper api and get the response
    const response = await axios.get(url);

    // ensure the response has data
    if (!response || !response.data) {
      throw Error("Unable to get data from Sleeper API.");
    }

    // return the league
    return response.data;
  } catch (error) {
    // note: axios throws error on any non 200 status code
    throw error;
  }
}

// owners
// - hit rosters endpoint
// - make sure each roster has necessary info
// - return a list of objects
// - throw error in case of any non-200 or missing data

module.exports = {
  getSleeperLeague,
};
