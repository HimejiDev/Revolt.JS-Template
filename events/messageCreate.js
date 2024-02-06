const ms = require("ms");
const client = require("..");
const config = require("../config.json");
const log = require("../logger");
const chalk = require("chalk");

const prefix = client.prefix;
const cooldown = {};

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.channel ? message.channel.type !== "TextChannel" : false) return;
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands[cmd]
  if (!command) command = client.commands[client.aliases[cmd]];

  if (!command) return;

  if (command.cooldown) {
    if (cooldown[`${command.name}${message.author.id}`]) {
      return message.reply(config.messages["COOLDOWN_MESSAGE"].replace("<duration>", ms(cooldown[`${command.name}${message.author.id}`] - Date.now(), { long: true })));
    }
  }

  if (command.userPerms && command.userPerms.length > 0) {
    var hasPermission = false;
    command.userPerms.forEach((permission) => {
      log.debug(permission);
      if (message.member.hasPermission(message.channel.server, permission))
        hasPermission = true;
    });
    if (!hasPermission)
      return message.reply(`🚫 You don't have \`${command.userPerms}\` permissions to use this command!`);
  }
  if (command.botPerms && command.botPerms.length > 0) {
    var hasPermission = false;
    const client_member = await message.channel.server.fetchMember(client.user);
    command.botPerms.forEach((permission) => {
      if (client_member.hasPermission(message.channel.server, permission))
        hasPermission = true;
    });
    if (!hasPermission)
      return message.reply(`🚫 I don't have \`${command.botPerms}\` permissions to use this command!`);
  }

  log.info(`${chalk.cyan(message.author.username + "#" + message.author.discriminator)} used ${chalk.cyan(client.prefix + cmd
  )} | g: ${chalk.cyan(message.server.name)} [${chalk.cyan(message.server.id)}] | c: ${chalk.cyan(message.channel?.name)} [${chalk.cyan(message.channel?.id)}]`);

  command.run(client, message, args);

  if (command.cooldown) {
    cooldown[`${command.name}${message.author.id}`] = Date.now() + command.cooldown;
    setTimeout(() => {
      delete cooldown[`${command.name}${message.author.id}`];
    }, command.cooldown);
  }
});
