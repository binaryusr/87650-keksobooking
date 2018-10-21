'use strict';

const Command = {
  VERSION: `--version`,
  HELP: `--help`,
  AUTHOR: `--author`,
  LICENSE: `--license`,
  SERVER: `--server`,
  DESCRIPTION: `--description`,
  NO_COMMAND: `no-command`,
};

const Question = {
  SHOULD_GENERATE: `Do you want to generate data? (yes/y or no/n)> `,
  ENTITIES_NUMBER: `How many entities do you want to generate?> `,
  PATH: `Provide the path to the file and the file name> `,
  ALREADY_EXISTS: `This file already exists. Do you want to overwrite this file?> `
};

const Message = {
  LEAVE: `Thank you, buy!`,
  WRONG_COMMAND: `Please type one of the following options: yes, y, no, n`,
  WRONG_TYPE_NUMBER: `Please type a number!`
};

const MIME_TYPE = {
  '.html': `text/html; charset=UTF-8`,
  '.css': `text/css`,
  '.js': `text/javascript`,
  '.svg': `image/svg+xml`,
  '.png': `image/png`,
  '.jpg': `image/jpeg`,
  '.gif': `image/gif`,
  '.ico': `image/x-icon`,
};

module.exports = {
  Command,
  Question,
  Message,
  MIME_TYPE,
  TITLE: [
    `Большая уютная квартира`, `Маленькая неуютная квартира`, `Огромный прекрасный дворец`,
    `Маленький ужасный дворец`, `Красивый гостевой домик`, `Некрасивый негостеприимный домик`,
    `Уютное бунгало далеко от моря`, `Неуютное бунгало по колено в воде`
  ],
  MIN_PRICE: 1000,
  MAX_PRICE: 1000000,
  TYPES: [`flat`, `palace`, `house`, `bungalo`],
  MIN_ROOMS: 1,
  MAX_ROOMS: 5,
  MIN_GUESTS: 1,
  MAX_GUESTS: 10,
  CHECK_IN: [`12:00`, `13:00`, `14:00`],
  CHECK_OUT: [`12:00`, `13:00`, `14:00`],
  FEATURES: [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`],
  DESCRIPTION: ``,
  PHOTOS: [
    `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
  ],
  MIN_X: 300,
  MAX_X: 900,
  MIN_Y: 150,
  MAX_Y: 500,
  MS_PER_SECOND: 1000,
  SECONDS_PER_MINUTE: 60,
  MINUTES_PER_HOUR: 60,
  HOURS_PER_DAY: 24,
  SEVEN_DAYS: 7,
  ENTITY_FILE_DEFAULT_PATH: `${process.cwd()}/data.json`,
  DEFAULT_PORT: 8080,
  HOSTNAME: `127.0.0.1`,
};
