'use strict';

const Command = require(`./command`);

module.exports = {
  name: `unknown`,
  description: `Handles unknown command`,
  execute(command) {
    throw new Error(`Unknown command {{ ${command} }}
To read the manual, type "${Command.HELP}"`);
  }
};
