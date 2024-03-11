// API ROUTES

const { validateLeague } = require('../APIs/validateLeague')
const { getId } = require('../SQL/databaseUtils');

const express = require("express");
const router = express.Router();
const leagueInfo = require('../league_info');

/****************************************
 * Endpoints to enter/access league ID
 ****************************************/

// Endpoint to get league ID
router.get("/league", (req, res) => {
    res.json(leagueInfo.getLeagueId())
});


// endpoint to POST a new league ID
router.post("/league", (req, res) => {
    
    // obtain the request body
    const post = req.body;
    
    // make sure the body exists and contains an ID
    if (!post || !post.id) {
        return res.status(400).json({ error: "Missing league ID in request body."});
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
        res.status(500).json({ error: 'Internal Service Error'});
    }

})


/****************************************
 * Endpoints to access player info
 ****************************************/
router.post("/player", async (req, res) => {

    // ensure 200 status code?

    const post = req.body;
    const player_name = post.name;

    // map name to player id to see if it exists 
    const player_id = await getId(player_name);

    // player not found
    if (player_id == -1) {
        res.json("Player not found.")
    } else {
        leagueInfo.setCurrentPlayer(player_name);
        res.json(player_id);        
    }

});

router.get("/player", (req, res) => {
    res.json(leagueInfo.getCurrentPlayer());
})



module.exports = router