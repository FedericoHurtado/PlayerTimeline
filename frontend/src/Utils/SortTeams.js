/**
 * Helper function to sort a list of teams according to their standings.
 */

function validateTeam(curr_team) {
  // these fields must be present
  if (
    !curr_team.roster_id ||
    !curr_team.players ||
    !curr_team.owner_id ||
    !curr_team.wins === undefined || // can be 0
    !curr_team.losses === undefined ||
    !curr_team.points_for === undefined ||
    !curr_team.ties === undefined
  ) {
    return false;
  }

  // all required info is present, return that the team is valid
  return true;
}
function sortTeams(teams) {
  // step 1: ensure input has correct format
  teams.forEach((team) => {
    if (!validateTeam(team)) {
      console.log("Invalid team found, cannot sort teams");
      return [];
    }
  });
  // step 2: Calculate winning percentage and add it to the team object
  teams.forEach((team) => {
    const totalGames = team.wins + (team.losses || 0) + team.ties;
    team.winningPercentage = totalGames > 0 ? team.wins / totalGames : 0;
  });

  // Step 3: Sort teams by winning percentage in descending order, using "points for" as a tiebreaker
  teams.sort((a, b) => {
    // First, compare by winning percentage
    if (b.winningPercentage !== a.winningPercentage) {
      return b.winningPercentage - a.winningPercentage;
    }

    // If winning percentages are equal, use "points for" as the tiebreaker
    return b.points_for - a.points_for;
  });

  // step 4: return sorted teams in a list
  return teams;
}

export { sortTeams };
