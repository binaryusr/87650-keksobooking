'use strict';

const {MongoError} = require(`mongodb`);

const logger = require(`../logger`);
const ValidationError = require(`../errors/validation-error`);
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

const isYes = (resp) => resp.toLowerCase() === `yes` || resp.toLowerCase() === `y`;

const isNo = (resp) => resp.toLowerCase() === `no` || resp.toLowerCase() === `n`;

const isCorrectPrimitiveType = (value, type, errMessage) => {
  if (typeof value !== type || isNaN(value)) {
    throw errMessage;
  }
};

const asyncMiddleware = (fn) => (req, res, next) => fn(req, res, next).catch(next);

const generateData = (number, fn) => [...Array(number)].map(() => fn());

const isObject = (entry) => typeof entry === `object` && entry !== null && !Array.isArray(entry);

const isEachValueObject = (array) => array.every((it) => isObject(it));

const generateString = (length, char) => [...Array(length)].map(() => char).join(``);

const castFieldsToNumber = (data, fieldsToConvert) => {
  const copy = JSON.parse(JSON.stringify(data));
  const convertedData = fieldsToConvert.reduce((acc, it) => {
    if (typeof parseInt(copy[it], 10) === `number` && !isNaN(parseInt(copy[it], 10))) {
      return Object.assign(acc, {[it]: parseInt(copy[it], 10)});
    }
    return acc;
  }, {});
  return Object.assign(copy, convertedData);
};

const addField = (data, field, value) => {
  const copy = JSON.parse(JSON.stringify(data));
  return Object.assign(copy, {[field]: value});
};

const removeField = (data, field) => {
  const copy = JSON.parse(JSON.stringify(data));
  delete copy[field];
  return copy;
};

const areArrayValuesSame = (arrayOne, arrayTwo) => {
  if (arrayOne.length !== arrayTwo.length) {
    return false;
  }
  return arrayOne.every((it) => arrayTwo.includes(it));
};

const buildCoordinates = (addressField) => {
  if (typeof addressField !== `string`) {
    return undefined;
  }
  const coordinates = addressField.split(`, `);
  const x = parseFloat(coordinates[0]);
  const y = parseFloat(coordinates[1]);
  return {x, y};
};

const expressErrorHandler = (err, req, res, _next) => {
  if (err) {
    logger.error(err);
    if (err instanceof ValidationError) {
      res.status(err.code).json(err.errors);
    }
    if (err instanceof MongoError) {
      res.status(400).json(err.message);
    }
    if (err.code === 400) {
      res.status(err.code).json(err.message);
    }
    res.status(err.code || 500).send(err.message);
  }
};

const CORSHandler = (req, res, _next) => {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Headers`, `Origin, X-Requested-With, Content-Type, Accept`);
  _next();
};

module.exports = {
  getRandomElement,
  getRandomNumberRounded,
  isInRangeInclusive,
  getSevenDaysBeforeNow,
  isArrayOfUniqueElements,
  isSubset,
  isYes,
  isNo,
  isCorrectPrimitiveType,
  asyncMiddleware,
  generateData,
  isObject,
  isEachValueObject,
  generateString,
  castFieldsToNumber,
  addField,
  removeField,
  areArrayValuesSame,
  buildCoordinates,
  expressErrorHandler,
  CORSHandler,
};
