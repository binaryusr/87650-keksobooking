'use strict';

const generateEntity = require(`../../src/generate-entity`);
const {PAGE_DEFAULT_LIMIT} = require(`../../src/utils/constants`);
const {generateData} = require(`../../src/utils/utils`);

const generateTestOffersStandard = () => {
  const offers = generateData(PAGE_DEFAULT_LIMIT, generateEntity);
  let startDate = 111;
  offers.forEach((it, i) => {
    it.date = i === 0 ? startDate : startDate * (i + 1);
  });
  return offers;
};

module.exports = generateTestOffersStandard;
