import { Model } from "mongoose";
import { Request, Response, NextFunction } from "express";
import { IReviewModel } from "../../entity/ReviewModel/ReviewModel";
import { IUserRequest } from "../../controller/AuthController/AuthController";
import BaseMongooseController from "../BaseMongooseController/BaseMongooseController";
import { IAPIFeatures } from "../../service/APIFeatures/APIFeatures";
import { IAppError } from "../../service/ErrorManager/ErrorManager";

//import catchAsync from "../../utils/CatchAsync/catchAsync";

class ReviewController extends BaseMongooseController<IReviewModel> {
  constructor(
    features: IAPIFeatures<IReviewModel>,
    Model: Model<IReviewModel>,
    //errorManager: IErrorManager
    getAppError: (message: string, statusCode: number) => IAppError
  ) {
    super(features, Model, getAppError);
  }

  setTourUserIds = (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.tour) req.body.tour = req.params.tourId;

    if (!req.body.user) req.body.user = (req as IUserRequest).user.id;

    next();
  };

  /* createReview = () => createOne(this.reviewModel);

  updateReview = () => updateOne(this.reviewModel);

  deleteReview = () => deleteOne(this.reviewModel); */

  getReviewById = async (req: Request, res: Response, next: NextFunction) =>
    await this.getOne()(req, res, next);

  getReviewsByUserId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const reviews = await this.Model.find({
        user: (req as IUserRequest).user.id
      });

      res.status(200).json({
        status: "success",
        results: reviews.length,
        data: {
          reviews
        }
      });
    } catch (error) {
      next(error);
    }
  };

  getReviewsByTourId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const reviews = await this.Model.find({ user: req.body.tourId });

      res.status(200).json({
        status: "success",
        results: reviews.length,
        data: {
          reviews
        }
      });
    } catch (error) {
      next(error);
    }
  };
}

export default ReviewController;
