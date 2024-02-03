const client = require("..");
const chalk = require("chalk");
const log = require("../logger");

client.on("ready", async () => {
  log.success(
    `Logged in as ${chalk.cyan(client.user.username)}. [${chalk.cyan(
      client.user.id
    )}]`
  );
});
