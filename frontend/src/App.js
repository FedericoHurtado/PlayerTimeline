import "./App.css";
import axios from "axios"
import { useEffect, useState } from "react";


function App() {

  const [league_id, setLeagueId] = useState(''); // initially create empty string as id, function setLeagueId will change it.

  useEffect(() => {
    axios.get("http://localhost:3001/timeline/league").then((response) => {
      //setLeagueId(response.data);
    })
  })

  const handleInputChange = (event) => {
    setLeagueId(event.target.value);
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

  return <div className="App">
    <h1> Please enter your league ID. </h1>
    <h3>Current ID: {league_id} </h3>
    <input
        type="text"
        value={league_id}
        onChange={handleInputChange}
        placeholder="Enter League ID"
      />
      <button onClick={handleSearchClick}>Search</button>
  </div>;
}

export default App;
