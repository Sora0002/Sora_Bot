require('dotenv').config();
const { Client, IntentsBitField, Partials, Events } = require('discord.js');
const eventHandler = require('./handlers/eventHandler');

const client = new Client({
  intents: [
      IntentsBitField.Flags.Guilds,
      IntentsBitField.Flags.GuildMembers,
      IntentsBitField.Flags.GuildMessages,
      IntentsBitField.Flags.MessageContent,
      IntentsBitField.Flags.GuildMessageReactions,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

// client.on("messageReactionAdd", async (reaction, user) => {
//   // Ensure "test" is logged for every reaction
//   console.log('test');

//   // Fetch the message if it's a partial
//   if (reaction.partial) {
//     try {
//       await reaction.fetch();
//     } catch (error) {
//       console.error('Something went wrong when fetching the message: ', error);
//       return;
//     }
//   }

//   // Your reaction handling logic here
//   reaction.remove();
// });
eventHandler(client);

client.login(process.env.TOKEN);
