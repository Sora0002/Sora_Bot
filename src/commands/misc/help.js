
const {EmbedBuilder} = require('discord.js')

module.exports = {
    name: 'help',
    description: 'send help embed!',
    // devOnly: Boolean,
    testOnly: true,
    // options: Object[],
    // deleted: Boolean,
  
    callback: (client, interaction) => {
        if(interaction.channelId == '1177683735991308370'){

        const embed = new EmbedBuilder()
        .setColor(0x34eb86)
        .setTitle('Command Help')
        .setDescription('Here are some commands to help you get started:')
        .addFields(
            { name: '**/ping**', value: 'Reply with pong' },
            { name: '**/help**', value: 'show the help embed where u can see all the commands' },
            { name: '\u200B', value: '\u200B' }, // Blank field for spacing
        )
        .setTimestamp()
        .setFooter({ text: interaction.user.username, iconURL: interaction.user.avatarURL() });



    interaction.reply({ embeds: [embed] })
        }
        else{
            interaction.reply({ content: 'You can only use this command in the support channel! <#1177683735991308370>', ephemeral: true })
        }
        },
  };
  