'use strict';

const mongodb = require(`../mongodb`);

const setupCollection = async (name) => {
  const db = await mongodb;
  const collection = db.collection(name);
  collection.createIndex({date: -1}, {unique: true});
  return collection;
};

class OfferStore {
  constructor(collection) {
    this.collection = collection;
  }

  async getOne(date) {
    return (await this.collection).findOne({date});
  }

  async getAll() {
    return (await this.collection).find();
  }

  async saveOne(entity) {
    return (await this.collection).insertOne(entity);
  }

  async saveMany(entities) {
    return (await this.collection).insertOne(entities);
  }
}

module.exports = new OfferStore(setupCollection(`offers`).catch((err) => {
  console.log(`Failed to set up "offers" collection`, err);
}));
