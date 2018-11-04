'use strict';

const Cursor = require(`./cursor-mock`);
const generateEntity = require(`../../src/generate-entity`);
const {PAGE_DEFAULT_LIMIT} = require(`../../src/utils/constants`);
const {generateData} = require(`../../src/utils/utils`);

let id = 0;

const generateTestOffers = () => {
  const offers = generateData(PAGE_DEFAULT_LIMIT, generateEntity);
  let startDate = 111;
  offers.forEach((it, i) => {
    it.date = i === 0 ? startDate : startDate * (i + 1);
  });
  return offers;
};

class OfferStoreMock {
  constructor(data) {
    this.data = data;
  }

  async getOne(date) {
    return this.data.find((it) => parseInt(it.date, 10) === date);
  }

  async getAll() {
    return new Cursor(this.data);
  }

  async saveOne(data) {
    id++;
    data.insertedId = id;
    return data;
  }
}

module.exports = new OfferStoreMock(generateTestOffers());
