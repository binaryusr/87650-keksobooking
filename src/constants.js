'use strict';

const Command = {
  VERSION: `--version`,
  HELP: `--help`,
  AUTHOR: `--author`,
  LICENSE: `--license`,
  DESCRIPTION: `--description`,
  NO_COMMAND: `no-command`,
};

module.exports = {
  Command,
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
};
