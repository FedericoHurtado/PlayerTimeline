import React from "react";
import { useLocation } from "react-router-dom";
import TeamInfo from "../page-components/TeamOverview/TeamInfo";

const TeamOverview = () => {
  const location = useLocation();
  let { team } = location.state;

  return (
    <div>
      <div className="team_info">
        <TeamInfo team={team} />
      </div>
    </div>
  );
};

export default TeamOverview;
