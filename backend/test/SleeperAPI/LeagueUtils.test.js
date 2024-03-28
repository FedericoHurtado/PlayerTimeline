const {
  validateTeam,
  getTeamsFromLeague,
  validateLeague,
  getOwnerInfo,
  getLeagueInfo,
  allLeagues,
} = require("../../SleeperAPI/LeagueUtils");

// mock imports used in LeagueUtils
const {
  getSleeperLeague,
} = require("../../API_Adaptors/SleeperAPI/LeagueAdaptor");
const axios = require("axios");

jest.mock("../../API_Adaptors/SleeperAPI/LeagueAdaptor", () => ({
  getSleeperLeague: jest.fn(),
}));

jest.mock("axios");

describe("LeagueUtils.js unit tests", () => {
  beforeEach(() => {
    // Clears the call history of getSleeperLeague before each test
    getSleeperLeague.mockClear();
  });

  /**
   * getLeagueInfo() tests
   */

  test("getLeagueInfo: good league is returned by the adaptor", async () => {
    const good_league = {
      name: "league name",
      bracket_id: null,
      season: "2024",
      status: "pre-draft",
      total_rosters: 10,
    };

    const expected_resp = {
      num_teams: 10,
      season: "2024",
      league_name: "league name",
      status: "pre-draft",
      playoff_bracket: null,
    };

    getSleeperLeague.mockResolvedValue(good_league);

    expect(await getLeagueInfo(123)).toStrictEqual(expected_resp);
  });

  test("getLeagueInfo: adaptor returns league missing a name", async () => {
    const good_league = {
      bracket_id: null,
      season: "2024",
      status: "pre-draft",
      total_rosters: 10,
    };

    getSleeperLeague.mockResolvedValue(good_league);

    await expect(getLeagueInfo(123)).rejects.toThrow(
      "League missing some values. Check for API update."
    );
  });

  test("getLeagueInfo: adaptor throws an error", async () => {
    getSleeperLeague.mockRejectedValue(
      new Error("Error fetching the league info")
    );

    await expect(getLeagueInfo(123)).rejects.toThrow(
      "Error fetching the league info"
    );
  });

  test("allLeagues: league with previous league is given", async () => {
    const good_league = {
      bracket_id: null,
      season: "2024",
      status: "pre-draft",
      total_rosters: 10,
      previous_league_id: "234",
    };

    const prev_league = {
      bracket_id: null,
      season: "2023",
      status: "pre-draft",
      total_rosters: 10,
      previous_league_id: null,
    };

    getSleeperLeague
      .mockResolvedValueOnce(good_league) // first call will return good league
      .mockResolvedValueOnce(prev_league); // second call will return prev league

    // get results from calling allLeagues
    const leagues = await allLeagues("123");

    // ensure getSleeperLeague was called twice and that the correct league ids are returned in a list
    expect(getSleeperLeague).toHaveBeenCalledTimes(2);
    expect(leagues).toStrictEqual(["123", "234"]);
  });

  test("allLeagues: league with null previous league is given", async () => {
    const good_league = {
      bracket_id: null,
      season: "2024",
      status: "pre-draft",
      total_rosters: 10,
      previous_league_id: null,
    };

    getSleeperLeague.mockResolvedValueOnce(good_league); // first call will return good league

    // get results from calling allLeagues
    const leagues = await allLeagues("123");

    // ensure getSleeperLeague was called twice and that the correct league ids are returned in a list
    expect(getSleeperLeague).toHaveBeenCalledTimes(1);
    expect(leagues).toStrictEqual(["123"]);
  });

  test("allLeagues: getSleeperLeague throws an error", async () => {
    getSleeperLeague.mockRejectedValue(new Error("Error getting team")); //getSleeperLeague throws error

    await expect(allLeagues(123)).rejects.toThrow("Error getting team");
  });

  test("allLeagues: one league with missing previous league is given", async () => {
    const bad_league = {
      bracket_id: null,
      season: "2024",
      status: "pre-draft",
      total_rosters: 10,
    };

    getSleeperLeague.mockResolvedValueOnce(bad_league); // first call will return bad league

    // expect allLeagues to throw an error
    await expect(allLeagues(123)).rejects.toThrow(
      "Unable to find any information about previous leagues."
    );
  });

  test("allLeagues: one good league and one bad league is given", async () => {
    const good_league = {
      bracket_id: null,
      season: "2024",
      status: "pre-draft",
      total_rosters: 10,
      previous_league_id: "124",
    };

    const bad_league = {
      bracket_id: null,
      season: "2024",
      status: "pre-draft",
      total_rosters: 10,
    };

    getSleeperLeague
      .mockResolvedValueOnce(good_league) // first call will return good league
      .mockResolvedValueOnce(bad_league); // second call will return bad league

    // expect allLeagues to throw an error
    await expect(allLeagues(123)).rejects.toThrow(
      "Unable to find any information about previous leagues."
    );
  });
});

