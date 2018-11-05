'use strict';

const fs = require(`fs`);

const {SECOND_OFFER_DATE} = require(`../../src/utils/constants`);
const generateFlatOffers = require(`../data/generate-flat-offers`);

class ImageStoreMock {
  async getBucketAvatar() {}

  async getBucketPreview() {}

  async getAvatar(offerId) {
    const offers = generateFlatOffers();
    const offer = offers.find((it) => parseInt(it.date, 10) === offerId);
    if (offerId === SECOND_OFFER_DATE) {
      return void 0;
    }
    if (!offer) {
      return void 0;
    }
    return {
      info: Object.assign(offer, {length: 640255}),
      stream: fs.createReadStream(`${process.cwd()}/test/fixtures/keks.png`)
    };
  }

  async saveAvatar() {}

  async getPreview() {}

  async savePreview() {}
}

module.exports = new ImageStoreMock();
