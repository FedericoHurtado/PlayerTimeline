const { getPlayersFromSleeper } = require("../../SleeperAPI/PlayerUtils");

const axios = require("axios");

jest.mock("axios");

const example_resp = {
  3992: {
    player_id: "3992",
    injury_start_date: null,
    oddsjam_id: null,
    search_rank: 9999999,
    sportradar_id: "",
    years_exp: 0,
    pandascore_id: null,
    position: null,
    hashtag: "#davecaldwell-NFL-FA-0",
    weight: "",
    height: "",
    first_name: "Dave",
    rotoworld_id: 9502,
    gsis_id: null,
    depth_chart_position: null,
    news_updated: null,
    birth_date: null,
    metadata: null,
    birth_state: null,
    stats_id: null,
    practice_participation: null,
    full_name: "Dave Caldwell",
    high_school: null,
    team: null,
    fantasy_data_id: 18829,
    search_full_name: "davecaldwell",
    college: null,
    yahoo_id: null,
    status: "Inactive",
    espn_id: null,
    last_name: "Caldwell",
    injury_status: null,
    rotowire_id: null,
    swish_id: null,
    fantasy_positions: null,
    number: 0,
    search_first_name: "dave",
    search_last_name: "caldwell",
    sport: "nfl",
    injury_body_part: null,
    age: null,
    active: false,
    birth_city: null,
    dl_trading_id: null,
    injury_notes: null,
    birth_country: null,
    practice_description: null,
    depth_chart_order: null,
  },
  6744: {
    player_id: "6744",
    injury_start_date: null,
    oddsjam_id: "3349E777E3F6",
    search_rank: 9999999,
    sportradar_id: "0832c8ad-0872-446f-ad6e-0e309e8443d1",
    years_exp: 7,
    pandascore_id: null,
    position: "WR",
    hashtag: "#gregward-NFL-PHI-84",
    weight: "190",
    height: "71",
    first_name: "Greg",
    rotoworld_id: 12815,
    gsis_id: "00-0033733",
    depth_chart_position: null,
    news_updated: 1701897349719,
    birth_date: "1995-07-12",
    metadata: {
      rookie_year: "2017",
    },
    birth_state: null,
    stats_id: 741292,
    practice_participation: null,
    full_name: "Greg Ward",
    high_school: "John Tyler (TX)",
    team: "PHI",
    fantasy_data_id: 19705,
    search_full_name: "gregward",
    college: "Houston",
    yahoo_id: 30715,
    status: "Inactive",
    espn_id: 3040035,
    last_name: "Ward",
    injury_status: null,
    rotowire_id: 11883,
    swish_id: 741292,
    fantasy_positions: ["WR"],
    number: 84,
    search_first_name: "greg",
    search_last_name: "ward",
    sport: "nfl",
    injury_body_part: null,
    age: 28,
    active: true,
    birth_city: null,
    dl_trading_id: null,
    injury_notes: null,
    birth_country: null,
    practice_description: null,
    depth_chart_order: null,
  },
  1591: {
    player_id: "1591",
    injury_start_date: null,
    oddsjam_id: null,
    search_rank: 9999999,
    sportradar_id: "af867ba7-f44e-4c1f-a4b3-61a9b5a7065d",
    years_exp: 7,
    pandascore_id: null,
    position: "G",
    hashtag: "#alvinbailey-NFL-FA-78",
    weight: "320",
    height: "6'3\"",
    first_name: "Alvin",
    rotoworld_id: 8690,
    gsis_id: null,
    depth_chart_position: null,
    news_updated: null,
    birth_date: "1991-08-26",
    metadata: null,
    birth_state: null,
    stats_id: null,
    practice_participation: null,
    full_name: "Alvin Bailey",
    high_school: "Broken Arrow (OK)",
    team: null,
    fantasy_data_id: 15244,
    search_full_name: "alvinbailey",
    college: "Arkansas",
    yahoo_id: 26894,
    status: "Inactive",
    espn_id: 16044,
    last_name: "Bailey",
    injury_status: null,
    rotowire_id: 8704,
    swish_id: null,
    fantasy_positions: ["OL"],
    number: 78,
    search_first_name: "alvin",
    search_last_name: "bailey",
    sport: "nfl",
    injury_body_part: null,
    age: 29,
    active: false,
    birth_city: null,
    dl_trading_id: null,
    injury_notes: null,
    birth_country: null,
    practice_description: null,
    depth_chart_order: null,
  },
};

