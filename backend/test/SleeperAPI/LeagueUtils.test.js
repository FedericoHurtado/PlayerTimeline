const {
  validateTeam,
  getTeamsFromLeague,
  validateLeague,
} = require("../../SleeperAPI/LeagueUtils");

/*****************************
 * validateTeam() tests
 *****************************/

/*****************************
 * getTeamsFromLeague() tests
 *****************************/

/****************************
 *  validateLeague() tests
 ****************************/

test("validateLeague: League ID results in null response body from Sleeper", () => {
  // need to mock axios get to have a null body
});

test("validateLeague: Empty league id", () => {
  // need to mock response to null body
});

test("validateLeague: Good id, with good response from sleeper", () => {
  // call sleeper API on postman to see a good response.data and use it here
});
