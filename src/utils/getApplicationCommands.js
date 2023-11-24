// Export an asynchronous function that fetches application commands
module.exports = async (client, guildId) => {
  let applicationCommands;

  // Check if a guildId is provided
  if (guildId) {
    // Fetch the guild object using the provided guildId
    const guild = await client.guilds.fetch(guildId);

    // Set applicationCommands to the commands property of the guild
    applicationCommands = guild.commands;
  } else {
    // If no guildId is provided, set applicationCommands to the global application commands
    applicationCommands = await client.application.commands;
  }

  // Fetch the latest data for the applicationCommands
  await applicationCommands.fetch();

  // Return the applicationCommands, which now contains the latest data
  return applicationCommands;
};
