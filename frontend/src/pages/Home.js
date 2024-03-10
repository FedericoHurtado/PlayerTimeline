import React from 'react'
import axios from "axios"
import { useEffect, useState } from "react";
import PlayerDetails from './PlayerDetails';

function Home() {

    // set 3 local values -> LeagueID, leagueValid, and errorMesage
    const [league_id, setLeagueId] = useState(''); // initially create empty string as id
    const [leagueValid, setLeagueValid] = useState(false); // initially make league invalid
    const [errorMesage, setErrorMessage] = useState(''); // empty error message

    // when text changes, update the league id and reset error
    const handleTextChange = (event) => {
      setLeagueId(event.target.value);
      setErrorMessage('');
    }
  
    /**
     * On click: search for league and make sure it's valid. If the 
     * league is valid, move on to next screen. If the league is not
     * valid, display an error message. 
     */
    async function handleSearchClick() {
      try {
        // call POST to set league ID value
        await axios.post("http://localhost:3001/league/league", { id: league_id} );

        // check if league is valid
        const valid = await axios.get("http://localhost:3001/league/validate");

        // if valid, set leagueValid
        if (valid.data == true) {
          setLeagueValid(true);
        } else {
          // if not, set error message
          setErrorMessage("Invalid league ID.")
        }

      } catch (error) {
        setErrorMessage("An error occurred while attempting to reach the back end.") // show error for back end API calls
      }
    }

    // if league id is found to be valid, switch to PlayerDetails
    if (leagueValid) {
        return <PlayerDetails league_id={league_id} />;
    }

    return ( <div className="App">
    <h1> Please enter your league ID. </h1>
    <h3>Current ID: {league_id} </h3>
    <input
        type="text"
        value={league_id}
        onChange={handleTextChange}
        placeholder="Enter League ID"
      />
      <button onClick={handleSearchClick}>Search</button>
      {errorMesage && <p className="error">{errorMesage}</p>} {/* Render error message if there's an error */}
  </div> );
}

export default Home
