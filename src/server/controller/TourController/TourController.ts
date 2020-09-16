import { Model } from "mongoose";
import { Request, Response, NextFunction } from "express";
//import MongoHelper from "../../service/MongoHelper/MongoHelper";
//import {IUserRequest} from "../../controller/AuthController/AuthController";
//import { IMongooseBaseOperations } from "../../utils/MongooseBaseOperations/MongooseBaseOperations";
//import catchAsync from "../../utils/CatchAsync/catchAsync";
import { ITourModel } from "../../entity/TourModel/TourModel";
import BaseMongooseController from "../BaseMongooseController/BaseMongooseController";
import { IAPIFeatures } from "../../service/APIFeatures/APIFeatures";
import { IAppError } from "../../service/ErrorManager/ErrorManager";
import { request } from "http";

//import AppError from "../../service/ErrorManager/AppError";

class TourController extends BaseMongooseController<ITourModel> {
  //tourModel: Model<ITourModel>;
  //mongoHelper: IMongooseBaseOperations;

  /* constructor(
    tourModel: Model<ITourModel>,
    AppError: IAppError,
    catchAsync: ICatchAsync,
    mongooseBaseOperations: IMongooseBaseOperations
  ) {
    this.tourModel = tourModel;
    this.mongoHelper = mongooseBaseOperations;
  } */

  constructor(
    features: IAPIFeatures<ITourModel>,
    Model: Model<ITourModel>,
    //errorManager: IErrorManager
    getAppError: (message: string, statusCode: number) => IAppError
  ) {
    super(features, Model, getAppError);
  }

  aliasTopTours = (req: Request, res: Response, next: NextFunction) => {
    req.query.limit = "5";
    req.query.sort = "-ratingsAverage,price";
    req.query.fields = "name,price,ratingsAverage,summary,difficulty";
    next();
  };

  /* getAllTours = () => {
    console.log("getAllTours");
    return this.getAll(this.tourModel);
  }; */

  getAllTours = async (req: Request, res: Response, next: NextFunction) =>
    await this.getAll(req, res, next);

  getTourBySlug = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tour = await this.Model.findOne({ slug: req.params.slug }).populate(
        {
          path: "reviews",
          fields: "review rating user"
        }
      );
      if (!tour) {
        return next(this.getAppError("No tour found", 404));
      }

      res.status(200).json({
        status: "success",
        data: {
          tour
        }
      });
    } catch (error) {
      next(error);
    }
  };

  getTourById = async (req: Request, res: Response, next: NextFunction) =>
    await this.getOne({ path: "reviews" })(req, res, next);

  /* createTour = async (req: Request, res: Response, next: NextFunction) =>
    await this.createOne(req, res, next);

  updateTour = async (req: Request, res: Response, next: NextFunction) =>
    await this.updateOne(req, res, next);

  deleteTour = async (req: Request, res: Response, next: NextFunction) =>
    await this.deleteOne(req, res, next);
 */
  getTourStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const stats = await this.Model.aggregate([
        {
          $match: { ratingsAverage: { $gte: 4.5 } }
        },
        {
          $group: {
            _id: { $toUpper: "$difficulty" },
            numTours: { $sum: 1 },
            numRatings: { $sum: "$ratingsQuantity" },
            avgRating: { $avg: "$ratingsAverage" },
            avgPrice: { $avg: "$price" },
            minPrice: { $min: "$price" },
            maxPrice: { $max: "$price" }
          }
        },
        {
          $sort: {
            avgPrice: 1
          }
        },
        {
          $match: { _id: { $ne: "EASY" } } //102
        }
      ]);

      res.status(200).json({
        status: "success",
        data: {
          stats
        }
      });
    } catch (error) {
      next(error);
    }
  };

  getMonthlyPlan = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const year = parseInt(req.params.year);

      const plan = await this.Model.aggregate([
        {
          $unwind: "$startDates"
        },
        {
          $match: {
            startDates: {
              $gte: new Date(`${year}-01-01`),
              $lte: new Date(`${year}-12-31`)
            }
          }
        },
        {
          $group: {
            _id: { $month: "$startDates" },
            numTourStarts: { $sum: 1 },
            tours: { $push: "$name" }
          }
        },
        {
          $addFields: { month: "$_id" }
        },
        {
          $project: {
            _id: 0 //no longer show up
          }
        },
        {
          $sort: { numTourStarts: -1 }
        },
        {
          $limit: 6
        }
      ]);

      res.status(200).json({
        status: "success",
        results: plan.length,
        data: {
          plan
        }
      });
    } catch (error) {
      next(error);
    }
  };

  // /tours-within/233/center/-40,45/unit/mi
  getToursWithin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { distance, latlng, unit } = req.params;

      const [lat, lng] = latlng.split(",");

      const radius =
        unit === "mi"
          ? parseInt(distance) / 3963.2
          : parseInt(distance) / 6378.1;

      if (!lat || !lng) {
        next(
          this.getAppError("Please, provide latitute and longitute...", 400)
        );
      }

      const tours = await this.Model.find({
        startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
      });

      res.status(200).json({
        status: "success",
        results: tours.length,
        data: {
          lat,
          lng,
          distance,
          unit,
          tours
        }
      });
    } catch (error) {
      next(error);
    }
  };

  getDistances = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { latlng, unit } = req.params;

      const [lat, lng] = latlng.split(",");

      const multiplier = unit === "mi" ? 0.000621371 : 0.001;

      if (!lat || !lng) {
        next(
          this.getAppError("Please, provide latitute and longitute...", 400)
        );
      }

      const distances = await this.Model.aggregate([
        {
          //needs index in schema
          $geoNear: {
            near: {
              type: "Point",
              coordinates: [(lng as any) * 1, (lat as any) * 1]
            },
            distanceField: "distance",
            distanceMultiplier: multiplier
          }
        },
        {
          $project: {
            distance: 1,
            name: 1
          }
        }
      ]);

      res.status(200).json({
        status: "success",
        //results: tours.length,
        data: {
          lat,
          lng,
          distances,
          unit
          //tours
        }
      });
    } catch (error) {
      next(error);
    }
  };
}

export default TourController;
