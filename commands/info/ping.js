module.exports = {
  name: "ping",
  description: "Check bot's ping.",
  cooldown: 3000,
  userPerms: [],
  botPerms: ["React"], // https://revolt.js.org/classes/ServerMember.html#hasPermission
  aliases: ["p"],
  run: async (client, message, args) => {
    const msg = await message.reply("Pinging...");
    await msg.edit({ content: `🏓 Pong!` });
  },
};
