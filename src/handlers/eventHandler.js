// Import the 'path' module for working with file paths
const path = require('path');

// Import the 'getAllFiles' utility function from the 'utils' directory
const getAllFiles = require('../utils/getAllFiles');

// Export a function that sets up event listeners for the Discord.js client
module.exports = (client) => {
  // Get an array of all files and folders in the 'events' directory
  const eventFolders = getAllFiles(path.join(__dirname, '..', 'events'), true);

  // Iterate through each event folder
  for (const eventFolder of eventFolders) {
    // Get an array of all files in the current event folder
    const eventFiles = getAllFiles(eventFolder);

    // Sort the array of event files alphabetically
    eventFiles.sort((a, b) => a > b);

    // Extract the event name from the folder path
    const eventName = eventFolder.replace(/\\/g, '/').split('/').pop();

    // Set up an event listener for the current event
    client.on(eventName, async (arg, arg2) => {
      // Iterate through each event file in the current event folder
      for (const eventFile of eventFiles) {
        // Require the event function from the event file
        const eventFunction = require(eventFile);

        // Execute the event function with the Discord.js client and the event argument

        await eventFunction(client, arg, arg2);
      }
    });
  }
};
