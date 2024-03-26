import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LeagueStandings from "../page-components/LeagueOverview/LeagueStandings";
import { getLeagueTeams } from "../API-Adaptors/getTeamsAdaptor";

function LeagueOverview() {
  let { leagueId } = useParams();
  const [teams, setTeams] = useState(null); // Initially set to null to distinguish between loading and empty states

  // when the page mounts, fetch the teams
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await getLeagueTeams(leagueId);
        setTeams(response.data);
      } catch (error) {
        console.error("Failed to fetch teams", error);
        setTeams(null); // Ensure teams is set to null on error
      }
    };

    fetchTeams();
  }, []);

  return (
    <div>
      <h1>League Overview</h1>
      <p>League ID: {leagueId}</p>
      <div className="standings">
        {teams ? (
          // Render LeagueStandings if teams data is available
          <LeagueStandings teams={teams} />
        ) : (
          // Display an error message or alternative content if teams data is not available
          <p>Error finding standings or no data available.</p>
        )}
      </div>
    </div>
  );
}

export default LeagueOverview;
