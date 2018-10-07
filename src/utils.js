'use strict';

const {
  MS_PER_SECOND,
  SECONDS_PER_MINUTE,
  MINUTES_PER_HOUR,
  HOURS_PER_DAY,
  SEVEN_DAYS
} = require(`./constants`);

const getRandomElement = (elementArray) => {
  const index = Math.floor(Math.random() * Math.floor(elementArray.length));
  return elementArray[index];
};

const getRandomNumberRounded = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

const isInRangeInclusive = (min, max, number) => {
  return number >= min && number <= max;
};

const getSevenDaysBeforeNow = () => {
  return Date.now() - (SEVEN_DAYS * HOURS_PER_DAY * MINUTES_PER_HOUR * SECONDS_PER_MINUTE * MS_PER_SECOND);
};

const isArrayOfUniqueElements = (array) => {
  const set = new Set(array);
  return set.size === array.length;
};

const isSubset = (superCollection, subCollection) => {
  return [...subCollection].every((element) => [...superCollection].includes(element));
};

module.exports = {
  getRandomElement,
  getRandomNumberRounded,
  isInRangeInclusive,
  getSevenDaysBeforeNow,
  isArrayOfUniqueElements,
  isSubset,
};
