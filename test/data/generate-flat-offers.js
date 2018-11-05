'use strict';

const generateFlatEntity = require(`./generate-flat-entity`);
const {PAGE_DEFAULT_LIMIT} = require(`../../src/utils/constants`);
const {generateData} = require(`../../src/utils/utils`);

const cb = () => generateFlatEntity([], {avatar: `keks.png`});
const generateFlatOffers = () => generateData(PAGE_DEFAULT_LIMIT, cb);

module.exports = generateFlatOffers;
