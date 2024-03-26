import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateLeague } from "../API-Adaptors/validateLeagueAdaptor";

// Login page: where user will enter their league ID
function Login() {
  // set 3 local values -> LeagueID, leagueValid, and errorMesage
  const [league_id, setLeagueId] = useState(""); // initially create empty string as id
  const [errorMesage, setErrorMessage] = useState(""); // empty error message

  // used to switch pages
  const navigate = useNavigate();

  // when the text in the textbox changes, update the league id and reset error
  const handleTextChange = (event) => {
    setLeagueId(event.target.value);
    setErrorMessage("");
  };

  // on click: update the league ID, and if it is valid move to details page
  async function handleSearchClick() {
    // step 1: check that a league id was given
    if (!league_id) {
      setErrorMessage("Please enter a league ID.");
      return;
    }

    // step 2: call the validateLeague adaptor method to see if the league is valid
    const league_valid = await validateLeague(league_id);

    console.log(`league_valid = ${league_valid}`);

    if (league_valid === true) {
      navigate(`/leagueOverview/${league_id}`);
    } else {
      setErrorMessage("Invalid League ID. Please try again.");
    }
  }

  // if league is not valid, return the searchbox
  return (
    <div className="App">
      <h1> Please enter your league ID. </h1>
      <h3>Current ID: {league_id} </h3>
      <input
        type="text"
        value={league_id}
        onChange={handleTextChange}
        placeholder="Enter League ID"
      />
      <button onClick={handleSearchClick}>View League</button>
      {errorMesage && <p className="error">{errorMesage}</p>}{" "}
      {/* Render error message if there's an error */}
    </div>
  );
}

export default Login;
