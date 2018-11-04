'use strict';

const express = require(`express`);
const multer = require(`multer`);
const path = require(`path`);

const {validateFields} = require(`./validate`);
const ValidationError = require(`../errors/validation-error`);
const NotFoundError = require(`../errors/not-found-error`);
const IllegalArgumentError = require(`../errors/illegal-argument-error`);
const NotImplementedError = require(`../errors/not-implemented-error`);

const {PAGE_DEFAULT_LIMIT, DEFAULT_NAMES} = require(`../utils/constants`);
const {
  asyncMiddleware, getRandomElement, castFieldsToNumber, addField, buildCoordinates
} = require(`../utils/utils`);

const offersRouter = new express.Router();

const jsonParser = express.json();

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  if (mimetype && extname) {
    return cb(null, true);
  }
  const error = new ValidationError(`Error: File upload only supports the following filetypes - ${filetypes}`);
  return cb(error, false);
};

const allowedImages = [{name: `avatar`, maxCount: 1}, {name: `preview`, maxCount: 1}];

const upload = multer({storage: multer.memoryStorage(), fileFilter}).fields(allowedImages);

const addDefaultName = (data, defaultNames) => {
  return !data.name ? addField(data, `name`, getRandomElement(defaultNames)) : data;
};

const toPage = async (cursor, skip = 0, limit = PAGE_DEFAULT_LIMIT) => {
  const packet = await cursor.skip(skip).limit(limit).toArray();
  return {
    data: packet,
    skip,
    limit,
    total: await cursor.count()
  };
};

offersRouter.get(``, asyncMiddleware(async (req, res) => {
  const skip = parseInt(req.query.skip, 10) || 0;
  const limit = parseInt(req.query.limit, 10) || PAGE_DEFAULT_LIMIT;
  if (isNaN(skip) || isNaN(limit) || limit < 0 || skip > limit) {
    throw new IllegalArgumentError(`Skip and/or limit parameters invalid`);
  }
  const {data} = await toPage(await offersRouter.offerStore.getAll(), skip, limit);
  res.send(data);
}));

offersRouter.get(`/:date`, asyncMiddleware(async (req, res) => {
  const {date} = req.params;
  const dateAsInt = parseInt(date, 10);
  if (!date) {
    throw new IllegalArgumentError(`No date provided`);
  }
  if (isNaN(dateAsInt)) {
    throw new IllegalArgumentError(`The date format is incorrect.`);
  }
  const offer = await offersRouter.offerStore.getOne(dateAsInt);
  if (!offer) {
    throw new NotFoundError(`The offer with the date: ${date} is not found`);
  }
  res.send(offer);
}));

offersRouter.post(``, jsonParser, upload, asyncMiddleware(async (req, res) => {
  if (req.files) {
    if (req.files.avatar) {
      req.body.avatar = req.files.avatar[0].originalname;
    }
    if (req.files.preview) {
      req.body.preview = req.files.preview[0].originalname;
    }
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

offersRouter.all(``, asyncMiddleware(async () => {
  throw new NotImplementedError(`This method is not supported`);
}));

module.exports = (store) => {
  offersRouter.offerStore = store;
  return offersRouter;
};
