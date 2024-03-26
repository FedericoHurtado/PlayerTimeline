import React from "react";
import { useLocation } from "react-router-dom";
import TeamInfo from "../page-components/TeamOverview/TeamInfo";
import RosterDetails from "../page-components/TeamOverview/RosterDetails";

const TeamOverview = () => {
  const location = useLocation();
  let { team } = location.state;

  return (
    <div>
      <div className="team_info">
        <TeamInfo team={team} />
        <RosterDetails team={team} />
      </div>
    </div>
  );
};

export default TeamOverview;
