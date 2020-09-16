import { ITourModel } from "../../entity/TourModel/TourModel";
import { Model } from "mongoose";
import {
  IAppError,
  IGetAppError,
} from "../../service/ErrorManager/ErrorManager";
import { Request, Response, NextFunction } from "express";
import { IUserRequest } from "../AuthController/AuthController";

class ViewController {
  tourModel: Model<ITourModel>;
  getAppError: IGetAppError<IAppError>;
  mainHtml: string;

  constructor(
    tourModel: Model<ITourModel>,
    getAppError: IGetAppError<IAppError>,
    mainHtml: string
  ) {
    this.tourModel = tourModel;
    this.getAppError = getAppError;
    this.mainHtml = mainHtml;
  }

  /* this.app.all("*", this.csrfProtection, (request, response, next) => {
    
  }); */

  allTours = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      //console.log("allTours", (request as IUserRequest).metaData);
      if ((request as IUserRequest).metaData) {
        let html = this.mainHtml.replace(
          "!!!META_DATA!!!",
          (request as IUserRequest).metaData
        );
        //console.log("allTours");
        return response.send(html);
      } else {
        console.log("NEXT");
        next(this.getAppError("No meta data on request", 500));
      }
    } catch (error) {
      console.log("NEXT1");
      next(error);
    }
  };

  /* tour = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tour = await this.tourModel
        .findOne({ slug: req.params.slug })
        .populate({
          path: "reviews",
          fields: "review rating user",
        });

      if (tour === null) return next(this.getAppError("No tour", 404));

      res.status(200).render("tour", {
        title: `${tour.name} Tour`,
        tour,
      });
    } catch (error) {
      next(error);
    }
  }; */
}

export default ViewController;
