'use strict';

const Command = {
  VERSION: `--version`,
  HELP: `--help`
};

const getOutputData = (command) => {
  switch (command) {
    case Command.VERSION:
      return {
        text: `v0.0.1.`,
        code: 0
      };
    case Command.HELP:
      return {
        text: `First CLI app. This app obeys your commands. Available commands:
  ${Command.VERSION} - shows the version of the application
  ${Command.HELP} - shows available commands`,
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
To read the manual, type "${Command.HELP}"`,
        code: 1
      };
  }
};

const writeToConsole = (code) => code === 0 ? console.log : console.error;

const args = process.argv.slice(2);
const data = getOutputData(args[0]);
writeToConsole(data.code)(data.text);
process.exit(data.code);
