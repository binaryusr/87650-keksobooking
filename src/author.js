'use strict';

const packageInfo = require(`../package.json`);

module.exports = {
  name: `author`,
  description: `Shows the name of the author`,
  execute() {
    console.log(`Author: ${packageInfo.author}`);
  }
};
