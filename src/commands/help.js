'use strict';

const colors = require(`colors/safe`);

const {Command} = require(`../constants`);
const version = require(`./version`);
const author = require(`./author`);
const license = require(`./license`);
const server = require(`./server`);
const description = require(`./description`);

module.exports = {
  name: `help`,
  description: `Shows all available commands`,
  execute() {
    console.log(`First CLI app. This app obeys your commands. Available commands:
  ${colors.grey(Command.HELP)} - ${colors.green(`Shows all available commands`)}
  ${colors.grey(Command.VERSION)} - ${colors.green(version.description)}
  ${colors.grey(Command.AUTHOR)} - ${colors.green(author.description)}
  ${colors.grey(Command.LICENSE)} - ${colors.green(license.description)}
  ${colors.grey(Command.SERVER)} - ${colors.green(server.description)}
  ${colors.grey(Command.DESCRIPTION)} - ${colors.green(description.description)}`);
  }
};
