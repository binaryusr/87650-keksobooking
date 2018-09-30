'use strict';

const Command = require(`./command`);
const version = require(`./version`);
const help = require(`./help`);
const author = require(`./author`);
const license = require(`./license`);
const description = require(`./description`);
const noCommand = require(`./no-command`);
const unknown = require(`./unknown`);

module.exports = (command = Command.NO_COMMAND) => {
  switch (command) {
    case Command.VERSION:
      version.execute();
      break;
    case Command.HELP:
      help.execute();
      break;
    case Command.AUTHOR:
      author.execute();
      break;
    case Command.LICENSE:
      license.execute();
      break;
    case Command.DESCRIPTION:
      description.execute();
      break;
    case Command.NO_COMMAND:
      noCommand.execute();
      break;
    default:
      unknown.execute(command);
  }
};
