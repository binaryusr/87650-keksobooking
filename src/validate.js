'use strict';

const ValidationError = require(`./error/validation-error`);
const {
  REQUIRED_FIELDS_ARRAY,
  TITLE_MIN_LENGTH,
  TITLE_MAX_LENGTH,
  TYPES,
  MIN_PRICE,
  MAX_PRICE,
  ADDRESS_MAX_LENGTH,
  FEATURES,
  MIN_ROOMS,
  MAX_ROOMS,
  DEFAULT_NAMES,
  MIN_GUESTS,
  MAX_GUESTS,
} = require(`./utils/constants`);
const {isInRangeInclusive, isSubset, buildCoordinates} = require(`./utils/utils`);

const getFieldRequiredMessages = (data, requiredFields) => requiredFields.reduce((acc, it) => {
  if (typeof data[it] === `undefined`) {
    acc.push(`Field "${it}" is required`);
  }
  return acc;
}, []);

const isTitleValid = (titleField) => {
  if (typeof titleField !== `string`) {
    return false;
  }
  return isInRangeInclusive(TITLE_MIN_LENGTH, TITLE_MAX_LENGTH, titleField.length);
};

const isTypeValid = (typeField) => {
  return typeof typeField === `string` && TYPES.includes(typeField);
};

const isPriceValid = (priceField) => {
  return typeof priceField === `number` && isInRangeInclusive(MIN_PRICE, MAX_PRICE, priceField);
};

const isAddressValid = (addressField) => {
  if (typeof addressField !== `string`) {
    return false;
  }
  const coordinates = buildCoordinates(addressField);
  const isFormatValid = coordinates.x >= 0 && coordinates.y >= 0;
  return isInRangeInclusive(0, 100, addressField.length) && isFormatValid;
};

const isCheckinValid = (checkinField) => {
  if (typeof checkinField !== `string`) {
    return false;
  }
  const time = checkinField.split(`:`);
  if (!isInRangeInclusive(1, 2, time[0].length) || !isInRangeInclusive(1, 2, time[1].length)) {
    return false;
  }
  const hours = parseInt(time[0], 10);
  const minutes = parseInt(time[1], 10);
  return isInRangeInclusive(0, 24, hours) && isInRangeInclusive(0, 59, minutes);
};

const isCheckoutValid = (checkoutField) => {
  if (typeof checkoutField !== `string`) {
    return false;
  }
  const time = checkoutField.split(`:`);
  if (!isInRangeInclusive(1, 2, time[0].length) || !isInRangeInclusive(1, 2, time[1].length)) {
    return false;
  }
  const hours = parseInt(time[0], 10);
  const minutes = parseInt(time[1], 10);
  return isInRangeInclusive(0, 24, hours) && isInRangeInclusive(0, 59, minutes);
};

const isRoomsValid = (roomsField) => {
  if (typeof roomsField !== `number` || isNaN(roomsField)) {
    return false;
  }
  return isInRangeInclusive(MIN_ROOMS, MAX_ROOMS, roomsField);
};

const isFeaturesValid = (featuresField) => {
  if (!Array.isArray(featuresField)) {
    return false;
  }
  if (featuresField.length !== new Set(featuresField).size) {
    return false;
  }
  return isSubset(FEATURES, featuresField);
};

const isNameValid = (nameField) => {
  if (typeof nameField !== `string`) {
    return false;
  }
  return nameField.length > 0 || DEFAULT_NAMES.includes(nameField);
};

const isGuestsValid = (guestsField) => {
  if (typeof guestsField !== `number` || isNaN(guestsField)) {
    return false;
  }
  return isInRangeInclusive(MIN_GUESTS, MAX_GUESTS, guestsField);
};

const isDescriptionValid = (descriptionField) => {
  if (typeof descriptionField === `undefined`) {
    return true;
  }
  return typeof descriptionField === `string`;
};

const isJpgOrPng = () => {
  return true;
};

const getFieldInfo = (fieldName, fieldValue) => {
  const fields = {
    name: {
      fieldName: `name`,
      isValid: isNameValid,
      errorMessage: `Name" must be either the string defined by a user or one of the default names. Got ${fieldValue}`,
    },
    price: {
      fieldName: `price`,
      isValid: isPriceValid,
      errorMessage: `Price must be a number between ${MIN_PRICE} and ${MAX_PRICE}. Got ${fieldValue}`,
    },
    title: {
      fieldName: `title`,
      isValid: isTitleValid,
      errorMessage: `Title must be a string with the length between ${TITLE_MIN_LENGTH} and ${TITLE_MAX_LENGTH} characters. . Got ${fieldValue}`,
    },
    address: {
      fieldName: `address`,
      isValid: isAddressValid,
      errorMessage: `Address must be a string with the length <= ${ADDRESS_MAX_LENGTH} and the format e.g.: {100, 200}. Got ${fieldValue}`,
    },
    type: {
      fieldName: `type`,
      isValid: isTypeValid,
      errorMessage: `Type must be one of those strings: ${TYPES}. Got ${fieldValue}`,
    },
    rooms: {
      fieldName: `rooms`,
      isValid: isRoomsValid,
      errorMessage: `Rooms must be a number between ${MIN_ROOMS} and ${MAX_ROOMS}. Got ${fieldValue}`,
    },
    guests: {
      fieldName: `guests`,
      isValid: isGuestsValid,
      errorMessage: `Guests must be a number between ${MIN_GUESTS} and ${MAX_GUESTS}. Got ${fieldValue}`,
    },
    checkin: {
      fieldName: `checkin`,
      isValid: isCheckinValid,
      errorMessage: `Checkin must have a format of HH:mm, e.g.: 12:30. Got ${fieldValue}`,
    },
    checkout: {
      fieldName: `checkout`,
      isValid: isCheckoutValid,
      errorMessage: `Checkout must have a format of HH:mm, e.g.: 12:30. Got ${fieldValue}`,
    },
    features: {
      fieldName: `features`,
      isValid: isFeaturesValid,
      errorMessage: `Features must be an array of unique correct values. Got ${fieldValue}`,
    },
    description: {
      fieldName: `description`,
      isValid: isDescriptionValid,
      errorMessage: `Description must be a string or undefined. Got ${fieldValue}`,
    },
    avatar: {
      fieldName: `avatar`,
      isValid: isJpgOrPng,
      errorMessage: `Avatar must be an image in jpg or png format`,
    },
    preview: {
      fieldName: `preview`,
      isValid: isJpgOrPng,
      errorMessage: `Preview must be an image in jpg or png format`,
    },
  };
  if (!fields[fieldName]) {
    return {
      fieldName: `${fieldName}`,
      isValid: false,
      errorMessage: `${fieldName} is unknown`,
    };
  }
  return Object.assign(fields[fieldName], {isValid: fields[fieldName].isValid(fieldValue)});
};

const hasAllRequiredFields = (data) => {
  const errorMessages = getFieldRequiredMessages(data, REQUIRED_FIELDS_ARRAY);
  if (errorMessages.length > 0) {
    throw new ValidationError(errorMessages);
  }
};

const validateFieldContent = (data) => {
  const errors = Object.keys(data).reduce((acc, it) => {
    const fieldInfo = getFieldInfo(it, data[it]);
    if (!fieldInfo.isValid) {
      acc.push(fieldInfo);
    }
    return acc;
  }, []);
  if (errors.length > 0) {
    throw new ValidationError(errors);
  }
};

const validateFields = (data) => {
  hasAllRequiredFields(data);
  validateFieldContent(data);
};

module.exports = {validateFields, getFieldRequiredMessages};
