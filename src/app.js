'use strict';

const express = require(`express`);

const {offersRouter} = require(`./routers`);
const {NOT_FOUND_HANDLER, ERROR_HANDLER} = require(`./constants`);

const app = express();

app.use(express.static(`${process.cwd()}/static`));

app.use(`/api/offers`, offersRouter);

app.use(NOT_FOUND_HANDLER);

app.use(ERROR_HANDLER);

module.exports = app;
