'use strict';

const express = require(`express`);
const multer = require(`multer`);

const generateEntity = require(`./generate-entity`);
const {validateFields} = require(`./validate`);
const {DEFAULT_MAX_QUANTITY, DEFAULT_NAMES} = require(`./utils/constants`);
const {
  makeAsync, generateData, getRandomElement, castFieldsToNumber, addField, buildCoordinates
} = require(`./utils/utils`);
const NotFoundError = require(`./error/not-found-error`);
const IllegalArgumentError = require(`./error/illegal-argument-error`);
const NotImplementedError = require(`./error/not-implemented-error`);

const offersRouter = new express.Router();
const jsonParser = express.json();
const upload = multer({storage: multer.memoryStorage()});

const allowedImages = [{name: `avatar`, maxCount: 1}, {name: `preview`, maxCount: 1}];

const entities = generateData(DEFAULT_MAX_QUANTITY, generateEntity);
entities[0].date = 111;
entities[1].date = 222;
entities[2].date = 333;
entities[3].date = 444;
entities[4].date = 555;
entities[5].date = 666;
entities[6].date = 777;
entities[7].date = 888;
entities[8].date = 999;

const addDefaultName = (data, defaultNames) => {
  return !data.name ? addField(data, `name`, getRandomElement(defaultNames)) : data;
};

offersRouter.get(``, makeAsync(async (req, res) => {
  const skip = parseInt(req.query.skip, 10) || 0;
  const limit = parseInt(req.query.limit, 10) || DEFAULT_MAX_QUANTITY;
  if (skip < 0 || limit < 0 || skip > limit) {
    throw new NotFoundError(`Invalid query parameters`);
  }
  res.send(entities.slice(skip, skip + limit));
}));

offersRouter.get(`/:date`, makeAsync(async (req, res) => {
  if (!req.params.date) {
    throw new IllegalArgumentError(`No date provided`);
  }
  if (isNaN(parseInt(req.params.date, 10))) {
    throw new IllegalArgumentError(`The format of date is incorrect.`);
  }
  const entityForResponse = entities.find((it) => it.date === parseInt(req.params.date, 10));
  if (!entityForResponse) {
    throw new NotFoundError(`The entity with the date ${req.params.date} is not found`);
  }
  res.send(entityForResponse);
}));

offersRouter.post(``, jsonParser, upload.fields(allowedImages), makeAsync(async (req, res) => {
  if (req.files && req.files.avatar) {
    req.body.avatar = req.files.avatar[0].originalname;
  }
  if (req.files && req.files.preview) {
    req.body.preview = req.files.preview[0].originalname;
  }
  try {
    const dataWithName = addDefaultName(req.body, DEFAULT_NAMES);
    const data = castFieldsToNumber(dataWithName, [`price`, `rooms`, `guests`]);
    validateFields(data);
    const dataWithLocation = addField(data, `location`, buildCoordinates(req.body.address));
    res.send(dataWithLocation);
  } catch (err) {
    res.status(err.code).json(err.errors);
  }
}));

offersRouter.all(``, makeAsync(async () => {
  throw new NotImplementedError(`This method is not supported`);
}));

module.exports = {offersRouter};
