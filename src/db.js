'use strict';

const {MongoClient} = require(`mongodb`);

const {DbName} = require(`./utils/constants`);

module.exports = MongoClient.connect(`mongodb://${process.env.DB_HOST}`, {useNewUrlParser: true})
  .then((client) => client.db(DbName.KEKSOBOOKING))
  .catch((err) => {
    console.error(`Failed to connect to MongoDB`, err);
    process.exit(1);
  });
