'use strict';

const mongodb = require(`mongodb`);
const db = require(`../db`);

class ImageStore {
  async getBucketAvatar() {
    if (this._bucketAvatar) {
      return this._bucketAvatar;
    }
    const dBase = await db;
    if (!this._bucketAvatar) {
      this._bucketAvatar = new mongodb.GridFSBucket(dBase, {
        chunkSizeBytes: 512 * 1024,
        bucketName: `avatars`
      });
    }
    return this._bucketAvatar;
  }

  async getBucketPreview() {
    if (this._bucketPreview) {
      return this._bucketPreview;
    }
    const dBase = await db;
    if (!this._bucketPreview) {
      this._bucketPreview = new mongodb.GridFSBucket(dBase, {
        chunkSizeBytes: 512 * 1024,
        bucketName: `previews`
      });
    }
    return this._bucketPreview;
  }

  async getAvatar(offerId) {
    const bucket = await this.getBucketAvatar();
    const results = await (bucket).find({filename: offerId}).toArray();
    const entry = results[0];
    if (!entry) {
      return void 0;
    }
    return {info: entry, stream: bucket.openDownloadStreamByName(offerId)};
  }

  async getPreview(offerId) {
    const bucket = await this.getBucketPreview();
    const results = await (bucket).find({filename: offerId}).toArray();
    const entry = results[0];
    if (!entry) {
      return void 0;
    }
    return {info: entry, stream: bucket.openDownloadStreamByName(offerId)};
  }

  async saveAvatar(id, stream) {
    const bucket = await this.getBucketAvatar();
    return new Promise((res, rej) => {
      stream.pipe(bucket.openUploadStream(id)).on(`error`, rej).on(`finish`, res);
    });
  }

  async savePreview(id, stream) {
    const bucket = await this.getBucketPreview();
    return new Promise((res, rej) => {
      stream.pipe(bucket.openUploadStream(id)).on(`error`, rej).on(`finish`, res);
    });
  }
}

module.exports = new ImageStore();
