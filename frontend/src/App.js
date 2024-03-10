import "./App.css";
import axios from "axios"
import { useEffect, useState } from "react";


function App() {

  const [league_id, setLeagueId] = useState(''); // initially create empty string as id, function setLeagueId will change it.

  useEffect(() => {
    axios.get("http://localhost:3001/timeline/league").then((response) => {
      setLeagueId(response.data);
    })
  })

  return <div className="App">
    <h1> Please enter your league ID. </h1>
  </div>;
}

export default App;
