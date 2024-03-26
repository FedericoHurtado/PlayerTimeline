import React from "react";
import { useLocation } from "react-router-dom";

const TeamOverview = () => {
  const location = useLocation();
  let { team } = location.state;

  return (
    <div>
      <h1> {team.owner_info.display_name} </h1>
    </div>
  );
};

export default TeamOverview;
