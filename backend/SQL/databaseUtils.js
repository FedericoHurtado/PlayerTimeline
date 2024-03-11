const mysql = require('mysql2');
let dotenv = require('dotenv');

// config environment variables
dotenv.config({
    path: ('../.env')
}).parsed;


const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB
}).promise();

async function getAllPlayers() {
    try {
        const result = await pool.query("SELECT * FROM players");
        //console.log(result);
        const rows = result[0];
        console.log(rows);
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

async function clearDB() {
    try {
        await pool.query("TRUNCATE TABLE players");
        console.log("Table 'players' cleared successfully.");
    } catch (error) {
        console.error('Error clearing table:', error.message);
    }
}

async function getPlayer(player_id) {

    try {
        const result = await pool.query(`SELECT player_name FROM players WHERE player_id = ${player_id}`);
        const name = result[0];
        console.log(name);
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }

}

async function getId(player_name) {

    if (player_name === null) {
        return -1;
    }

    try {
        // Query the database to find the player ID based on the provided name
        const query = "SELECT player_id FROM players WHERE player_name = ?"; // Assuming 'players' is the name of your table
        const result = await pool.query(query, [player_name]);

        
        if (result[0][0]) {
            // If a player with the given name exists, return the player ID
            return result[0][0].player_id;
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

async function addPlayer(player_id, player_name) {

    try {
        result = await pool.query(`
        INSERT INTO players (player_id, player_name)
        VALUES (?, ?)
        `, [player_id, player_name]);

        return result;
    } catch (error) {
        console.error(error.message);
    }

}

module.exports = { addPlayer, pool, getAllPlayers, getPlayer, clearDB, getId }

