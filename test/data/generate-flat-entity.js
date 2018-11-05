'use strict';

const generateValidEntity = () => {
  const location = {x: 500, y: 400};
  return {
    author: {
      name: `Anna Bolina`,
      avatar: `test/fixtures/keks.png`,
    },
    offer: {
      title: `Уютное бунгало далеко от моря`,
      address: `${location.x}, ${location.y}`,
      price: 1010,
      type: `flat`,
      rooms: 4,
      guests: 4,
      checkin: `09:00`,
      checkout: `11:00`,
      features: [`wifi`, `parking`, `elevator`, `conditioner`],
      description: `Big and cozy apartment in the center of the city`,
      photos: [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`],
      preview: `test/fixtures/keks.png`,
    },
    location: {
      x: location.x,
      y: location.y,
    },
    date: 111
  };
};

const generateFlatEntity = (fieldsToRemoveArray = [], newFields) => {
  const testEntity = generateValidEntity();
  let fields = {
    name: testEntity.author.name,
    price: testEntity.offer.price,
    title: testEntity.offer.title,
    address: testEntity.offer.address,
    type: testEntity.offer.type,
    rooms: testEntity.offer.rooms,
    guests: testEntity.offer.guests,
    checkin: testEntity.offer.checkin,
    checkout: testEntity.offer.checkout,
    features: testEntity.offer.features,
    description: testEntity.offer.description,
    date: testEntity.date,
  };
  if (newFields && Object.keys(newFields).length !== 0 && newFields.constructor === Object) {
    fields = Object.assign(fields, newFields);
  }
  fieldsToRemoveArray.forEach((it) => delete fields[it]);
  return fields;
};

module.exports = generateFlatEntity;
