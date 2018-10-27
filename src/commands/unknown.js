'use strict';

const colors = require(`colors/safe`);

const {Command} = require(`../constants`);

module.exports = {
  name: `unknown`,
  description: `Handles unknown command`,
  execute(command) {
    throw new Error(`Unknown command {{ ${colors.red(command)} }}
To read the manual, type "${colors.green(Command.HELP)}"`);
  }
};
