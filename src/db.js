'use strict';

const {MongoClient} = require(`mongodb`);

const {DbName, MONGO_URL} = require(`./utils/constants`);

module.exports = MongoClient.connect(MONGO_URL, {useNewUrlParser: true})
  .then((client) => client.db(DbName.KEKSOBOOKING))
  .catch((err) => {
    console.error(`Failed to connect to MongoDB`, err);
    process.exit(1);
  });
