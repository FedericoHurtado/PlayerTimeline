// represenation of a single nfl player
const player = {
  player_id: String,
  first_name: String,
  last_name: String,
  position: String,
  team: String,
  age: Number,
};

// representation of a single fantasy team
export const team = {
  owner: String,
  players: [player],
  roster_id: Number,
  points_for: Number,
  points_against: Number,
  wins: Number,
  losses: Number,
  ties: Number,
  owner_id: String,
  team_name: String,
};

// representation of a single fantasy team owner
export const owner = {
  owner_id: String,
  username: String,
  display_name: String,
  team_name: String,
};

// representation of a league
export const league = {
  current_league_id: String,
  owners: [owner],
  teams: [team],
  league_name: String,
  previous_leagues: [String],
};
