'use strict';

const {Command} = require(`./utils/constants`);
const version = require(`./commands/version`);
const help = require(`./commands/help`);
const author = require(`./commands/author`);
const license = require(`./commands/license`);
const description = require(`./commands/description`);
const server = require(`./commands/server`);
const fill = require(`./commands/fill`);
const noCommand = require(`./commands/no-command`);
const unknown = require(`./commands/unknown`);

module.exports = (command = Command.NO_COMMAND) => {
  const Execute = {
    [Command.VERSION]: version.execute,
    [Command.HELP]: help.execute,
    [Command.AUTHOR]: author.execute,
    [Command.LICENSE]: license.execute,
    [Command.DESCRIPTION]: description.execute,
    [Command.SERVER]: server.execute,
    [Command.FILL]: fill.execute,
    [Command.NO_COMMAND]: noCommand.execute,
  };
  (Execute[command] ? Execute[command] : unknown.execute)(command);
};
