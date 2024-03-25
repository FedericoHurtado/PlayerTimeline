// API ROUTES

const { getPlayerInfo } = require("../SQL/databaseUtils");
const {
  getTeamsFromLeague,
  validateLeague,
} = require("../SleeperAPI/LeagueUtils");

const express = require("express");
const router = express.Router();

// API route for validating the league
router.post("/validateLeague", async (req, res) => {
  // ensure that request body has a league_id
  if (!req.body || !req.body.league_id) {
    res.status(400).json({ error: "Missing league_id in POST body." });
  }

  // store league id
  const league_id = req.body.league_id;
  try {
    // call helper function to see if the league_id provides a good league
    const isValid = await validateLeague(league_id);

    // return results as JSON
    res.status(200).json(isValid);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Service Error" });
  }
});

/****************************************
 * Endpoints to access player info
 ****************************************/
router.post("/player", async (req, res) => {
  // ensure 200 status code?

  const post = req.body;
  const player_name = post.name;

  // map name to player id to see if it exists
  const player_info = await getPlayerInfo(player_name);

  // create a player object from response
  const player = {
    name: player_name,
    player_id: player_info.player_id,
    team: player_info.team,
    position: player_info.position,
  };

  // player not found
  if (player_info.player_id == -1) {
    res.json("Player not found.");
  } else {
    res.json(player);
  }
});

// endpoint to get league teams
router.post("/getLeagueTeams", async (req, res) => {
  // step 1: ensure req has the league_id in the request body
  if (!req.body || !req.body.league_id) {
    res
      .status(400)
      .json("Invalid request, please include a request body with a league id.");
  }

  const league_id = req.body.league_id;

  // step 2: get the teams from the given league_id

  const teams = await getTeamsFromLeague(league_id);
  console.log(teams);

  res.json(teams);
});

module.exports = router;
