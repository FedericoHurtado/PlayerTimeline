import React from "react";
import { useParams } from "react-router-dom";

function LeagueOverview() {
  let { leagueId } = useParams();

  return (
    <div>
      <h1>League Standings</h1>
      <p>League ID: {leagueId}</p>
      {/* Render your league data using leagueId */}
    </div>
  );
}

export default LeagueOverview;
