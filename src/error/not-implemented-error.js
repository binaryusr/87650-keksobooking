'use strict';

class NotImplementedError extends Error {
  constructor(message) {
    super(message);
    this.code = 501;
  }
}

module.exports = NotImplementedError;
