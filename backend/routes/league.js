// API ROUTES

const { validateLeague } = require("../SleeperAPI/validateLeague");
const { getPlayerInfo } = require("../SQL/databaseUtils");

const express = require("express");
const router = express.Router();
const leagueInfo = require("../league_info");

/****************************************
 * Endpoints to enter/access league ID
 ****************************************/

// Endpoint to get league ID
router.get("/league", (req, res) => {
  res.json(leagueInfo.getLeagueId());
});

// endpoint to POST a new league ID
router.post("/league", (req, res) => {
  // obtain the request body
  const post = req.body;

  // make sure the body exists and contains an ID
  if (!post || !post.id) {
    return res
      .status(400)
      .json({ error: "Missing league ID in request body." });
  }

  // obtain league ID from request, and update it in league_info
  const league_id = post["id"];
  leagueInfo.setLeagueId(league_id);

  // return message indicating the success
  res.json(`League ID: ${leagueInfo.getLeagueId()}`);
});

// API route for validating the league
router.get("/validate", async (req, res) => {
  try {
    const league_id = leagueInfo.getLeagueId();
    const isValid = await validateLeague(league_id);

    res.json(isValid);
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
    leagueInfo.setCurrentPlayer(player_name);
    res.json(player);
  }
});

// return current player
router.get("/player", (req, res) => {
  res.json(leagueInfo.getCurrentPlayer());
});

module.exports = router;
