"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var slugify_1 = require("slugify");
var tourSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "A tour must have a name"],
        unique: true,
        trim: true,
        maxlength: [50, "A tour name must have less than 50 characters"],
        minlength: [5, "A tour name must have more than 5 characters"]
    },
    _timestamp: {
        type: Number
    },
    slug: {
        type: String
    },
    duration: {
        type: Number,
        required: [true, "A tour must have a duration"]
    },
    maxGroupSize: {
        type: Number,
        required: [true, "A tour must have a max group size"]
    },
    difficulty: {
        type: String,
        required: [true, "A tour must have a difficulty"],
        "enum": {
            values: ["easy", "medium", "difficult"],
            message: "Difficulty must be one of: easy, medium, difficult"
        }
    },
    ratingsAverage: {
        type: Number,
        "default": 4.5,
        min: [1, "Rating must be above 1.0"],
        max: [5, "Rating must be below 5.0"],
        set: function (val) { return Math.round(val * 10) / 10; }
    },
    ratingsQuantity: {
        type: Number,
        "default": 0
    },
    price: {
        type: Number,
        required: [true, "A tour must have a price"]
    },
    priceDiscount: {
        type: Number,
        validate: {
            validator: function (val) {
                //this.price - do not work on update
                return val < this.price;
            },
            message: "Discount price ({VALUE}) should be below regular price"
        }
    },
    summary: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true,
        required: [true, "A tour must have a description"]
    },
    imageCover: {
        type: String,
        required: [true, "A tour must have a imageCover"]
    },
    images: [String],
    createdAt: {
        type: Date,
        "default": Date.now(),
        select: false
    },
    startDates: [Date],
    secretTour: {
        type: Boolean,
        "default": false
    },
    startLocation: {
        //Geo JSON
        type: {
            type: String,
            "default": "Point",
            "enum": ["Point"]
        },
        coordinates: [Number],
        address: String,
        description: String
    },
    locations: [
        {
            type: {
                type: String,
                "default": "Point",
                "enum": ["Point"]
            },
            coordinates: [Number],
            address: String,
            description: String,
            day: Number
        },
    ],
    guides: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User"
        },
    ]
}, {
    //this options needs to show our virtual fields
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
tourSchema.index({ price: 1, ratingsAverage: -1 });
tourSchema.index({ slug: 1 });
tourSchema.index({ startLocation: "2dsphere" });
tourSchema.virtual("durationWeeks").get(function () {
    var weeks = this.duration / 7;
    return Math.round(weeks);
    //return (this as any).duration / 7;
});
// Virtual populate
tourSchema.virtual("reviews", {
    ref: "Review",
    foreignField: "tour",
    localField: "_id"
});
// DOCUMENT MIDDLEWARE - runs before only .save() and .create(), not .insertMany()
tourSchema.pre("save", function (next) {
    this.slug = slugify_1["default"](this.name, { lower: true });
    this._timestamp = this._timestamp
        ? this._timestamp
        : Date.now();
    next();
});
/* tourSchema.pre("save", function (next) {
  console.log("Another pre middleware");
  next();
}); */
/* tourSchema.post("save", function (doc, next) {
  console.log(doc);
  next();
}); */
/* EMBEDING */
/*  tourSchema.pre("save", async function(next) {
  const guidesPromises = (this as any).guides.map(async (id: string) => await UserModel.findById(id));
  (this as any).guides = await Promise.all(guidesPromises);
  next();
});  */
//QUERY MIDDLEWARE - runs for all string that start with find( find, findOne )
tourSchema.pre(/^find/, function (next) {
    //this - Query obj
    this.find({ secretTour: { $ne: true } });
    this.start = Date.now();
    next();
});
tourSchema.pre(/^find/, function (next) {
    this.populate({
        path: "guides",
        select: "-__v -passwordChangedAt"
    });
    next();
});
tourSchema.post(/^find/, function (docs, next) {
    console.log("Query took = " + (Date.now() - this.start) + " milliseconds.");
    //console.log(docs);
    next();
});
//AGGREGATION MIDDLEWARE
/* tourSchema.pre("aggregate", function(next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
}); */
var TourModel = mongoose_1.model("Tour", tourSchema);
exports["default"] = TourModel;
