const mysql = require("mysql2");
let dotenv = require("dotenv");

// config environment variables
dotenv.config({
  path: "../.env",
}).parsed;

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
  })
  .promise();

async function getAllPlayers() {
  try {
    const result = await pool.query("SELECT * FROM players");
    //console.log(result);
    const rows = result[0];
    console.log(rows);

    return rows;
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

async function clearDB() {
  try {
    await pool.query("TRUNCATE TABLE players");
    console.log("Table 'players' cleared successfully.");
  } catch (error) {
    console.error("Error clearing table:", error.message);
  }
}

async function getPlayer(player_id) {
  try {
    const result = await pool.query(
      `SELECT player_name FROM players WHERE player_id = ${player_id}`
    );
    const name = result[0];
    console.log(name);

    return name;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return null;
  }
}

/**
 *
 * Function to get the player ID from a player name. Works to validate
 * if a player name exists in the database.
 *
 * @param {*} player_name
 *      The full name of the player that is being searched for
 * @returns
 *      An object representing a player and its associated info
 */
async function getPlayerInfo(player_name) {
  if (player_name === null) {
    return -1;
  }

  try {
    // Query the database to find the player ID based on the provided name
    const query =
      "SELECT player_id, team, position FROM players WHERE player_name = ?"; // Assuming 'players' is the name of your table
    const result = await pool.query(query, [player_name]);

    if (result[0][0]) {
      // If a player with the given name exists, return the player ID
      const player_id = result[0][0].player_id;
      const team = result[0][0].team;
      const position = result[0][0].position;

      return {
        team: team,
        player_id: player_id,
        position: position,
      };
    } else {
      // If no player with the given name exists, return -1
      return -1;
    }
  } catch (error) {
    console.error("Error finding player:", error);
    // Handle the error appropriately, e.g., logging, returning a specific error code, etc.
    return -1;
  }
}

async function addPlayer(player_id, player_name, team, position) {
  try {
    result = await pool.query(
      `
        INSERT INTO players (player_id, player_name, team, position)
        VALUES (?, ?, ?, ?)
        `,
      [player_id, player_name, team, position]
    );

    return result;
  } catch (error) {
    console.error("Error here: ", error.message);
  }
}

module.exports = {
  addPlayer,
  pool,
  getAllPlayers,
  getPlayer,
  clearDB,
  getPlayerInfo,
};
