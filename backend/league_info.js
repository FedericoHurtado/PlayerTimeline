let league_id = null;

function getLeagueId() {
    return league_id;
}

function setLeagueId(id) {
    league_id = id;
}

let current_player = null;

function getCurrentPlayer() {
    return current_player;
}

function setCurrentPlayer(player) {
    current_player = player;
}

module.exports = { getLeagueId,
    setLeagueId,
    getCurrentPlayer, 
    setCurrentPlayer };