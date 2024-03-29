const LEAGUE_SCHEMA = {
  type: "object",
  properties: {
    // required properties
    total_rosters: { type: "number" },
    season: { type: "string" },
    status: { type: "string" },
    bracket_id: { type: "string" }, // cn be null
    name: { type: "string" },
  },
  required: ["total_rosters", "season", "status", "bracket_id", "name"],
  additionalProperties: true, // allow more properties to exist
};

const OWNER_SCHEMA = {
  type: "array",
  items: {
    type: "object",
    properties: {
      user_id: { type: "string" },
      username: { type: "string" },
      display_name: { type: "string" },
      avatar: { type: "string" },
      metadata: {
        // only care about the team_data within the metadata object
        type: "object",
        properties: {
          team_name: { type: "string" },
        },
        required: ["team_name"],
        additionalProperties: true,
      },
    },
    required: ["user_id", "username", "display_name", "avatar", "metadata"],
    additionalProperties: true,
  },
};

const TEAM_SCHEMA = {
  roster_id: String,
  players: [String],
  owner_id: String,
  settings: {
    wins: Number,
    losses: Number,
    ties: Number,
    fpts: Number,
  },
};

module.exports = {
  LEAGUE_SCHEMA,
  OWNER_SCHEMA,
};