const bad_resp = {
  3992: {
    player_id: null,
    injury_start_date: null,
    oddsjam_id: null,
    search_rank: 9999999,
    sportradar_id: "",
    years_exp: 0,
    pandascore_id: null,
    position: null,
    hashtag: "#davecaldwell-NFL-FA-0",
    weight: "",
    height: "",
    first_name: "Dave",
    rotoworld_id: 9502,
    gsis_id: null,
    depth_chart_position: null,
    news_updated: null,
    birth_date: null,
    metadata: null,
    birth_state: null,
    stats_id: null,
    practice_participation: null,
    full_name: "Dave Caldwell",
    high_school: null,
    team: null,
    fantasy_data_id: 18829,
    search_full_name: "davecaldwell",
    college: null,
    yahoo_id: null,
    status: "Inactive",
    espn_id: null,
    last_name: "Caldwell",
    injury_status: null,
    rotowire_id: null,
    swish_id: null,
    fantasy_positions: null,
    number: 0,
    search_first_name: "dave",
    search_last_name: "caldwell",
    sport: "nfl",
    injury_body_part: null,
    age: null,
    active: false,
    birth_city: null,
    dl_trading_id: null,
    injury_notes: null,
    birth_country: null,
    practice_description: null,
    depth_chart_order: null,
  },
  6744: {
    player_id: "6744",
    injury_start_date: null,
    oddsjam_id: "3349E777E3F6",
    search_rank: 9999999,
    sportradar_id: "0832c8ad-0872-446f-ad6e-0e309e8443d1",
    years_exp: 7,
    pandascore_id: null,
    position: "WR",
    hashtag: "#gregward-NFL-PHI-84",
    weight: "190",
    height: "71",
    first_name: "Greg",
    rotoworld_id: 12815,
    gsis_id: "00-0033733",
    depth_chart_position: null,
    news_updated: 1701897349719,
    birth_date: "1995-07-12",
    metadata: {
      rookie_year: "2017",
    },
    birth_state: null,
    stats_id: 741292,
    practice_participation: null,
    full_name: "Greg Ward",
    high_school: "John Tyler (TX)",
    team: "PHI",
    fantasy_data_id: 19705,
    search_full_name: "gregward",
    college: "Houston",
    yahoo_id: 30715,
    status: "Inactive",
    espn_id: 3040035,
    last_name: "Ward",
    injury_status: null,
    rotowire_id: 11883,
    swish_id: 741292,
    fantasy_positions: ["WR"],
    number: 84,
    search_first_name: "greg",
    search_last_name: "ward",
    sport: "nfl",
    injury_body_part: null,
    age: 28,
    active: true,
    birth_city: null,
    dl_trading_id: null,
    injury_notes: null,
    birth_country: null,
    practice_description: null,
    depth_chart_order: null,
  },
  1591: {
    player_id: "1591",
    injury_start_date: null,
    oddsjam_id: null,
    search_rank: 9999999,
    sportradar_id: "af867ba7-f44e-4c1f-a4b3-61a9b5a7065d",
    years_exp: 7,
    pandascore_id: null,
    position: "G",
    hashtag: "#alvinbailey-NFL-FA-78",
    weight: "320",
    height: "6'3\"",
    first_name: "Alvin",
    rotoworld_id: 8690,
    gsis_id: null,
    depth_chart_position: null,
    news_updated: null,
    birth_date: "1991-08-26",
    metadata: null,
    birth_state: null,
    stats_id: null,
    practice_participation: null,
    full_name: "Alvin Bailey",
    high_school: "Broken Arrow (OK)",
    team: null,
    fantasy_data_id: 15244,
    search_full_name: "alvinbailey",
    college: "Arkansas",
    yahoo_id: 26894,
    status: "Inactive",
    espn_id: 16044,
    last_name: "Bailey",
    injury_status: null,
    rotowire_id: 8704,
    swish_id: null,
    fantasy_positions: ["OL"],
    number: 78,
    search_first_name: "alvin",
    search_last_name: "bailey",
    sport: "nfl",
    injury_body_part: null,
    age: 29,
    active: false,
    birth_city: null,
    dl_trading_id: null,
    injury_notes: null,
    birth_country: null,
    practice_description: null,
    depth_chart_order: null,
  },
};

/*************
 * Get players from sleeper test
 */
test("getPlayersFromSleeper: 3 good players are returned", async () => {
  axios.get.mockResolvedValue({ data: example_resp });

  expected_return = [
    {
      name: "Alvin Bailey",
      player_id: "1591",
      position: "G",
      team: "N/A",
    },
    {
      name: "Dave Caldwell",
      player_id: "3992",
      position: "N/A",
      team: "N/A",
    },
    {
      name: "Greg Ward",
      player_id: "6744",
      position: "WR",
      team: "PHI",
    },
  ];

  expect(await getPlayersFromSleeper()).toStrictEqual(expected_return);
});

test("getPlayersFromSleeper: a player with no player_id is returned", async () => {
  axios.get.mockResolvedValue({ data: bad_resp });

  expect(await getPlayersFromSleeper()).toBe(null);
});