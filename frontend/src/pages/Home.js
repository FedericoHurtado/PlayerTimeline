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
    const handleSearchClick = () => {
      // set the local league id 
      setLeagueId("1234");
  
      // call the backend api POST /league endpoint
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
