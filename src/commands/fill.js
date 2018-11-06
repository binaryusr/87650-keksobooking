'use strict';

const logger = require(`../logger`);

const generateTestOffersStandard = require(`../../test/data/generate-test-offers-standard`);
const offersStore = require(`../offers/store`);

module.exports = {
  name: `fill`,
  description: `Fills the database with test data`,
  async execute() {
    const data = generateTestOffersStandard();
    try {
      await offersStore.saveMany(data);
      logger.info(`Test data generated successfully.`);
      process.exit(0);
    } catch (err) {
      logger.error(`There was an error generating your data: ${err}`);
      process.exit(1);
    }
  }
};
