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
test("validateTeam: curr_team is an empty object", () => {
  expect(validateTeam({})).toBe(false);
});

test("validateTeam: curr_team has all needed info", () => {
  // create a good team that holds all needed info
  const good_team = {
    roster_id: 1234567,
    players: [123, 423, 432],
    owner_id: 12345,
    settings: {
      wins: 0,
      losses: 0,
      ties: 0,
      fpts: 0,
    },
  };

  expect(validateTeam(good_team)).toBe(true);
});

test("validateTeam: curr_team has no roster id", () => {
  // create a bad team that holds no roster_id
  const bad_team = {
    players: [123, 423, 432],
    owner_id: 12345,
    settings: {
      wins: 0,
      losses: 0,
      ties: 0,
      fpts: 0,
    },
  };

  expect(validateTeam(bad_team)).toBe(false);
});

test("validateTeam: curr_team has no players", () => {
  // create a bad team that holds no players
  const bad_team = {
    roster_id: 1234,
    players: null,
    owner_id: 12345,
    settings: {
      wins: 0,
      losses: 0,
      ties: 0,
      fpts: 0,
    },
  };

  expect(validateTeam(bad_team)).toBe(false);
});

test("validateTeam: curr_team has no owner id", () => {
  // create a bad team that holds no owner_id
  const bad_team = {
    roster_id: 123,
    players: [123, 423, 432],
    owner_id: null,
    settings: {
      wins: 0,
      losses: 0,
      ties: 0,
      fpts: 0,
    },
  };

  expect(validateTeam(bad_team)).toBe(false);
});

test("validateTeam: curr_team has no settings", () => {
  // create a bad team that holds no settings
  const bad_team = {
    roster_id: 123,
    players: [123, 423, 432],
    owner_id: null,
    settings: null,
  };

  expect(validateTeam(bad_team)).toBe(false);
});

test("validateTeam: curr_team has no wins in settings", () => {
  // create a bad team that holds no wins in the settings object
  const bad_team = {
    roster_id: 123,
    players: [123, 423, 432],
    owner_id: null,
    settings: {
      losses: 0,
      ties: 0,
      fpts: 0,
    },
  };

  expect(validateTeam(bad_team)).toBe(false);
});

/*****************************
 * getTeamsFromLeague() tests
 *****************************/
test("getTeamsFromLeague: 3 good teams are returned by sleeper", async () => {
  // mock a response with 3 teams containing all needed data
  const three_good_teams = [
    {
      roster_id: 1234567,
      players: [123, 423, 432],
      owner_id: 12345,
      settings: {
        wins: 0,
        losses: 0,
        ties: 0,
        fpts: 0,
      },
    },
    {
      roster_id: 32423,
      players: [123, 4213, 32],
      owner_id: 122334,
      settings: {
        wins: 1,
        losses: 1,
        ties: 0,
        fpts: 0,
      },
    },
    {
      roster_id: 14343567,
      players: [1233, 1223, 332],
      owner_id: 12,
      settings: {
        wins: 0,
        losses: 0,
        ties: 10,
        fpts: 0,
      },
    },
  ];

  // mock the resolved value of the Sleeper API call
  axios.get.mockResolvedValue({ data: three_good_teams });

  // ensure the return value is a list of objects with the expected structure
  const teams = await getTeamsFromLeague(12345);
  expect(teams).toHaveLength(three_good_teams.length);
  expect(teams).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        players: expect.any(Array),
        roster_id: expect.any(Number),
        points_for: expect.any(Number),
        wins: expect.any(Number),
        losses: expect.any(Number),
        ties: expect.any(Number),
        owner_id: expect.any(Number),
      }),
    ])
  );
});

test("getTeamsFromLeague: 2 good teams and 1 bad team are returned by sleeper", async () => {
  // mock a response with 3 teams containing all needed data
  const sleeper_resp = [
    {
      roster_id: 1234567,
      players: [123, 423, 432],
      owner_id: 12345,
      settings: {
        wins: 0,
        losses: 0,
        ties: 0,
        fpts: 0,
      },
    },
    {
      roster_id: 32423,
      players: [123, 4213, 32],
      settings: {
        wins: 1,
        losses: 1,
        ties: 0,
        fpts: 0,
      },
    },
    {
      roster_id: 14343567,
      players: [1233, 1223, 332],
      owner_id: 12,
      settings: {
        wins: 0,
        losses: 0,
        ties: 10,
        fpts: 0,
      },
    },
  ];

  // mock the resolved value of the Sleeper API call
  axios.get.mockResolvedValue({ data: sleeper_resp });

  // ensure the return value is a list of objects with the expected structure
  const teams = await getTeamsFromLeague(12345);
  expect(teams).toEqual(null);
});

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
