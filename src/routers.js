'use strict';
// create an instance of the router

const express = require(`express`);

const generateEntity = require(`./generate-entity`);
const {HttpCode, DEFAULT_MAX_QUANTITY} = require(`./constants`);
const {makeAsync, generateData} = require(`./utils`);

const offersRouter = new express.Router();

const entities = generateData(DEFAULT_MAX_QUANTITY, generateEntity);
entities[0].date = 12345;

offersRouter.get(``, makeAsync(async (req, res) => {
  const skip = parseInt(req.query.skip, 10) || 0;
  const limit = parseInt(req.query.limit, 10) || DEFAULT_MAX_QUANTITY;
  if (skip < 0 || limit < 0 || skip > limit) {
    res.status(HttpCode.NOT_FOUND_CODE).send(`Invalid query parameters`);
    return;
  }
  res.send(entities.slice(skip, skip + limit));
}));

offersRouter.get(`/:date`, makeAsync(async (req, res) => {
  if (!req.params.date) {
    res.status(HttpCode.BAD_REQUEST_CODE).send(`No date provided`);
    return;
  }
  if (isNaN(parseInt(req.params.date, 10))) {
    res.status(HttpCode.BAD_REQUEST_CODE).send(`The format of date is incorrect.`);
    return;
  }
  const entityForResponse = entities.find((it) => it.date === parseInt(req.params.date, 10));
  if (!entityForResponse) {
    res.status(HttpCode.NOT_FOUND_CODE).send(`The entity with the provided date is not found`);
    return;
  }
  res.send(entityForResponse);
}));

offersRouter.all(``, makeAsync(async (req, res) => {
  res.status(HttpCode.NOT_IMPLEMENTED).send(`This method is not supported`);
}));

module.exports = {offersRouter};
