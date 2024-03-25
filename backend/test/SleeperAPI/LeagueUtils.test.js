const {
  validateTeam,
  getTeamsFromLeague,
  validateLeague,
} = require("../../SleeperAPI/LeagueUtils");

const axios = require("axios");

jest.mock("axios");

/*****************************
 * validateTeam() tests
 *****************************/

/*****************************
 * getTeamsFromLeague() tests
 *****************************/

/****************************
 *  validateLeague() tests
 ****************************/

test("validateLeague: League ID results in null response body from Sleeper", async () => {
  // mock axios to return a null response from a bad sleeper ID
  const mock_axios_resp = null;

  // mock the GET call to return null
  axios.get.mockResolvedValue(mock_axios_resp);

  // expect validateLeague to return false
  expect(await validateLeague(1234)).toBe(false);
});

test("validateLeague: Good id, with good response from sleeper", async () => {
  // response taken from SleeperAPI website for good request
  mock_axios_resp = {
    total_rosters: 12,
    status: "in_season",
    sport: "nfl",
    settings: {},
    season_type: "regular",
    season: "2018",
    scoring_settings: {},
    roster_positions: [],
    previous_league_id: "198946952535085056",
    name: "Sleeperbot Dynasty",
    league_id: "289646328504385536",
    draft_id: "289646328508579840",
    avatar: "efaefa889ae24046a53265a3c71b8b64",
  };

  // mock the GET call to return mock_axios_resp
  axios.get.mockResolvedValue(mock_axios_resp);

  // expect validateLeague to return true if axios returns mock_axios_resp
  expect(await validateLeague(1234)).toBe(true);
});