// /*****************************
//  * validateTeam() tests
//  *****************************/
// test("validateTeam: curr_team is an empty object", () => {
//   expect(validateTeam({})).toBe(false);
// });

// test("validateTeam: curr_team has all needed info", () => {
//   // create a good team that holds all needed info
//   const good_team = {
//     roster_id: 1234567,
//     players: [123, 423, 432],
//     owner_id: 12345,
//     settings: {
//       wins: 0,
//       losses: 0,
//       ties: 0,
//       fpts: 0,
//     },
//   };

//   expect(validateTeam(good_team)).toBe(true);
// });

// test("validateTeam: curr_team has no roster id", () => {
//   // create a bad team that holds no roster_id
//   const bad_team = {
//     players: [123, 423, 432],
//     owner_id: 12345,
//     settings: {
//       wins: 0,
//       losses: 0,
//       ties: 0,
//       fpts: 0,
//     },
//   };

//   expect(validateTeam(bad_team)).toBe(false);
// });

// test("validateTeam: curr_team has no players", () => {
//   // create a bad team that holds no players
//   const bad_team = {
//     roster_id: 1234,
//     players: null,
//     owner_id: 12345,
//     settings: {
//       wins: 0,
//       losses: 0,
//       ties: 0,
//       fpts: 0,
//     },
//   };

//   expect(validateTeam(bad_team)).toBe(false);
// });

// test("validateTeam: curr_team has no owner id", () => {
//   // create a bad team that holds no owner_id
//   const bad_team = {
//     roster_id: 123,
//     players: [123, 423, 432],
//     owner_id: null,
//     settings: {
//       wins: 0,
//       losses: 0,
//       ties: 0,
//       fpts: 0,
//     },
//   };

//   expect(validateTeam(bad_team)).toBe(false);
// });

// test("validateTeam: curr_team has no settings", () => {
//   // create a bad team that holds no settings
//   const bad_team = {
//     roster_id: 123,
//     players: [123, 423, 432],
//     owner_id: null,
//     settings: null,
//   };

//   expect(validateTeam(bad_team)).toBe(false);
// });

// test("validateTeam: curr_team has no wins in settings", () => {
//   // create a bad team that holds no wins in the settings object
//   const bad_team = {
//     roster_id: 123,
//     players: [123, 423, 432],
//     owner_id: null,
//     settings: {
//       losses: 0,
//       ties: 0,
//       fpts: 0,
//     },
//   };

//   expect(validateTeam(bad_team)).toBe(false);
// });

// /*****************************
//  * getTeamsFromLeague() tests
//  *****************************/
// test("getTeamsFromLeague: 3 good teams are returned by sleeper", async () => {
//   // mock a response with 3 teams containing all needed data
//   const three_good_teams = [
//     {
//       roster_id: 1234567,
//       players: [123, 423, 432],
//       owner_id: 12345,
//       settings: {
//         wins: 0,
//         losses: 0,
//         ties: 0,
//         fpts: 0,
//       },
//     },
//     {
//       roster_id: 32423,
//       players: [123, 4213, 32],
//       owner_id: 122334,
//       settings: {
//         wins: 1,
//         losses: 1,
//         ties: 0,
//         fpts: 0,
//       },
//     },
//     {
//       roster_id: 14343567,
//       players: [1233, 1223, 332],
//       owner_id: 12,
//       settings: {
//         wins: 0,
//         losses: 0,
//         ties: 10,
//         fpts: 0,
//       },
//     },
//   ];

//   // mock the resolved value of the Sleeper API call
//   axios.get.mockResolvedValue({ data: three_good_teams });

