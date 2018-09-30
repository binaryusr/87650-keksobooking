'use strict';

const colors = require(`colors/safe`);

const packageInfo = require(`../package.json`);

module.exports = {
  name: `no-command`,
  description: `Shows general info`,
  execute() {
    console.log(`Hello user! This program will start the server of the "${colors.blue(`keksobooking`)}"
${colors.grey(`Author`)}: ${colors.green(packageInfo.author)}`);
  }
};
