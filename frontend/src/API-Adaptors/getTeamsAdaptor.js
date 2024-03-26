import axios from "axios";

const GET_TEAMS_ENDPOINT = "http://localhost:3001/getLeagueTeams"; // move to constants file in future

async function getLeagueTeams(league_id) {
  // attempt to call the backend
  try {
    const response = await axios.post(GET_TEAMS_ENDPOINT, { league_id });

    return response;
  } catch (error) {
    return [];
  }
}

export { getLeagueTeams };
