'use strict';

const packageInfo = require(`../../package.json`);

module.exports = {
  name: `description`,
  description: `Describes the app`,
  execute() {
    console.log(`${packageInfo.description}`);
  }
};
