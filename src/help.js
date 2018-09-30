'use strict';

const Command = require(`./command`);
const version = require(`./version`);
const author = require(`./author`);
const license = require(`./license`);
const description = require(`./description`);

module.exports = {
  name: `help`,
  description: `Shows all available commands`,
  execute() {
    console.log(`First CLI app. This app obeys your commands. Available commands:
  ${Command.VERSION} - ${version.description}
  ${Command.HELP} - ${this.description}
  ${Command.AUTHOR} - ${author.description}
  ${Command.LICENSE} - ${license.description}
  ${Command.DESCRIPTION} - ${description.description}`);
  }
};
