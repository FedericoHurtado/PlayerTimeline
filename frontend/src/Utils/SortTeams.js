/**
 * Helper function to sort a list of teams according to their standings.
 */

function validateTeam(team) {
  // Check if team is an object
  if (typeof team !== "object" || team === null) {
    console.log("Team is not an object");
    return false;
  }

  // Check if 'players' is an array of integers
  if (!Array.isArray(team.players) || !team.players.every(Number.isInteger)) {
    console.log("Team.players must be an array of integers");
    return false;
  }

  // Define the integer properties to check
  const integerProperties = [
    "roster_id",
    "points_for",
    "wins",
    "ties",
    "owner_id",
    "losses",
  ];

  // Check each integer property
  for (const prop of integerProperties) {
    if (!Number.isInteger(team[prop])) {
      console.log(`Team.${prop} must be an integer`);
      return false;
    }
  }

  // If all checks pass, the team is valid
  return true;
}

function sortTeams(teams) {
  // step 1: ensure input has correct format
  for (team in teams) {
    if (!validateTeam(team)) {
      console.log("Invalid team found, cannot sort teams");
      return [];
    }
  }
  // step 2: Calculate winning percentage and add it to the team object
  teams.forEach((team) => {
    const totalGames = team.wins + (team.losses || 0) + team.ties;
    team.winningPercentage = totalGames > 0 ? team.wins / totalGames : 0;
  });

  // step 3: Sort teams by winning percentage in descending order
  teams.sort((a, b) => b.winningPercentage - a.winningPercentage);

  // step 4: return sorted teams in a list
  return teams;
}

export { sortTeams };
