// function to validate that a league exists
const axios = require("axios");

async function validateLeague(league_id) {

    try {
        // sleeper API returns a null body if a league id does not give a real league
        const response = await axios.get(`https://api.sleeper.app/v1/league/${league_id}`)

        return !response.body === null;


    } catch (error) {
        // in case of error, return false and log it
        console.log(error);
        return false;
    }
}

module.exports = validateLeague;