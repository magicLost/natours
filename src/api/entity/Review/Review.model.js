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
var mongoose_1 = require("mongoose");
var Tour_model_1 = require("./../Tour/Tour.model");
var reviewSchema = new mongoose_1.Schema({
    review: {
        type: String,
        required: [true, "A review must have a review"],
        trim: true
    },
    rating: {
        type: Number,
        min: [1, "Rating must be above 1.0"],
        max: [5, "Rating must be below 5.0"]
    },
    createdAt: {
        type: Date,
        "default": Date.now
    },
    tour: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Tour",
        required: [true, "Review must belong to a tour."]
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Review must belong to a user."]
    }
}, {
    //this options needs to show our virtual fields
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
/* reviewSchema.pre(/^find/, function(next) {
  this.populate({
    path: "tour",
    select: "name _id"
  }).populate({
    path: "user",
    select: "name _id"
  });
  next();
}); */
/* PREVENT OF DUPLICATES REVIEW FROM ONE USER TO SAME TOUR */
reviewSchema.index({ tour: 1, user: 1 }, { unique: true });
reviewSchema.pre(/^find/, function (next) {
    this
        .populate({
        path: "user",
        select: "name photo _id"
    })
        .populate({
        path: "tour",
        select: "name _id"
    });
    next();
});
/* IMPLEMENTS CALC AND SET AVERAGE_RATING ON TOUR WHEN ADD OR UPDATE REVIEW ON THIS TOUR */
reviewSchema.statics.calcAverageRating = function (tourId) {
    return __awaiter(this, void 0, void 0, function () {
        var stats;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.aggregate([
                        {
                            $match: { tour: tourId }
                        },
                        {
                            $group: {
                                _id: "$tour",
                                nRating: { $sum: 1 },
                                avgRating: { $avg: "$rating" }
                            }
                        },
                    ])];
                case 1:
                    stats = _a.sent();
                    if (!(stats.length > 0)) return [3 /*break*/, 3];
                    return [4 /*yield*/, Tour_model_1["default"].findByIdAndUpdate(tourId, {
                            ratingsQuantity: stats[0].nRating,
                            ratingsAverage: stats[0].avgRating
                        })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, Tour_model_1["default"].findByIdAndUpdate(tourId, {
                        ratingsQuantity: 0,
                        ratingsAverage: 4.5
                    })];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
};
reviewSchema.post("save", function () {
    //this points to current review
    this.constructor.calcAverageRating(this.tour);
});
reviewSchema.pre(/^findOneAnd/, function (next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = this;
                    return [4 /*yield*/, this.findOne()];
                case 1:
                    _a.review = _b.sent();
                    next();
                    return [2 /*return*/];
            }
        });
    });
});
reviewSchema.post(/^findOneAnd/, function () {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.review.constructor.calcAverageRating(this.review.tour)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
});
var ReviewModel = mongoose_1.model("Review", reviewSchema);
exports["default"] = ReviewModel;
