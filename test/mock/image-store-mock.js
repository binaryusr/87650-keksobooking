'use strict';

const fs = require(`fs`);

class ImageStoreMock {
  async getBucketAvatar() {}

  async getBucketPreview() {}

  async getAvatar(date) {
    if (date === 222) {
      return null;
    }
    return {
      info: {length: 0},
      stream: fs.createReadStream(`${process.cwd()}/test/fixtures/keks.png`)
    };
  }

  async saveAvatar() {}

  async getPreview() {}

  async savePreview() {}
}

module.exports = new ImageStoreMock();
