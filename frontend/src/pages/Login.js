import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import PlayerDetails from "./PlayerDetails";
import { useNavigate } from "react-router-dom";

const VALIDATE_ENDPOINT = "http://localhost:3001/validateLeague";

// Login page: where user will enter their league ID
function Login() {
  // set 3 local values -> LeagueID, leagueValid, and errorMesage
  const [league_id, setLeagueId] = useState(""); // initially create empty string as id
  const [leagueValid, setLeagueValid] = useState(false); // initially make league invalid
  const [errorMesage, setErrorMessage] = useState(""); // empty error message

  // used to switch pages
  const navigate = useNavigate();

  useEffect(() => {
    // Reset leagueValid to false when the component renders
    setLeagueValid(false);
  }, []);

  // when the text in the textbox changes, update the league id and reset error
  const handleTextChange = (event) => {
    setLeagueId(event.target.value);
    setErrorMessage("");
  };

  // on click: update the league ID, and if it is valid move to details page
  async function handleSearchClick() {
    try {
      // check if league is valid
      const valid = await axios.get("http://localhost:3001/league/validate");

      // if valid, set leagueValid
      if (valid.data === true) {
        setLeagueValid(true);
        navigate("/PlayerDetails");
      } else {
        // if not, set error message
        setErrorMessage("Invalid league ID.");
      }
    } catch (error) {
      setErrorMessage(
        "An error occurred while attempting to reach the back end."
      ); // show error for back end API calls
    }
  }

  // if league id is found to be valid, switch to PlayerDetails
  if (leagueValid) {
    //setLeagueValid(false); // reset home page
    return <PlayerDetails league_id={league_id} />;
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
      <button onClick={handleSearchClick}>Search</button>
      {errorMesage && <p className="error">{errorMesage}</p>}{" "}
      {/* Render error message if there's an error */}
    </div>
  );
}

export default Login;
