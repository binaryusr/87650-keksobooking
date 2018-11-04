'use strict';

const express = require(`express`);

const offerStore = require(`./offers/store`);
const offersRouter = require(`./offers/router`)(offerStore);
const {expressErrorHandler} = require(`./utils/utils`);

const app = express();

app.use(express.static(`${process.cwd()}/static`));

app.use(`/api/offers`, offersRouter);

app.use(expressErrorHandler);

module.exports = app;
