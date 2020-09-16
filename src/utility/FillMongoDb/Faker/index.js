"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.create = exports.getId = void 0;
var tour_1 = require("./dataGenerators/tour");
var user_1 = require("./dataGenerators/user");
var review_1 = require("./dataGenerators/review");
var fs_1 = require("fs");
var util_1 = require("util");
var path_1 = require("path");
var mongo_1 = require("./mongo");
var mongodb_1 = require("mongodb");
//import * as faker from "faker";
exports.getId = function () {
    return new mongodb_1.ObjectId().toHexString();
};
//first we create users and get guidesIds and userIds
//second we create tours with guidesIds and get toursIds
//third we create reviews with usersIds and toursIds
exports.create = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); };
var run = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, users, usersIds, guidesIds, _b, tours, toursIds, reviews, err_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 3, , 4]);
                return [4 /*yield*/, user_1.createUsers(50)];
            case 1:
                _a = _c.sent(), users = _a.users, usersIds = _a.usersIds, guidesIds = _a.guidesIds;
                _b = tour_1.createTours(10, guidesIds), tours = _b.tours, toursIds = _b.toursIds;
                reviews = review_1.getReviews(toursIds, usersIds);
                /* console.log(
                  `${users.length} |
                  ${usersIds.length} |
                  ${guidesIds.length} |
                  ${tours.length} |
                  ${toursIds.length} |
                  ${reviews.length}`
                );
                console.log(); */
                util_1.promisify(fs_1.writeFile)(path_1.join(__dirname, "data", "users.js"), JSON.stringify(users));
                util_1.promisify(fs_1.writeFile)(path_1.join(__dirname, "data", "usersId.js"), JSON.stringify(usersIds));
                util_1.promisify(fs_1.writeFile)(path_1.join(__dirname, "data", "guidesId.js"), JSON.stringify(guidesIds));
                util_1.promisify(fs_1.writeFile)(path_1.join(__dirname, "data", "tours.js"), JSON.stringify(tours));
                util_1.promisify(fs_1.writeFile)(path_1.join(__dirname, "data", "toursIds.js"), JSON.stringify(toursIds));
                /* promisify(writeFile)(
                  join(__dirname, "data", "reviews.js"),
                  JSON.stringify(reviews)
                ); */
                return [4 /*yield*/, mongo_1.fillDb("natours", tours, users, reviews)];
            case 2:
                /* promisify(writeFile)(
                  join(__dirname, "data", "reviews.js"),
                  JSON.stringify(reviews)
                ); */
                _c.sent();
                return [3 /*break*/, 4];
            case 3:
                err_1 = _c.sent();
                console.log("[ERROR] ", err_1.message);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
run();
