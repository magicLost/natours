//const faker = require("faker");
import * as faker from "faker";
import { getId } from "./../index";

const country = faker.address.country();
const city = faker.address.cityPrefix();

const startLocation = {
  description: `${city}, ${country}`,
  type: "Point",
  coordinates: [faker.address.longitude(), faker.address.latitude()],
  address: `${faker.address.streetAddress()}, ${city}, ${faker.address.zipCode()}, ${country}`,
};

const startDates = [
  faker.date.between("2020-06-19T09:00:00.000Z", "2021-08-18T09:00:00.000Z"),
  faker.date.between("2020-06-19T09:00:00.000Z", "2021-08-18T09:00:00.000Z"),
  faker.date.between("2020-06-19T09:00:00.000Z", "2021-08-18T09:00:00.000Z"),
];

const difficulty = () => {
  const values = ["easy", "medium", "difficult"];
  const index = faker.random.number({ min: 0, max: 2 });
  return values[index];
};

const getLocation = (day: number) => {
  return {
    _id: getId(),
    description: faker.address.streetName(),
    type: "Point",
    coordinates: [faker.address.longitude(), faker.address.latitude()],
    day: day,
  };
};

const getLocations = () => {
  const count = faker.random.number({ min: 3, max: 5 });
  const locations = [];
  for (let i = 1; i <= count; i++) {
    locations.push(getLocation(i));
  }

  return locations;
};

const images = () => {
  return [faker.image.nature(), faker.image.nature(), faker.image.nature()];
};

const getGuides = (guidesIds: string[]) => {
  const numberOfGuides = faker.random.number({ min: 1, max: 3 });
  const guides = [];
  for (let i = 0; i < numberOfGuides; i++) {
    let number = faker.random.number({ min: 0, max: guidesIds.length - 1 });
    guides.push(guidesIds[number]);
  }
  return guides;
};

const getTour = (id: string, guides: string[], timestamp: number) => ({
  startLocation,
  ratingsAverage: faker.random.number({ min: 1, max: 5 }),
  ratingsQuantity: faker.random.number({ min: 1, max: 34 }),
  images: images(),
  startDates,
  _id: id,
  _timestamp: timestamp,
  name: `${faker.lorem.word()} ${faker.lorem.word()}`,
  duration: faker.random.number(21),
  maxGroupSize: faker.random.number(25),
  difficulty: difficulty(),
  guides: guides,
  price: faker.random.number({ min: 512, max: 2555 }),
  summary: faker.lorem.sentence,
  description: `${faker.lorem.paragraph()}\n${faker.lorem.paragraph()}`,
  imageCover: faker.image.nature(),
  locations: getLocations(),
});

export const createTours = (numberOfTours: number, guidesIds: string[]) => {
  const tours = [];
  const toursIds = [];
  let timestamp = Date.now();

  for (let i = 0; i < numberOfTours; i++) {
    const id = getId();

    const guides = getGuides(guidesIds);

    toursIds.push(id);
    tours.push(getTour(id, guides, timestamp));
    timestamp++;
  }

  return { tours, toursIds };
};

//console.log(JSON.stringify(tour));
