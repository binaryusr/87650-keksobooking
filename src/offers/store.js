'use strict';

const db = require(`../db`);

const setupCollection = async (name) => {
  const dBase = await db;
  const collection = dBase.collection(name);
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
}

module.exports = new OfferStore(setupCollection(`offers`).catch((err) => {
  console.log(`Failed to set up "offers" collection`, err);
}));
