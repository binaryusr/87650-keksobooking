'use strict';

const fs = require(`fs`);

const generateFlatOffers = require(`../data/flat-offers`);

class ImageStoreMock {
  async getBucketAvatar() {}

  async getBucketPreview() {}

  async getAvatar(offerId) {
    const offers = generateFlatOffers();
    const offer = offers.find((it) => parseInt(it.date, 10) === offerId);
    if (offerId === 222) {
      return void 0;
    }
    if (!offer) {
      return void 0;
    }
    return {
      info: offers,
      stream: fs.createReadStream(`${process.cwd()}/test/fixtures/keks.png`)
    };
  }

  async saveAvatar() {}

  async getPreview() {}

  async savePreview() {}
}

module.exports = new ImageStoreMock();