//   // ensure the return value is a list of objects with the expected structure
//   const teams = await getTeamsFromLeague(12345);
//   expect(teams).toHaveLength(three_good_teams.length);
//   expect(teams).toEqual(
//     expect.arrayContaining([
//       expect.objectContaining({
//         players: expect.any(Array),
//         roster_id: expect.any(Number),
//         points_for: expect.any(Number),
//         wins: expect.any(Number),
//         losses: expect.any(Number),
//         ties: expect.any(Number),
//         owner_id: expect.any(Number),
//       }),
//     ])
//   );
// });

// test("getTeamsFromLeague: 2 good teams and 1 bad team are returned by sleeper", async () => {
//   // mock a response with 3 teams containing all needed data
//   const sleeper_resp = [
//     {
//       roster_id: 1234567,
//       players: [123, 423, 432],
//       owner_id: 12345,
//       settings: {
//         wins: 0,
//         losses: 0,
//         ties: 0,
//         fpts: 0,
//       },
//     },
//     {
//       roster_id: 32423,
//       players: [123, 4213, 32],
//       settings: {
//         wins: 1,
//         losses: 1,
//         ties: 0,
//         fpts: 0,
//       },
//     },
//     {
//       roster_id: 14343567,
//       players: [1233, 1223, 332],
//       owner_id: 12,
//       settings: {
//         wins: 0,
//         losses: 0,
//         ties: 10,
//         fpts: 0,
//       },
//     },
//   ];

//   // mock the resolved value of the Sleeper API call
//   axios.get.mockResolvedValue({ data: sleeper_resp });

//   // ensure the return value is a list of objects with the expected structure
//   const teams = await getTeamsFromLeague(12345);
//   expect(teams).toEqual(null);
// });

// /****************************
//  *  validateLeague() tests
//  ****************************/

// test("validateLeague: League ID results in null response body from Sleeper", async () => {
//   // mock axios to return a null response from a bad sleeper ID
//   const mock_axios_resp = null;

//   // mock the GET call to return null
//   axios.get.mockResolvedValue({ data: mock_axios_resp });

//   // expect validateLeague to return false
//   expect(await validateLeague(1234)).toBe(false);
// });

// test("validateLeague: Good id, with good response from sleeper", async () => {
//   // response taken from SleeperAPI website for good request
//   mock_axios_resp = {
//     total_rosters: 12,
//     status: "in_season",
//     sport: "nfl",
//     settings: {},
//     season_type: "regular",
//     season: "2018",
//     scoring_settings: {},
//     roster_positions: [],
//     previous_league_id: "198946952535085056",
//     name: "Sleeperbot Dynasty",
//     league_id: "289646328504385536",
//     draft_id: "289646328508579840",
//     avatar: "efaefa889ae24046a53265a3c71b8b64",
//   };

//   // mock the GET call to return mock_axios_resp
//   axios.get.mockResolvedValue({ data: mock_axios_resp });

//   // expect validateLeague to return true if axios returns mock_axios_resp
//   expect(await validateLeague(1234)).toBe(true);
// });

// /************************
//  * Tests for getOwnerInfo
// //  *************************/
// test("getOwnerInfo: bad id, empty response from sleeper.", async () => {
//   axios.get.mockResolvedValue({ data: [] });

//   await expect(getOwnerInfo("123")).rejects.toThrow(
//     "No data found for the league id given."
//   );
// });

// test("getOwnerInfo: good id, 2 owners returned by sleeper", async () => {
//   // taken from sleeper API website
//   const user_1 = {
//     user_id: "<user_id>",
//     username: "<username>",
//     display_name: "<display_name>",
//     avatar: "1233456789",
//     metadata: {
//       team_name: "Dezpacito",
//     },
//     is_owner: true, // is commissioner (there can be multiple commissioners)
//   };

//   // taken from sleeper API website
//   const user_2 = {
//     user_id: "<user_id_2>",
//     username: "<username_2>",
//     display_name: "<display_name_2>",
//     avatar: "1233456789",
//     metadata: {
//       team_name: "Dezpacito",
//     },
//     is_owner: false, // is commissioner (there can be multiple commissioners)
//   };

//   axios.get.mockResolvedValue({ data: [user_1, user_2] });

//   expect(await getOwnerInfo(123)).toEqual([user_1, user_2]);
// });

// test("getOwnerInfo: error thrown by sleeper API", async () => {
//   axios.get.mockRejectedValue(new Error("Error thrown by axios"));

//   await expect(getOwnerInfo(123)).rejects.toThrow("Error thrown by axios");
// });
