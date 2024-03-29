const axios = require("axios");
const Ajv = require("ajv");
const { LEAGUE_SCHEMA, OWNER_SCHEMA } = require("./ResponseSchemas");

/**
 *
 * @param {*} league_id
 * @returns
 */
async function getSleeperLeague(league_id) {
  // construct the api url
  const url = `https://api.sleeper.app/v1/league/${league_id}`;

  // initialize the schema validator
  const ajv = new Ajv();
  const validate = ajv.compile(LEAGUE_SCHEMA);

  try {
    // call the sleeper api and get the response
    const response = await axios.get(url);

    // ensure the response has data
    if (!response || !response.data) {
      throw Error("Unable to get data from Sleeper API.");
    }

    const league = response.data;

    // validate that league has the expected JSON schema
    if (!validate(league)) {
      throw new Error("Unexpected League Schema returned from Sleeper API");
    }
    // return the league with a guarantee that necessary fields are present
    return league;
  } catch (error) {
    // note: axios throws error on any non 200 status code
    throw error;
  }
}

/**
 *
 * @param {*} league_id
 * @returns
 */
async function getSleeperOwners(league_id) {
  // get the url needed for sleeper API endpoint
  const url = `https://api.sleeper.app/v1/league/${league_id}/users`;

  // initialize the schema validator
  const ajv = new Ajv();
  const validate = ajv.compile(OWNER_SCHEMA);

  try {
    // use axios to call sleeper API, any non-200 status will return error
    const response = await axios.get(url);

    // ensure the response has a list of owners
    if (!response.data || response.data.length === 0) {
      throw new Error("Unable to get owner info from the sleeper API.");
    }

    owners_list = response.data;

    // validate that each owner has the needed fields
    if (!validate(owners_list)) {
      throw new Error("Unexpected League Schema returned from Sleeper API.");
    }

    // return the list of owners with a guarantee that necessary fields are present
    return owners_list;
  } catch (error) {
    // throw the axios error to the caller function
    throw error;
  }
}

module.exports = {
  getSleeperLeague,
  getSleeperOwners,
};
