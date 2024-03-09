let league_id = null;

function getLeagueId() {
    return league_id;
}

function setLeagueId(id) {
    league_id = id;
}

module.exports = { getLeagueId, setLeagueId };