const { Client, Collection } = require("revolt.js");
const client = new Client();

const fs = require("fs");
const config = require("./config.json");
require("dotenv").config(); // remove this line if you are using replit

client.commands = new Collection();
client.aliases = new Collection();
client.prefix = config.prefix;

module.exports = client;

fs.readdirSync("./handlers").forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});

client.loginBot(process.env.TOKEN);
