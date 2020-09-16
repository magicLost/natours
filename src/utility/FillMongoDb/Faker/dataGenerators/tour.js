"use strict";
exports.__esModule = true;
exports.createTours = void 0;
//const faker = require("faker");
var faker = require("faker");
var index_1 = require("./../index");
var country = faker.address.country();
var city = faker.address.cityPrefix();
var startLocation = {
    description: city + ", " + country,
    type: "Point",
    coordinates: [faker.address.longitude(), faker.address.latitude()],
    address: faker.address.streetAddress() + ", " + city + ", " + faker.address.zipCode() + ", " + country
};
var startDates = [
    faker.date.between("2020-06-19T09:00:00.000Z", "2021-08-18T09:00:00.000Z"),
    faker.date.between("2020-06-19T09:00:00.000Z", "2021-08-18T09:00:00.000Z"),
    faker.date.between("2020-06-19T09:00:00.000Z", "2021-08-18T09:00:00.000Z"),
];
var difficulty = function () {
    var values = ["easy", "medium", "difficult"];
    var index = faker.random.number({ min: 0, max: 2 });
    return values[index];
};
var getLocation = function (day) {
    return {
        _id: index_1.getId(),
        description: faker.address.streetName(),
        type: "Point",
        coordinates: [faker.address.longitude(), faker.address.latitude()],
        day: day
    };
};
var getLocations = function () {
    var count = faker.random.number({ min: 3, max: 5 });
    var locations = [];
    for (var i = 1; i <= count; i++) {
        locations.push(getLocation(i));
    }
    return locations;
};
var images = function () {
    return [faker.image.nature(), faker.image.nature(), faker.image.nature()];
};
var getGuides = function (guidesIds) {
    var numberOfGuides = faker.random.number({ min: 1, max: 3 });
    var guides = [];
    for (var i = 0; i < numberOfGuides; i++) {
        var number = faker.random.number({ min: 0, max: guidesIds.length - 1 });
        guides.push(guidesIds[number]);
    }
    return guides;
};
var getTour = function (id, guides, timestamp) { return ({
    startLocation: startLocation,
    ratingsAverage: faker.random.number({ min: 1, max: 5 }),
    ratingsQuantity: faker.random.number({ min: 1, max: 34 }),
    images: images(),
    startDates: startDates,
    _id: id,
    _timestamp: timestamp,
    name: faker.lorem.word() + " " + faker.lorem.word(),
    duration: faker.random.number(21),
    maxGroupSize: faker.random.number(25),
    difficulty: difficulty(),
    guides: guides,
    price: faker.random.number({ min: 512, max: 2555 }),
    summary: faker.lorem.sentence,
    description: faker.lorem.paragraph() + "\n" + faker.lorem.paragraph(),
    imageCover: faker.image.nature(),
    locations: getLocations()
}); };
exports.createTours = function (numberOfTours, guidesIds) {
    var tours = [];
    var toursIds = [];
    var timestamp = Date.now();
    for (var i = 0; i < numberOfTours; i++) {
        var id = index_1.getId();
        var guides = getGuides(guidesIds);
        toursIds.push(id);
        tours.push(getTour(id, guides, timestamp));
        timestamp++;
    }
    return { tours: tours, toursIds: toursIds };
};
//console.log(JSON.stringify(tour));
