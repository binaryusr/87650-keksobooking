'use strict';

const utils = require(`./utils/utils`);
const constants = require(`./utils/constants`);

const generateFeaturesArray = (featuresArray) => {
  const maxIndex = featuresArray.length - 1;
  const randomArrayLength = utils.getRandomNumberRounded(1, maxIndex);
  return featuresArray.slice(0, randomArrayLength);
};

const generateCoordinates = () => {
  return {
    "x": utils.getRandomNumberRounded(constants.MIN_X, constants.MAX_X),
    "y": utils.getRandomNumberRounded(constants.MIN_Y, constants.MAX_Y),
  };
};

const generateEntity = () => {
  const location = generateCoordinates();
  return {
    "author": {
      "name": `Anna Bolina`,
      "avatar": `https://robohash.org/ai`,
    },
    "offer": {
      "title": utils.getRandomElement(constants.TITLE),
      "address": `${location.x}, ${location.y}`,
      "price": utils.getRandomNumberRounded(constants.MIN_PRICE, constants.MAX_PRICE),
      "type": utils.getRandomElement(constants.TYPES),
      "rooms": utils.getRandomNumberRounded(constants.MIN_ROOMS, constants.MAX_ROOMS),
      "guests": utils.getRandomNumberRounded(constants.MIN_GUESTS, constants.MAX_GUESTS),
      "checkin": utils.getRandomElement(constants.CHECK_IN),
      "checkout": utils.getRandomElement(constants.CHECK_OUT),
      "features": generateFeaturesArray(constants.FEATURES),
      "description": constants.DESCRIPTION,
      "photos": constants.PHOTOS,
    },
    "location": {
      "x": location.x,
      "y": location.y,
    },
    "date": utils.getRandomNumberRounded(utils.getSevenDaysBeforeNow(), Date.now())
  };
};

module.exports = generateEntity;
