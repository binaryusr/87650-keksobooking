'use strict';

const request = require(`supertest`);
const assert = require(`assert`);

const {DEFAULT_MAX_QUANTITY} = require(`../src/constants`);
const app = require(`../src/app`);

const isEachValueObject = (array) => {
  return array.every((it) => typeof it === `object` && it !== null && Array.isArray(it) === false);
};

const generateTestEntity = () => ({
  "author": {
    "name": `John Hurt`,
    "avatar": `test/fixtures/keks.png`
  },
  "title": `Большая уютная квартира`,
  "price": 500,
  "rooms": 4,
});

describe(`GET /api/offers`, () => {
  describe(`success codes`, () => {
    it(`should respond with a json array with ${DEFAULT_MAX_QUANTITY} entities. "/api/offers"`, async () => {
      const res = await request(app)
        .get(`/api/offers`)
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-Type`, /json/);
      assert.strictEqual(Array.isArray(res.body), true);
      assert.strictEqual(res.body.length, DEFAULT_MAX_QUANTITY);
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
    it(`should respond with an object containing correct date param. "/api/offers/:date"`, async () => {
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
    it(`should respond with the 404 by invalid pathname. "/api/blahblah"`, async () => {
      await request(app)
        .get(`/api/blahblah`)
        .set(`Accept`, `application/json`)
        .expect(404)
        .expect(`Content-Type`, /text\/html/);
    });
    it(`should respond with the status 404 if no offer found for the provided date. "/api/offers/:date"`, async () => {
      await request(app)
        .get(`/api/offers/54321`)
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

describe(`POST /api/offers`, () => {
  const entity = generateTestEntity();
  it(`should respond to application/json format by default with application/json`, async () => {
    const res = await request(app)
      .post(`/api/offers`)
      .send(entity)
      .set(`Accept`, `application/json`)
      .expect(200)
      .expect(`Content-Type`, /json/);
    assert.deepStrictEqual(res.body, entity);
  });
  it(`should respond to multipart/form-data with application/json format`, async () => {
    const res = await request(app)
      .post(`/api/offers`)
      .field(`name`, `John Hurt`)
      .field(`price`, 500)
      .attach(`avatar`, `test/fixtures/keks.png`)
      .set(`Accept`, `application/json`)
      .set(`Content-Type`, `multipart/form-data`)
      .expect(200)
      .expect(`Content-Type`, /json/);
    assert.deepStrictEqual(res.body, {name: entity.author.name, price: `${entity.price}`, avatar: `keks.png`});
  });
});
