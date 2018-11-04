'use strict';

const Cursor = require(`./cursor-mock`);
const generateEntity = require(`../../src/generate-entity`);
const {PAGE_DEFAULT_LIMIT} = require(`../../src/utils/constants`);
const {generateData} = require(`../../src/utils/utils`);

const entities = generateData(PAGE_DEFAULT_LIMIT, generateEntity);
entities[0].date = 111;
entities[1].date = 222;
entities[2].date = 333;
entities[3].date = 444;
entities[4].date = 555;
entities[5].date = 666;
entities[6].date = 777;
entities[7].date = 888;
entities[8].date = 999;

class OfferStoreMock {
  constructor(data) {
    this.data = data;
  }

  async getOne(date) {
    return this.data.find((it) => parseInt(it.date, 10) === date.date);
  }

  async getAll() {
    return new Cursor(this.data);
  }

  async saveOne() {}
}

module.exports = new OfferStoreMock(entities);
