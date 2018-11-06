'use strict';

const fs = require(`fs`);

const logger = require(`../logger`);

const generateTestOffersStandard = require(`../../test/data/generate-test-offers-standard`);
const offersStore = require(`../offers/store`);
const ImageStore = require(`../images/store`);

module.exports = {
  name: `fill`,
  description: `Fills the database with test data`,
  async execute() {
    const data = generateTestOffersStandard();
    try {
      const {insertedIds} = await offersStore.saveMany(data);
      await Promise.all(data.map(async (it, i) => {
        const promises = [];
        if (it.author.avatar) {
          promises.push(ImageStore.saveAvatar(insertedIds[i], fs.createReadStream(`${process.cwd()}/test/fixtures/keks.png`)));
        }
        if (it.offer.preview) {
          promises.push(ImageStore.savePreview(insertedIds[i], fs.createReadStream(`${process.cwd()}/test/fixtures/keks.png`)));
        }
        return Promise.all(promises);
      }));
      logger.info(`Test data generated successfully.`);
      process.exit(0);
    } catch (err) {
      logger.error(`There was an error generating your data: ${err}`);
      process.exit(1);
    }
  }
};
