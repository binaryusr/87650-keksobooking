'use strict';

const packageInfo = require(`../package.json`);

module.exports = {
  name: `no-command`,
  description: `Shows general info`,
  execute() {
    console.log(`Hello user! This program will start the server of the "keksobooking app"
Author: ${packageInfo.author}`);
  }
};
