const { getAllTeamData } = require("../../Utils/getAllTeamData");

const roster_a = {
  roster_id: 1234567,
  players: ["123", "423", "432"],
  owner_id: "12345",
  settings: {
    wins: 0,
    losses: 0,
    ties: 0,
    fpts: 0,
  },
};

const roster_b = {
  roster_id: 1234567,
  players: ["123", "423", "432"],
  owner_id: "111",
  settings: {
    wins: 0,
    losses: 0,
    ties: 0,
    fpts: 0,
  },
};

// taken from sleeper call
const owner_a = {
  user_id: "12345",
  settings: null,
  metadata: {
    team_name: "Loco Gangsters",
    show_mascots: "on",
    mention_pn: "on",
    mascot_message_leg_1: "",
    mascot_message_emotion_leg_7: "dancing",
    mascot_message_emotion_leg_6: "dancing",
    mascot_message_emotion_leg_15: "dancing",
    mascot_message_emotion_leg_1: "idle",
    mascot_item_type_id_leg_9: "ne-patriot",
    mascot_item_type_id_leg_8: "ne-patriot",
    mascot_item_type_id_leg_7: "ne-patriot",
    mascot_item_type_id_leg_6: "ne-patriot",
    mascot_item_type_id_leg_5: "ne-patriot",
    mascot_item_type_id_leg_4: "ne-patriot",
    mascot_item_type_id_leg_3: "ne-patriot",
    mascot_item_type_id_leg_2: "ne-patriot",
    mascot_item_type_id_leg_18: "ne-patriot",
    mascot_item_type_id_leg_17: "ne-patriot",
    mascot_item_type_id_leg_16: "ne-patriot",
    mascot_item_type_id_leg_15: "ne-patriot",
    mascot_item_type_id_leg_14: "ne-patriot",
    mascot_item_type_id_leg_13: "ne-patriot",
    mascot_item_type_id_leg_12: "ne-patriot",
    mascot_item_type_id_leg_11: "ne-patriot",
    mascot_item_type_id_leg_10: "ne-patriot",
    mascot_item_type_id_leg_1: "ne-patriot",
    avatar:
      "https://sleepercdn.com/uploads/6ed93371d682100e80a3963cef8442d2.jpg",
    allow_pn: "on",
  },
  league_id: "1048282666031857664",
  is_owner: false,
  is_bot: false,
  display_name: "nathanhav",
  avatar: "b319fdf8b7b5b0359d3c78622ba4d70c",
};

const owner_b = {
  user_id: "111",
  settings: null,
  metadata: {
    transaction_trade: "on",
    mascot_item_type_id_leg_16: "violet",
    avatar:
      "https://sleepercdn.com/uploads/948d8e9a5d075186052dad84603ffcea.jpg",
    mascot_item_type_id_leg_8: "violet",
    team_name: "LaMarvel and the troops ",
    mascot_message_emotion_leg_1: "idle",
    mascot_item_type_id_leg_15: "violet",
    transaction_waiver: "on",
    player_nickname_update: "off",
    mention_pn: "on",
    mascot_item_type_id_leg_2: "violet",
    mascot_item_type_id_leg_11: "violet",
    user_message_pn: "on",
    mascot_item_type_id_leg_6: "violet",
    mascot_item_type_id_leg_14: "violet",
    archived: "off",
    mascot_item_type_id_leg_7: "violet",
    trade_block_pn: "on",
    mascot_message: "off",
    mascot_item_type_id_leg_5: "violet",
    mascot_item_type_id_leg_10: "violet",
    mascot_item_type_id_leg_18: "violet",
    mascot_item_type_id_leg_3: "violet",
    transaction_commissioner: "off",
    show_mascots: "on",
    mascot_item_type_id_leg_4: "violet",
    mascot_item_type_id_leg_9: "violet",
    player_like_pn: "on",
    mascot_item_type_id_leg_1: "violet",
    mascot_item_type_id_leg_12: "violet",
    mascot_item_type_id_leg_17: "violet",
    transaction_free_agent: "on",
    join_voice_pn: "off",
    team_name_update: "off",
    mascot_item_type_id_leg_13: "violet",
    allow_pn: "on",
  },
  league_id: "1048282666031857664",
  is_owner: false,
  is_bot: false,
  display_name: "drewdoc24",
  avatar: null,
};

test("getAllTeamData: 2 good users and rosters", () => {
  const rost_data = [roster_a, roster_b];
  const owner_data = [owner_b, owner_a];

  expected_result = [
    {
      roster_id: 1234567,
      players: ["123", "423", "432"],
      owner_id: "12345",
      settings: {
        wins: 0,
        losses: 0,
        ties: 0,
        fpts: 0,
      },
      owner_info: owner_a,
    },
    {
      roster_id: 1234567,
      players: ["123", "423", "432"],
      owner_id: "111",
      settings: {
        wins: 0,
        losses: 0,
        ties: 0,
        fpts: 0,
      },
      owner_info: owner_b,
    },
  ];

  expect(getAllTeamData(rost_data, owner_data)).toStrictEqual(expected_result);
});

test("getAllTeamData: owner not found for a team, throw error", () => {
  const rost_data = [roster_a, roster_b];
  const owner_data = [owner_b, owner_b];

  expect(() => getAllTeamData(rost_data, owner_data)).toThrow(
    "Owner not found for a team."
  );
});
