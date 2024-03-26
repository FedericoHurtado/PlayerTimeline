import React from "react";
import { useParams } from "react-router-dom";
import LeagueStandings from "../page-components/LeagueStandings";

function LeagueOverview() {
  let { leagueId } = useParams();

  return (
    <div>
      <h1>League Overview</h1>
      <p>League ID: {leagueId}</p>
      {/* Render your league data using leagueId */}
      <div className="standings">
        <LeagueStandings leagueId={leagueId} />
      </div>
    </div>
  );
}

export default LeagueOverview;
