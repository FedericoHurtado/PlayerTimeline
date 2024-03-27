const {
  getSleeperLeague,
} = require("../../API_Adaptors/SleeperAPI/LeagueAdaptor");

// import and mock axios
const axios = require("axios");
jest.mock("axios");

// create an example of a good league
const good_league = {
  league_id: "123",
  name: "Test League",
  roster: ["123", "456", "789"],
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
});
