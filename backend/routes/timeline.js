const express = require("express");
const router = express.Router();
const leagueInfo = require('../league_info');

/****************************************
 * Endpoints to enter/access league ID
 ****************************************/

router.get("/league", (req, res) => {
    res.json(leagueInfo.getLeagueId())
});

router.post("/league", (req, res) => {
    
    // ensure 200 status code?

    // get the body of the post
    // console.log(req.body);

    const post = req.body;
    
    const league_id = post["id"];

    leagueInfo.setLeagueId(league_id);

    res.json(`League ID: ${leagueInfo.getLeagueId()}`);


});


/****************************************
 * Endpoints to access player info
 ****************************************/
router.post("/player", (req, res) => {

    // ensure 200 status code?

    const post = req.body;
    const player_name = post.name;

    leagueInfo.setCurrentPlayer(player_name);

    res.json(`Current player: ${leagueInfo.getCurrentPlayer()}`);
});

router.get("/player", (req, res) => {
    res.json(leagueInfo.getCurrentPlayer())
})

module.exports = router