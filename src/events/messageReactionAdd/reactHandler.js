module.exports = async (client, reaction, user) => {
 // Fetch the message if it's a partial
 if (reaction.partial) {
    try {
      await reaction.fetch();
    } catch (error) {
      console.error('Something went wrong when fetching the message: ', error);
      return;
    }
  }

  // Check if the user has a specific role (replace 'YourRoleName' with the actual role name)
  const guild = reaction.message.guild;
  const member = await guild.members.fetch(user);
  const roleName = 'test'; // Replace with your role name

  if (member.roles.cache.some(role => role.name != roleName)) {
    // User has the specified role, remove only their reaction
    reaction.users.remove(user);
    console.log(`${user.tag} (${user.id}) with role ${roleName} reacted with ${reaction.emoji.name} to a message and their reaction was removed.`);
  } else {
    // User doesn't have the specified role
    console.log(`${user.tag} (${user.id}) reacted with ${reaction.emoji.name} to a message.`);
  }
  };
  