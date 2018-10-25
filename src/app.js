'use strict';

const express = require(`express`);
const {offersRouter} = require(`./routers`);

const app = express();

app.use(express.static(`${process.cwd()}/static`));

app.use(`/api/offers`, offersRouter);

module.exports = app;
