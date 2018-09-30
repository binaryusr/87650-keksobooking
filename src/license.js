'use strict';

const packageInfo = require(`../package.json`);

module.exports = {
  name: `license`,
  description: `Shows the project's license`,
  execute() {
    console.log(`License: ${packageInfo.license}`);
  }
};
