import axios from "axios";

const GET_TEAMS_ENDPOINT = "http://localhost:3001/getLeagueTeams"; // move to constants file in future

async function getLeagueTeams(league_id) {
  // attempt to call the backend
  try {
    const response = await axios.post(GET_TEAMS_ENDPOINT, { league_id });

    if (response.status != 200) {
      throw new Error("Error getting teams.");
    }

    return response;
  } catch (error) {
    throw error;
  }
}

export { getLeagueTeams };
