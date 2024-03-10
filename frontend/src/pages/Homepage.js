import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {

    // store entered league ID
    const[league_id] = useState('');

    const history = useNavigate();

    // handle text box value change
    const enterLeagueID = (event) => {
        // make api call to post league id 
        const new_id = event.target.value;
    }

    const handleSubmit = () => {
        history.push('/player', {league_id});
    }


    return (
        <div>
            <h1>Enter League ID</h1>
            {/* Text box to enter league ID */}
            <input
                type="text"
                value={league_id}
                onChange={enterLeagueID}
                placeholder="Enter League ID"
            />
            {/* Button to submit league ID */}
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}


export default HomePage;