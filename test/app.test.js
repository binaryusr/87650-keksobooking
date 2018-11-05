'use strict';

const request = require(`supertest`);
const assert = require(`assert`);
const express = require(`express`);

const generateFlatEntity = require(`./data/generate-flat-entity`);
const offerStoreMock = require(`./mock/offer-store-mock`);
const ImageStoreMock = require(`./mock/image-store-mock`);
const offersRouter = require(`../src/offers/router`)(offerStoreMock, ImageStoreMock);
const {getFieldRequiredMessages} = require(`../src/offers/validate`);
const {
  isEachValueObject, generateString, removeField, isObject, areArrayValuesSame, expressErrorHandler
} = require(`../src/utils/utils`);
const {
  PAGE_DEFAULT_LIMIT,
  TITLE_MIN_LENGTH,
  TITLE_MAX_LENGTH,
  TYPES,
  ADDRESS_MAX_LENGTH,
  MIN_ROOMS,
  MAX_ROOMS,
  REQUIRED_FIELDS_ARRAY,
} = require(`../src/utils/constants`);

const app = express();

app.use(`/api/offers`, offersRouter);
app.use(expressErrorHandler);

const sendInvalidData = async (data) => {
  return request(app)
    .post(`/api/offers`)
    .send(data)
    .expect(400)
    .expect(`Content-Type`, /json/);
};

const sendValidData = async (data) => {
  return request(app)
    .post(`/api/offers`)
    .send(data)
    .set(`Accept`, `application/json`)
    .expect(200)
    .expect(`Content-Type`, /json/);
};

describe(`GET /api/offers`, () => {
  describe(`success codes`, () => {
    it(`should respond with a json array with ${PAGE_DEFAULT_LIMIT} entities`, async () => {
      const res = await request(app)
        .get(`/api/offers`)
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-Type`, /json/);
      assert.strictEqual(Array.isArray(res.body), true);
      assert.strictEqual(res.body.length, PAGE_DEFAULT_LIMIT);
    });
    it(`should respond with 5 objects in an array. "/api/offers?limit=5"`, async () => {
      const res = await request(app)
        .get(`/api/offers?limit=5`)
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-Type`, /json/);
      assert.strictEqual(res.body.length, 5);
      assert.strictEqual(isEachValueObject(res.body), true);
    });
    it(`should respond with maximum 20 objects in an array. "/api/offers?limit=40"`, async () => {
      const res = await request(app)
        .get(`/api/offers?limit=40`)
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-Type`, /json/);
      assert.strictEqual(res.body.length, 20);
      assert.strictEqual(isEachValueObject(res.body), true);
    });
    it(`should respond with 5 objects in an array. "/api/offers?skip=0&limit=5"`, async () => {
      const res = await request(app)
        .get(`/api/offers?limit=5`)
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-Type`, /json/);
      assert.strictEqual(res.body.length, 5);
      assert.strictEqual(isEachValueObject(res.body), true);
    });
    it(`should respond with 6 objects in an array starting from the 3rd. "/api/offers?skip=3&limit=6"`, async () => {
      const res = await request(app)
        .get(`/api/offers?skip=3&limit=6`)
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-Type`, /json/);
      assert.strictEqual(res.body.length, 6);
      assert.strictEqual(isEachValueObject(res.body), true);
      assert.strictEqual(res.body[0].date, 444);
      assert.strictEqual(res.body[5].date, 999);
    });
  });
  describe(`error codes`, () => {
    it(`should respond with the 404 by invalid pathname. "/api/blahblah"`, async () => {
      await request(app)
        .get(`/api/blahblah`)
        .set(`Accept`, `application/json`)
        .expect(404)
        .expect(`Content-Type`, /text\/html/);
    });
    it(`should respond with the status 501 if the method is not supported`, async () => {
      await request(app)
        .put(`/api/offers`)
        .expect(501)
        .expect(`Content-Type`, /text\/html/);
    });
  });
});

describe(`GET /api/offers/:date`, () => {
  describe(`200 codes`, () => {
    it(`should respond with an object containing correct date param`, async () => {
      const res = await request(app)
        .get(`/api/offers/111`)
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-Type`, /json/);
      assert.strictEqual(typeof res.body, `object`);
      assert.strictEqual(Array.isArray(res.body), false);
      assert.notStrictEqual(res.body, null);
      assert.strictEqual(res.body.date, 111);
    });
  });
  describe(`error codes`, () => {
    it(`should respond with the status 404 if no offer found for the provided date`, async () => {
      await request(app)
        .get(`/api/offers/54321`)
        .expect(404)
        .expect(`Content-Type`, /text\/html/);
    });
  });
});

