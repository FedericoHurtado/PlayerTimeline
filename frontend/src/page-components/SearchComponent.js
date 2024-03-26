import React, { useState } from "react";
import axios from "axios";

/**
 * Component that creates a search bar for a player name
 * and calls the backend to get results.
 */
const SearchComponent = () => {

  const [searchQuery, setSearchQuery] = useState(""); // state of value in text box
  const [player, setPlayer] = useState(null); // state of player being shown
  const [error, setError] = useState(null); // state of error

  // function to call once the user hits the search button
  const handleSearch = async () => {
    try {
    
      // call the POST player endpoint  
      const response = await axios.post("http://localhost:3001/league/player", {
        name: searchQuery,
      });

      // set the player object to the reponse data

      // TODO: check for null player -> currently player being set to empty
      // TODO: return the player to PlayerDetails page
      setPlayer(response.data);
      setError(null);
    } catch (error) {
      // handle error
      console.log(error);
      setPlayer(null);
      setError("Player not found.");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Enter player's name"
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p>{error}</p>}
      {player && (
        <div>
          <p>Name: {player.name}</p>
          <p>Player ID: {player.player_id}</p>
          <p>Team: {player.team}</p>
          <p>Position: {player.position}</p>
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
