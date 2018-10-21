'use strict';

const {Command} = require(`./constants`);
const version = require(`./version`);
const help = require(`./help`);
const author = require(`./author`);
const license = require(`./license`);
const description = require(`./description`);
const server = require(`./server`);
const noCommand = require(`./no-command`);
const unknown = require(`./unknown`);

module.exports = (command = Command.NO_COMMAND) => {
  const Execute = {
    [Command.VERSION]: version.execute,
    [Command.HELP]: help.execute,
    [Command.AUTHOR]: author.execute,
    [Command.LICENSE]: license.execute,
    [Command.DESCRIPTION]: description.execute,
    [Command.SERVER]: server.execute,
    [Command.NO_COMMAND]: noCommand.execute,
  };
  (Execute[command] ? Execute[command] : unknown.execute)(command);
};