describe(`GET /api/offers/:date/avatar`, () => {
  describe(`200 codes`, () => {
    it(`should respond with the avatar if the offer with the specified date is found. "/offers/111/avatar"`, async () => {
      await request(app)
        .get(`/api/offers/111/avatar`)
        .expect(200)
        .expect(`Content-Type`, /jpeg|jpg|png/);
    });
  });
  describe(`error codes`, () => {
    it(`should respond with 404 if there is no specified offer. "/offers/0/avatar"`, async () => {
      await request(app)
        .get(`/api/offers/0/avatar`)
        .expect(404)
        .expect(`Content-Type`, /text\/html/);
    });
    it(`should respond with 404 if the offer doesn't have avatar. "/offers/222/avatar"`, async () => {
      await request(app)
        .get(`/api/offers/222/avatar`)
        .expect(404)
        .expect(`Content-Type`, /text\/html/);
    });
  });
});

describe(`POST /api/offers`, () => {
  describe(`ok requests`, () => {
    const entity = generateFlatEntity([`date`]);
    it(`should respond to application/json format by default with application/json`, async () => {
      await sendValidData(entity);
    });
    it(`should respond with correct fields`, async () => {
      const res = await sendValidData(entity);
      const responseNoLocation = removeField(res.body, `location`);
      const responseNoId = removeField(responseNoLocation, `insertedId`);
      assert.deepStrictEqual(responseNoId, entity);
      assert.deepStrictEqual(isObject(res.body.location), true);
    });
    it(`should respond to multipart/form-data with application/json format`, async () => {
      const res = await request(app)
        .post(`/api/offers`)
        .field(`name`, `Anna Bolina`)
        .field(`title`, `Уютное бунгало далеко от моря`)
        .field(`address`, `500, 400`)
        .field(`description`, `Big and cozy apartment in the center of the city`)
        .field(`price`, 1010)
        .field(`type`, `flat`)
        .field(`rooms`, 4)
        .field(`guests`, 4)
        .field(`checkin`, `09:00`)
        .field(`checkout`, `11:00`)
        .field(`features`, [`wifi`, `parking`, `elevator`, `conditioner`])
        .attach(`avatar`, `test/fixtures/keks.png`)
        .set(`Accept`, `application/json`)
        .set(`Content-Type`, `multipart/form-data`)
        .expect(200)
        .expect(`Content-Type`, /json/);
      const responseNoLocation = removeField(res.body, `location`);
      const responseNoId = removeField(responseNoLocation, `insertedId`);
      assert.deepStrictEqual(responseNoId, Object.assign(entity, {avatar: `keks.png`}));
      assert.deepStrictEqual(isObject(res.body.location), true);
    });
  });
  describe(`error 400 for invalid fields`, () => {
    const fieldsToRemove = [`date`, `avatar`, `preview`];
    it(`should send 400 if one or more of the required fields are missing`, async () => {
      const errorMessages = getFieldRequiredMessages({}, REQUIRED_FIELDS_ARRAY);
      const res = await sendInvalidData({});
      assert.strictEqual(areArrayValuesSame(res.body, errorMessages), true);
    });
    it(`should send 400 if the "title" length is shorted than ${TITLE_MIN_LENGTH} or longer than ${TITLE_MAX_LENGTH}`, async () => {
      const titleShortData = generateFlatEntity(fieldsToRemove, {title: generateString(TITLE_MIN_LENGTH - 1, `a`)});
      const titleLongData = generateFlatEntity(fieldsToRemove, {title: generateString(TITLE_MAX_LENGTH + 1, `a`)});
      await Promise.all([sendInvalidData(titleShortData), sendInvalidData(titleLongData)]);
    });
    it(`should send 400 if the "type" isn't one of those: ${TYPES}`, async () => {
      const invalidTypeData = generateFlatEntity(fieldsToRemove, {type: `blah`});
      await sendInvalidData(invalidTypeData);
    });
    it(`should send 400 if "address" length is <= ${ADDRESS_MAX_LENGTH} and that it is valid`, async () => {
      const invalidAddressData = generateFlatEntity(fieldsToRemove, {address: `blah, blah`});
      const invalidAddressFormatData = generateFlatEntity(fieldsToRemove, {address: generateString(101, `a`)});
      await Promise.all([
        sendInvalidData(invalidAddressData),
        sendInvalidData(invalidAddressFormatData),
      ]);
    });
    it(`should send 400 if "checkin" has a format of HH:mm`, async () => {
      const invalidCheckinData = generateFlatEntity(fieldsToRemove, {checkin: `12:000`});
      await sendInvalidData(invalidCheckinData);
    });
    it(`should send 400 if "checkout" has a format of HH:mm`, async () => {
      const invalidCheckoutData = generateFlatEntity(fieldsToRemove, {checkout: `122:000`});
      await sendInvalidData(invalidCheckoutData);
    });
    it(`should send 400 if "rooms" is out of the range ${MIN_ROOMS} and ${MAX_ROOMS}`, async () => {
      const tooFewRoomsData = generateFlatEntity(fieldsToRemove, {rooms: -1});
      const tooManyRoomsData = generateFlatEntity(fieldsToRemove, {rooms: 1001});
      await Promise.all([sendInvalidData(tooFewRoomsData), sendInvalidData(tooManyRoomsData)]);
    });
    it(`should send 400 if the "features" is not an array of unique correct values`, async () => {
      const notArrayData = generateFlatEntity(fieldsToRemove, {features: {}});
      const notUniqueData = generateFlatEntity(fieldsToRemove, {features: [`wifi`, `wifi`]});
      const notCorrectData = generateFlatEntity(fieldsToRemove, {features: [`wifi`, `dishwasher`, `yo`]});
      await Promise.all([
        sendInvalidData(notArrayData),
        sendInvalidData(notUniqueData),
        sendInvalidData(notCorrectData),
      ]);
    });
    it(`should send 400 if "avatar" doesn't contain an image in jpg of png formats`, async () => {
      await request(app)
        .post(`/api/offers`)
        .field(`name`, `Anna Bolina`)
        .field(`title`, `Уютное бунгало далеко от моря`)
        .field(`address`, `500, 400`)
        .field(`description`, `Big and cozy apartment in the center of the city`)
        .field(`price`, 1010)
        .field(`type`, `flat`)
        .field(`rooms`, 4)
        .field(`guests`, 4)
        .field(`checkin`, `09:00`)
        .field(`checkout`, `11:00`)
        .field(`features`, [`wifi`, `parking`, `elevator`, `conditioner`])
        .attach(`avatar`, `test/fixtures/favicon.ico`)
        .set(`Accept`, `application/json`)
        .set(`Content-Type`, `multipart/form-data`)
        .expect(400)
        .expect(`Content-Type`, /json/);
    });
    it(`should send 400 if "preview" contains an image in jpg or png format`, async () => {
      await request(app)
        .post(`/api/offers`)
        .field(`name`, `Anna Bolina`)
        .field(`title`, `Уютное бунгало далеко от моря`)
        .field(`address`, `500, 400`)
        .field(`description`, `Big and cozy apartment in the center of the city`)
        .field(`price`, 1100)
        .field(`type`, `flat`)
        .field(`rooms`, 4)
        .field(`guests`, 4)
        .field(`checkin`, `09:00`)
        .field(`checkout`, `11:00`)
        .field(`features`, [`wifi`, `parking`, `elevator`, `conditioner`])
        .attach(`preview`, `test/fixtures/favicon.ico`)
        .set(`Accept`, `application/json`)
        .set(`Content-Type`, `multipart/form-data`)
        .expect(400)
        .expect(`Content-Type`, /json/);
    });
  });
});
