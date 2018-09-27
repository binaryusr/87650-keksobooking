'use strict';

const COMMANDS = {
  version: `--version`,
  help: `--help`
};

const getOutputData = (command) => {
  switch (command) {
    case COMMANDS.version:
      return {
        text: `v0.0.1.`,
        code: 0
      };
    case COMMANDS.help:
      return {
        text: `First CLI app. This app obeys your commands. Available commands:
  --version - shows the version of the application
  --help - shows available commands`,
        code: 0
      };
    case undefined:
      return {
        text: `Hello user! This program will start the server of the "keksobooking app"
Author: Dmitriy Kolotov`,
        code: 0
      };
    default:
      return {
        text: `Unknown command {{ ${command} }}
To read the manual, type "--help"`,
        code: 1
      };
  }
};

const writeDataToConsole = (outputData) => {
  outputData.code === 0 ? console.log(outputData.text) : console.error(outputData.text);
  process.exit(outputData.code);
};

const args = process.argv.slice(2);
const data = getOutputData(args[0]);
writeDataToConsole(data);
