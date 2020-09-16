"use strict";
exports.__esModule = true;
//const faker = require("faker");
var faker = require("faker");
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
        _id: faker.random.uuid(),
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
var getId = function () {
    return faker.random.uuid();
};
var getTour = function (id, guides) { return ({
    startLocation: startLocation,
    ratingsAverage: faker.random.number(5),
    ratingsQuantity: faker.random.number(23),
    images: images(),
    startDates: startDates,
    _id: id,
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
    for (var i = 0; i < numberOfTours; i++) {
        var id = getId();
        var guides = getGuides(guidesIds);
        toursIds.push(id);
        tours.push(getTour(id, guides));
    }
    return { tours: tours, toursIds: toursIds };
};
//console.log(JSON.stringify(tour));
