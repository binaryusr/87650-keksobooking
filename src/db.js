'use strict';

const {MongoClient} = require(`mongodb`);

const {DbName, MONGO_URL} = require(`./utils/constants`);

const connectAnRead = async () => {
  const client = await MongoClient.connect(MONGO_URL);
  const db = client.db(DbName.KEKSOBOOKING);
  const collection = db.collection(`some`);
  console.log(collection);
  // !!! catch errors from this async
};

module.exports = connectAnRead;
