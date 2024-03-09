const express = require("express");
const router = express.Router();
const leagueInfo = require('../league_info');


router.get("/", (req, res) => {
    res.json("Hello World")
});



/**
 * {
 *    headers: {
 *    }
 *    body: {
 *        id: string
 *    }
 * }
 * 
 */
router.post("/", (req, res) => {
    
    // ensure 200 status code?

    // get the body of the post
    // console.log(req.body);

    const post = req.body;
    
    const league_id = post["id"];

    leagueInfo.setLeagueId(league_id);

    res.json(`League ID: ${leagueInfo.getLeagueId()}`);


});

module.exports = router