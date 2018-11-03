'use strict';

const mongodb = require(`../mongodb`);

const setupCollection = async () => {
  const dBase = await mongodb;
  const collection = dBase.collection(`offers`);
  collection.createIndex({name: -1}, {unique: true});
  return collection;
};

class OfferStore {
  constructor(collection) {
    this.collection = collection;
  }

  async getOffer(date) {
    return (await this.collection).findOne({date});
  }

  async getAllOffers() {
    return (await this.collection).find();
  }

  async save(offerData) {
    return (await this.collection).insertOne(offerData);
  }
}

module.exports = new OfferStore(setupCollection().catch((err) => {
  console.log(`Failed to set up "offers" collection`, err);
}));
