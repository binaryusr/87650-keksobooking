'use strict';

const Command = {
  VERSION: `--version`,
  HELP: `--help`,
  AUTHOR: `--author`,
  LICENSE: `--license`,
  SERVER: `--server`,
  DESCRIPTION: `--description`,
  FILL: `--fill`,
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

const DbName = {
  KEKSOBOOKING: `keksobooking`,
};

module.exports = {
  Command,
  Question,
  Message,
  DbName,
  TITLE: [
    `Большая уютная квартира`, `Маленькая неуютная квартира`, `Огромный прекрасный дворец`,
    `Маленький ужасный дворец`, `Красивый гостевой домик`, `Некрасивый негостеприимный домик`,
    `Уютное бунгало далеко от моря`, `Неуютное бунгало по колено в воде`
  ],
  MIN_PRICE: 1000,
  MAX_PRICE: 1000000,
  TYPES: [`flat`, `palace`, `house`, `bungalo`],
  MIN_ROOMS: 0,
  MAX_ROOMS: 1000,
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
  PAGE_DEFAULT_LIMIT: 20,
  TITLE_MIN_LENGTH: 25,
  TITLE_MAX_LENGTH: 140,
  ADDRESS_MAX_LENGTH: 140,
  REQUIRED_FIELDS_ARRAY: [`title`, `type`, `address`, `checkin`, `checkout`, `rooms`],
  DEFAULT_NAMES: [`Keks`, `Pavel`, `Nikolay`, `Alex`, `Ulyana`, `Anastasyia`, `Julia`],
  SECOND_OFFER_DATE: 222,
};
