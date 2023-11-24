// Import necessary modules and utilities
const { testServer } = require('../../../config.json');
const areCommandsDifferent = require('../../utils/areCommandsDifferent');
const getApplicationCommands = require('../../utils/getApplicationCommands');
const getLocalCommands = require('../../utils/getLocalCommands');

// Export an asynchronous function that updates application commands based on the local configuration
module.exports = async (client) => {
  try {
    // Get an array of local command objects
    const localCommands = getLocalCommands();

    // Fetch the existing application commands from the Discord server
    const applicationCommands = await getApplicationCommands(client, testServer);

    // Iterate through each local command
    for (const localCommand of localCommands) {
      // Destructure properties from the local command object
      const { name, description, options } = localCommand;

      // Find the existing command in the application commands cache
      const existingCommand = await applicationCommands.cache.find(
        (cmd) => cmd.name === name
      );

      // Check if the command already exists
      if (existingCommand) {
        // If the local command is marked as deleted, delete the existing command
        if (localCommand.deleted) {
          await applicationCommands.delete(existingCommand.id);
          console.log(`🗑 Deleted command "${name}".`);
          continue;
        }

        // If the local and existing commands are different, edit the existing command
        if (areCommandsDifferent(existingCommand, localCommand)) {
          await applicationCommands.edit(existingCommand.id, {
            description,
            options,
          });

          console.log(`🔁 Edited command "${name}".`);
        }
      } else {
        // If the local command is marked as deleted, skip registering it
        if (localCommand.deleted) {
          console.log(
            `⏩ Skipping registering command "${name}" as it's set to delete.`
          );
          continue;
        }

        // If the command doesn't exist, create a new one
        await applicationCommands.create({
          name,
          description,
          options,
        });

        console.log(`👍 Registered command "${name}."`);
      }
    }
  } catch (error) {
    // Handle errors and log them
    console.log(`There was an error: ${error}`);
  }
};
