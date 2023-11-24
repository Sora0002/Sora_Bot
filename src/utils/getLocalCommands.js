// Import the 'path' module for working with file paths
const path = require('path');

// Import the 'getAllFiles' utility function
const getAllFiles = require('./getAllFiles');

// Export a function that retrieves local commands from command files
module.exports = (exceptions = []) => {
  // Initialize an array to store local command objects
  let localCommands = [];

  // Get an array of directories representing command categories
  const commandCategories = getAllFiles(
    path.join(__dirname, '..', 'commands'),
    true
  );

  // Iterate through each command category directory
  for (const commandCategory of commandCategories) {
    // Get an array of files in the current command category
    const commandFiles = getAllFiles(commandCategory);

    // Iterate through each command file in the current category
    for (const commandFile of commandFiles) {
      // Require the command file to get the command object
      const commandObject = require(commandFile);

      // Check if the command name is in the exceptions array
      if (exceptions.includes(commandObject.name)) {
        // If the command is in the exceptions, skip it
        continue;
      }

      // Add the command object to the array of local commands
      localCommands.push(commandObject);
    }
  }

  // Return the array of local command objects
  return localCommands;
};
