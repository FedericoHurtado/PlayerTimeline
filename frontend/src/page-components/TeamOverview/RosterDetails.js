import React, { useState, useEffect } from "react";
import { getPlayer } from "../../API-Adaptors/getPlayerAdaptor";

function RosterDetails({ team }) {
  const [playersInfo, setPlayersInfo] = useState([]);

  useEffect(() => {
    // Make sure 'team.players' is an array and has items
    if (Array.isArray(team.players) && team.players.length > 0) {
      const fetchPlayersInfo = async () => {
        // Use 'Promise.all' to wait for all getPlayer promises to resolve
        const playersData = await Promise.all(
          team.players.map((playerId) => getPlayer(playerId))
        );

        // Update state with the fetched players data
        setPlayersInfo(playersData);
      };

      fetchPlayersInfo();
    }
  }, [team]); // Depend on 'team' to re-run this effect if 'team' changes

  return (
    <div>
      <h1>Players</h1>
      <ul>
        {playersInfo.map((player, index) => (
          <li key={index}>
            {" "}
            {/* It's good practice to provide a unique 'key' prop */}
            {player.name} ({player.position})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RosterDetails;
