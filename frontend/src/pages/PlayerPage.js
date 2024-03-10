// PlayerPage.js
import React from 'react';

function PlayerPage(props) {
  // Extract leagueId from props.location.state passed from HomePage
  const { leagueId } = props.location.state;

  return (
    <div>
      <h1>Player Page</h1>
      {/* Display the league ID */}
      <p>League ID: {leagueId}</p>
      {/* Add more content for player page */}
    </div>
  );
}

export default PlayerPage;
