module.exports = {
  name: "invite",
  description: "Get the invite link for the bot.",
  cooldown: 3000,
  userPerms: ["ManageServer"], // https://revolt.js.org/classes/ServerMember.html#hasPermission
  botPerms: [],
  aliases: ["inv"],
  run: async (client, message, args) => {
    const client_id = client.user.id;
    const url = `https://app.revolt.chat/bot/${client_id}`;
    const msg = await message.reply(`Click [here](${url}) to invite the bot.`);
  },
};
