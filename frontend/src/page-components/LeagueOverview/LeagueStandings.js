import React from "react";
import { sortTeams } from "../../Utils/SortTeams";
import { useNavigate } from "react-router-dom";

function LeagueStandings({ teams }) {
  // initialize useNavigate hook
  const navigate = useNavigate();

  // sort the teams by win %
  const standings = sortTeams(teams);

  // Function to handle team click
  const handleTeamClick = (team) => {
    navigate("/TeamOverview", { state: { team } });
  };

  // return the list of teams in descending order
  return (
    <div>
      <h1>Current Season Standings</h1>
      <ul>
        {standings.map((team, index) => (
          <li
            key={index}
            onClick={() => handleTeamClick(team)}
            style={{ cursor: "pointer" }}
          >
            {team.owner_info.display_name} ({team.owner_info.metadata.team_name}
            ) - Wins: {team.wins}, Losses: {team.losses}, Ties: {team.ties}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LeagueStandings;
