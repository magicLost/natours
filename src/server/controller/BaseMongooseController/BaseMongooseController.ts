import { IAPIFeatures } from "../../service/APIFeatures/APIFeatures";
import { Document, Model, ModelPopulateOptions } from "mongoose";
import {
  IAppError,
  IGetAppError
} from "../../service/ErrorManager/ErrorManager";
import { Request, Response, NextFunction } from "express";

class BaseMongooseController<T extends Document> {
  features: IAPIFeatures<T>;
  Model: Model<T>;
  //errorManager: IErrorManager;
  getAppError: IGetAppError<IAppError>;

  constructor(
    features: IAPIFeatures<T>,
    Model: Model<T>,
    //errorManager: IErrorManager
    getAppError: IGetAppError<IAppError>
  ) {
    this.features = features;
    this.Model = Model;
    //this.errorManager = errorManager;
    this.getAppError = getAppError;
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      //console.log("start getAll");
      const filter: { tour?: string } = {};
      if (req.params.tourId) filter.tour = req.params.tourId;

      //const docs = await features.query.explain();
      //const docs = await features.mongooseQuery;
      const docs = await this.features.run(req.query).sendQueryToMongo();

      res.status(200).json({
        status: "success",
        results: docs.length,
        data: {
          docs
        }
      });
    } catch (error) {
      next(error);
    }
  };

  deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      //new: true - says that in tour it was updated tour
      const doc = await this.Model.findByIdAndDelete(req.params.id);

      if (!doc) {
        return next(this.getAppError("No document found", 404));
      }

      res.status(204).json({
        status: "success",
        data: null
      });
    } catch (error) {
      next(error);
    }
  };

  updateOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      //new: true - says that in tour it was updated tour
      const doc = await this.Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });

      if (!doc) {
        return next(this.getAppError("No document found", 404));
      }

      res.status(201).json({
        status: "success",
        data: {
          doc
        }
      });
    } catch (error) {
      next(error);
    }
  };

  createOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      //console.log(req.body);

      /* const newTour = new Tour({});
      newTour.save(); */
      const doc = await this.Model.create(req.body);

      res.status(201).json({
        status: "success",
        data: {
          doc
        }
      });
    } catch (error) {
      next(error);
    }
  };

  protected getOne = (popOptions?: ModelPopulateOptions) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        let query = this.Model.findById(req.params.id);

        if (popOptions) query = query.populate(popOptions);

        const docs = await query;

        if (!docs) {
          return next(this.getAppError("No docs found", 404));
        }

        res.status(200).json({
          status: "success",
          data: {
            docs
          }
        });
      } catch (error) {
        next(error);
      }
    };
  };
}

export default BaseMongooseController;
