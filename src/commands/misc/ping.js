module.exports = {
  name: 'ping',
  description: 'Pong!',
  // devOnly: Boolean,
  testOnly: true,
  // options: Object[],
  // deleted: Boolean,

  callback: (client, interaction) => {
    if(interaction.channelId == '1177683735991308370'){
      interaction.reply({content:`Pong! ${client.ws.ping}ms`, ephemeral: true });
    }
    else{
      interaction.reply({ content: 'You can only use this command in the support channel! <#1177683735991308370>', ephemeral: true })
    }
  },
};
