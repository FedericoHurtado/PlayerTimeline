import axios from "axios";

const PLAYER_ENDPOINT = "http://localhost:3001/player"; // move to constants file in future

async function getPlayer(player_id) {
  try {
    const response = await axios.post(PLAYER_ENDPOINT, {
      player_id,
    });

    if (response.status != 200) {
      throw new Error(response.data);
    }

    return response.data.player_found;
  } catch (error) {
    throw error;
  }
}

export { getPlayer };
