import React, { useState, useEffect } from "react";
import { getLeagueTeams } from "../API-Adaptors/getTeamsAdaptor";
import { sortTeams } from "../Utils/SortTeams";

function LeagueStandings({ teams }) {
  // sort the teams by win %
  const standings = sortTeams(teams);

  // return the list of teams in descending order
  return (
    <div>
      <h1>Current Season Standings</h1>
      <ul>
        {standings.map((team, index) => (
          <li key={index}>
            {team.owner_info.display_name} ({team.owner_info.metadata.team_name}
            ) - Wins: {team.wins}, Losses: {team.losses}, Ties: {team.ties}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LeagueStandings;
