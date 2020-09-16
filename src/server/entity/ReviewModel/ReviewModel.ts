import mongoose, { Types, Document, Model, Query, Schema } from "mongoose";
import TourModel from "./../TourModel/TourModel";
import { ISchemaRef } from "../TourModel/TourModel";

export interface IReviewModel extends Document {
  review: string;
  rating: number;
  createdAt: Date;
  tour: ISchemaRef;
  user: ISchemaRef;
}

const reviewSchema = new Schema(
  {
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
      default: Date.now
    },
    tour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tour",
      required: [true, "Review must belong to a tour."]
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Review must belong to a user."]
    }
  },
  {
    //this options needs to show our virtual fields
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

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

reviewSchema.pre(/^find/, function(next) {
  (this as Query<IReviewModel>).populate({
    path: "user",
    select: "name photo _id"
  });

  next();
});

/* IMPLEMENTS CALC AND SET AVERAGE_RATING ON TOUR WHEN ADD OR UPDATE REVIEW ON THIS TOUR */
reviewSchema.statics.calcAverageRating = async function(tourId: string) {
  const stats = await this.aggregate([
    {
      $match: { tour: tourId }
    },
    {
      $group: {
        _id: "$tour",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" }
      }
    }
  ]);

  if (stats.length > 0) {
    await TourModel.findByIdAndUpdate(tourId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating
    });
  } else {
    await TourModel.findByIdAndUpdate(tourId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5
    });
  }
};

reviewSchema.post("save", function() {
  //this points to current review
  (this as any).constructor.calcAverageRating((this as any).tour);
});

reviewSchema.pre(/^findOneAnd/, async function(next) {
  (this as any).review = await (this as Model<IReviewModel>).findOne();

  next();
});

reviewSchema.post(/^findOneAnd/, async function() {
  await (this as any).review.constructor.calcAverageRating(
    (this as any).review.tour
  );
});

const ReviewModel = mongoose.model<IReviewModel>("Review", reviewSchema);

export default ReviewModel;
