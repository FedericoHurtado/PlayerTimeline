import React, { useState, useEffect } from "react";
import { getLeagueTeams } from "../API-Adaptors/getTeamsAdaptor";
import { sortTeams } from "../Utils/SortTeams";

function LeagueStandings({ leagueId }) {
  // initialize standings to an empty list initially
  const [standings, setStandings] = useState([]);

  // once the page mounts, set the standings.
  useEffect(() => {
    // get the teams from the league
    const fetchTeams = async () => {
      // get the list of teams from the adaptor
      const teams = await getLeagueTeams(leagueId); // if error getting teams, getLeagueTeams returns [] so no standings will be shown

      const sorted_teams = sortTeams(teams.data); // if error sorting teams, sortTeams returns [] so no standings will be shown

      // set standings to list of sorted teams
      setStandings(sorted_teams);
    };

    fetchTeams();
  }, []);

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
