import React from "react";

function TeamInfo({ team }) {
  // get data to display on top of page
  const team_record = `${team.wins}-${team.losses}-${team.ties}`;
  const team_name = team.owner_info.metadata.team_name;
  const owner_name = team.owner_info.display_name;

  return (
    <div>
      <h2> {team_name} </h2>
      <h3> Owner: {owner_name} </h3>
      <p> {team_record} </p>
    </div>
  );
}

export default TeamInfo;
