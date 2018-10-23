'use strict';

const assert = require(`assert`);

const {
  TITLE,
  MIN_PRICE,
  MAX_PRICE,
  TYPES,
  MIN_ROOMS,
  MAX_ROOMS,
  MIN_GUESTS,
  MAX_GUESTS,
  CHECK_IN,
  CHECK_OUT,
  FEATURES,
  DESCRIPTION,
  MIN_X,
  MAX_X,
  MIN_Y,
  MAX_Y,
} = require(`../src/constants`);
const {
  isInRangeInclusive,
  getSevenDaysBeforeNow,
  isArrayOfUniqueElements,
  isSubset
} = require(`../src/utils`);
const generateEntity = require(`../src/generate-entity`);

const isAddressInRange = (address) => {
  const coordinatesArray = address.split(`,`);
  const min = isInRangeInclusive(MIN_X, MAX_X, +coordinatesArray[0].trim());
  const max = isInRangeInclusive(MIN_Y, MAX_Y, +coordinatesArray[1].trim());
  return min && max;
};

const isFeatureArrayLengthInRange = (features) => {
  const minLength = 1;
  return isInRangeInclusive(minLength, FEATURES.length, features.length);
};

const isArrayOfAbsoluteLinks = (array) => {
  return array.every((element) => {
    return element.includes(`http://`) || element.includes(`https://`);
  });
};

describe(`Tests for generateEntity function`, () => {
  const entity = generateEntity();
  const {author, offer, location, date} = entity;
  describe(`Type checking`, () => {
    it(`should check if generated entity is an object`, () => {
      assert.strictEqual(typeof entity, `object`);
    });
    it(`should check if entity fields have correct types`, () => {
      assert.strictEqual(typeof author.avatar, `string`);
      assert.strictEqual(typeof offer.title, `string`);
      assert.strictEqual(typeof offer.address, `string`);
      assert.strictEqual(typeof offer.price, `number`);
      assert.strictEqual(typeof offer.type, `string`);
      assert.strictEqual(typeof offer.rooms, `number`);
      assert.strictEqual(typeof offer.guests, `number`);
      assert.strictEqual(typeof offer.checkin, `string`);
      assert.strictEqual(typeof offer.checkout, `string`);
      assert.strictEqual(Array.isArray(offer.features), true);
      assert.strictEqual(typeof offer.description, `string`);
      assert.strictEqual(Array.isArray(offer.photos), true);
      assert.strictEqual(typeof location.x, `number`);
      assert.strictEqual(typeof location.y, `number`);
      assert.strictEqual(typeof date, `number`);
    });
  });

  describe(`Content checking`, () => {
    it(`should check if the avatar is a link`, () => {
      assert.strictEqual(author.avatar.includes(`https://`), true);
    });
    it(`should check if the title is one of the possible titles`, () => {
      assert.strictEqual(TITLE.includes(offer.title), true);
    });
    it(`should check if the address is in the correct range`, () => {
      assert.strictEqual(isAddressInRange(offer.address), true);
    });
    it(`should check if the price is in the correct range`, () => {
      assert.strictEqual(isInRangeInclusive(MIN_PRICE, MAX_PRICE, offer.price), true);
    });
    it(`should check if the type is one of the possible types`, () => {
      assert.strictEqual(TYPES.includes(offer.type), true);
    });
    it(`should check if the number of rooms is in the correct range`, () => {
      assert.strictEqual(isInRangeInclusive(MIN_ROOMS, MAX_ROOMS, offer.rooms), true);
    });
    it(`should check if the number of guests is in the correct range`, () => {
      assert.strictEqual(isInRangeInclusive(MIN_GUESTS, MAX_GUESTS, offer.guests), true);
    });
    it(`should check if the check in time is one of the possible times`, () => {
      assert.strictEqual(CHECK_IN.includes(offer.checkin), true);
    });
    it(`should check if the check out time is one of the possible times`, () => {
      assert.strictEqual(CHECK_OUT.includes(offer.checkout), true);
    });
    it(`should check if the features is an array of correct unique elements of the length in the right range`, () => {
      assert.strictEqual(isFeatureArrayLengthInRange(offer.features), true);
      assert.strictEqual(isArrayOfUniqueElements(offer.features), true);
      assert.strictEqual(isSubset(FEATURES, offer.features), true);
    });
    it(`should check if the description matches the correct description`, () => {
      assert.strictEqual(offer.description, DESCRIPTION);
    });
    it(`should check if the photos field is an array of links`, () => {
      assert.strictEqual(isArrayOfAbsoluteLinks(offer.photos), true);
    });
    it(`should check if the coordinates x and y are in the correct range`, () => {
      assert.strictEqual(isInRangeInclusive(MIN_X, MAX_X, location.x), true);
      assert.strictEqual(isInRangeInclusive(MIN_Y, MAX_Y, location.y), true);
    });
    it(`should check if the date is in the correct range`, () => {
      assert.strictEqual(date >= getSevenDaysBeforeNow(), true);
    });
  });
});
