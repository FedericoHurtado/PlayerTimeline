// function to combine roster data and owner data into a comprehensive list
function getAllTeamData(roster_data, user_data) {
  // do this for every  roster
  roster_data.forEach((roster) => {
    // find the owner_id of the current roster
    const roster_owner = roster.owner_id;

    // find the object in the list of user_data which contains the user_id which matches roster_owner
    const owner = user_data.find((user) => user.user_id == roster_owner);

    if (owner === undefined) {
      throw new Error("Owner not found for a team.");
    }

    // add the information from owner into the roster
    roster.owner_info = owner;
  });

  return roster_data;
}

module.exports = { getAllTeamData };
