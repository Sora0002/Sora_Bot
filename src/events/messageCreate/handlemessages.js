module.exports = async (client, message) => {
    if(!message.author.bot && message.channelId == '1177683735991308370')
        message.delete();
    else{
        if(message.content == 'clear' && message.member.permissions.has('Administrator')){
            message.channel.bulkDelete(100);
        }
    }
  };
  