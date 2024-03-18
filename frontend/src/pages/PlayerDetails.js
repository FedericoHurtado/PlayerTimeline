import React from "react";
import SearchComponent from "./SearchComponent";

const PlayerDetails = () => {
  return (
    <div>
      <h1>Player Details</h1>
      <SearchComponent /> {/* Include the search component here */}
      {/* Other player details content */}
    </div>
  );
}

export default PlayerDetails;
