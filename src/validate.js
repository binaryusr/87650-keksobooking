'use strict';

const ValidationError = require(`./error/validation-error`);
const {REQUIRED_FIELDS_ARRAY} = require(`./utils/constants`);

const validateRequired = (data) => REQUIRED_FIELDS_ARRAY.reduce((acc, it) => {
  if (data[it] === undefined) {
    acc.push(`Field "${it}" is required`);
  }
  return acc;
}, []);

const getValidationErrors = (data) => {
  const errorArray = validateRequired(data);

  // validate contents of the fields

  if (errorArray.length > 0) {
    throw new ValidationError(errorArray);
  }
  return data;
};

module.exports = getValidationErrors;
