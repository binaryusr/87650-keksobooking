'use strict';

const express = require(`express`);
const {offersRouter} = require(`./routers`);

const app = express();

app.use(express.static(`${process.cwd()}/static`));

app.use(`/api/offers`, offersRouter);

const NOT_FOUND_HANDLER = (req, res) => {
  res.status(404).send(`File or page was not found`);
};

app.use(NOT_FOUND_HANDLER);

module.exports = app;
