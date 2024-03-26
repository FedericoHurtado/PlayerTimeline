// API ROUTES

const { getPlayerInfo, getPlayer } = require("../SQL/databaseUtils");
const {
  getTeamsFromLeague,
  validateLeague,
  getOwnerInfo,
} = require("../SleeperAPI/LeagueUtils");

const express = require("express");
const { getAllTeamData } = require("../Utils/getAllTeamData");
const router = express.Router();

// API route for validating the league
router.post("/validateLeague", async (req, res) => {
  // ensure that request body has a league_id
  if (!req.body || !req.body.league_id) {
    res.status(400).json({ error: "Missing league_id in POST body." });
    return;
  }

  // store league id
  const league_id = req.body.league_id;
  try {
    // call helper function to see if the league_id provides a good league
    const isValid = await validateLeague(league_id);

    // return results as JSON
    res.status(200).json({ isValid });
    return;
  } catch (error) {
    // handle error
    console.error(error);
    res.status(500).json({ error: "Internal Service Error" });
    return;
  }
});

/****************************************
 * Endpoints to access player info
 ****************************************/
router.post("/player", async (req, res) => {
  // ensure call contains player id in the body
  if (!req.body || !req.body.player_id) {
    res.status(400).json({ error: "Missing player_id in POST body" });
    return;
  }

  // save player name and see if it maps to a player ID from the DB.
  const player_id = req.body.player_id;
  const player_info = await getPlayer(player_id);

  // if -1 is returned, that means the player was not found
  if (player_info == -1) {
    res.status(404).json({ Error: "No player with that id is found" });
    return;
  }

  // create a player object from response
  const player = {
    name: player_info.player_name,
    player_id: player_id,
    team: player_info.team,
    position: player_info.position,
  };

  res.status(200).json({ player_found: player });
  return;
});

// endpoint to get league teams
router.post("/getLeagueTeams", async (req, res) => {
  // step 1: ensure req has the league_id in the request body
  if (!req.body || !req.body.league_id) {
    res
      .status(400)
      .json("Invalid request, please include a request body with a league id.");
  }

  // store the league id
  const league_id = req.body.league_id;

  try {
    // get the teams from that league
    const teams = await getTeamsFromLeague(league_id);

    if (teams === null) {
      res.status(404).json({ error: "Error finding teams in the league." });
      return;
    }

    // get the user data from the league
    const owners = await getOwnerInfo(league_id);

    // add owner data to teams
    const full_team_data = getAllTeamData(teams, owners);

    // return 200 status code and data found
    res.status(200).json(full_team_data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
