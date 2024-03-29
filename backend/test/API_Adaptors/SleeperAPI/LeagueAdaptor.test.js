const {
  getSleeperLeague,
  getSleeperOwners,
} = require("../../../API_Adaptors/SleeperAPI/LeagueAdaptor");

// import and mock axios
const axios = require("axios");
jest.mock("axios");

// create an example of a good league
const good_league = {
  total_rosters: 10,
  name: "Test League",
  status: "in season",
  bracket_id: "123456789",
  season: "2024",
};

// example of a good owner
const good_owner_1 = {
  user_id: "user_1",
  username: "username1",
  display_name: "display_name_1",
  avatar: "avatar 1",
  metadata: {
    team_name: "team_1",
  },
};

// example of a good owner
const good_owner_2 = {
  user_id: "user_2",
  username: "username2",
  display_name: "display_name_2",
  avatar: "avatar 2",
  metadata: {
    team_name: "team_2",
  },
};

// owner missing team_name
const bad_owner = {
  user_id: "user_1",
  username: "username1",
  display_name: "display_name_1",
  avatar: "avatar 1",
  metadata: {},
};

describe("LeagueAdaptor tests", () => {
  test("getSleeperLeague: axios gives good response", async () => {
    axios.get.mockResolvedValue({
      data: good_league,
      status: 200,
    });

    expect(await getSleeperLeague(123)).toBe(good_league);
  });

  test("getSleeperLeague: axios 404 response", async () => {
    axios.get.mockRejectedValue(new Error("Unable to find league."));

    await expect(getSleeperLeague(123)).rejects.toThrow(
      "Unable to find league."
    );
  });

  test("getSleeperLeague: axios gives 200 response with no data", async () => {
    axios.get.mockResolvedValue({
      status: 200,
    });

    await expect(getSleeperLeague(123)).rejects.toThrow(
      "Unable to get data from Sleeper API."
    );
  });

  test("getSleeperLeague: axios returns a league with bad schema.", async () => {
    axios.get.mockResolvedValue({
      status: 200,
      data: {
        total_rosters: 10,
      },
    });

    await expect(getSleeperLeague(123)).rejects.toThrow(
      "Unexpected League Schema returned from Sleeper API"
    );
  });

  test("getSleeperOwners: axios gives 200 response code with good owners", async () => {
    // list of 4 owners that have all fields
    axios.get.mockResolvedValue({
      status: 200,
      data: [good_owner_1, good_owner_2, good_owner_1, good_owner_2],
    });

    expect(await getSleeperOwners(1234)).toStrictEqual([
      good_owner_1,
      good_owner_2,
      good_owner_1,
      good_owner_2,
    ]);
  });

  test("getSleeperOwners: axios throws error", async () => {
    axios.get.mockRejectedValue(new Error("Unable to find league."));

    await expect(getSleeperOwners(123)).rejects.toThrow(
      "Unable to find league."
    );
  });

  test("getSleeperOwners: axios returns object with no data", async () => {
    axios.get.mockResolvedValue({
      status: 200,
    });

    await expect(getSleeperOwners(123)).rejects.toThrow(
      "Unable to get owner info from the sleeper API."
    );
  });

  test("getSleeperOwners: axios returns an empty list", async () => {
    axios.get.mockResolvedValue({
      status: 200,
      data: [],
    });

    await expect(getSleeperOwners(123)).rejects.toThrow(
      "Unable to get owner info from the sleeper API."
    );
  });

  test("getSleeperOwners: axios returns list of owners with one having bad schema.", async () => {
    axios.get.mockResolvedValue({
      status: 200,
      data: [good_owner_1, good_owner_2, bad_owner, good_owner_1],
    });

    await expect(getSleeperOwners(123)).rejects.toThrow(
      "Unexpected League Schema returned from Sleeper API."
    );
  });
});
