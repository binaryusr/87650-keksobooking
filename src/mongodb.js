'use strict';

const {MongoClient} = require(`mongodb`);

const generateEntity = require(`./generate-entity`);
const {DbName, MONGO_URL, DEFAULT_MAX_QUANTITY} = require(`./utils/constants`);
const {generateData} = require(`./utils/utils`);

const offers = generateData(DEFAULT_MAX_QUANTITY, generateEntity);
offers[0].date = 111;
offers[1].date = 222;
offers[2].date = 333;
offers[3].date = 444;
offers[4].date = 555;
offers[5].date = 666;
offers[6].date = 777;
offers[7].date = 888;
offers[8].date = 999;

const connectAnRead = async () => {
  const client = await MongoClient.connect(MONGO_URL, {useNewUrlParser: true});
  const db = client.db(DbName.KEKSOBOOKING);
  const collection = db.collection(`offers`);
  collection.createIndex({date: 1}, {unique: true});
  const result = await collection.insertMany(offers);

  const itemCursor = collection.find({date: 777});
  const items = await itemCursor.toArray();

  console.log(items.length, `items`);
  console.log(result, `result`);

  await client.close();
};

connectAnRead().catch((err) => {
  throw err;
});

