'use strict';

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.code = 404;
  }
}

class IllegalArgumentError extends Error {
  constructor(message) {
    super(message);
    this.code = 400;
  }
}

class NotImplementedError extends Error {
  constructor(message) {
    super(message);
    this.code = 501;
  }
}

module.exports = {
  NotFoundError,
  IllegalArgumentError,
  NotImplementedError
};
