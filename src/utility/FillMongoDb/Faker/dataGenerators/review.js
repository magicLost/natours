"use strict";
exports.__esModule = true;
exports.getReviews = exports.fillArrayWithUniqueNumbers = void 0;
var faker = require("faker");
var __1 = require("..");
var getReview = function (userId, tourId) {
    return {
        _id: __1.getId(),
        review: faker.lorem.paragraph(),
        rating: faker.random.number({ min: 1, max: 5 }),
        user: userId,
        tour: tourId
    };
};
var setUniqueNumber = function (numbers, maxNumbers, count) {
    if (count === void 0) { count = 0; }
    var n = faker.random.number({ min: 1, max: maxNumbers });
    count++;
    //console.log(count);
    if (numbers.includes(n)) {
        setUniqueNumber(numbers, maxNumbers, count);
    }
    if (numbers.includes(n))
        return;
    numbers.push(n);
};
exports.fillArrayWithUniqueNumbers = function (numbers, maxNumbers, length) {
    if (length >= maxNumbers)
        throw new Error("max numbers must be more than length");
    for (var i = 0; i < length; i++) {
        setUniqueNumber(numbers, maxNumbers);
    }
};
exports.getReviews = function (toursIds, usersIds) {
    var reviews = [];
    var uniqueNumbersOfUsers = [];
    var usersIdsLength = usersIds.length;
    toursIds.forEach(function (tourId) {
        var numberOfReviewsForThisTour = faker.random.number(8);
        exports.fillArrayWithUniqueNumbers(uniqueNumbersOfUsers, usersIdsLength, numberOfReviewsForThisTour);
        uniqueNumbersOfUsers.forEach(function (i) {
            reviews.push(getReview(usersIds[i], tourId));
        });
        uniqueNumbersOfUsers = [];
    });
    return reviews;
};
