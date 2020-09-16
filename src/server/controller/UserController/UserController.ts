//import BaseMiddleware from "../BaseMiddleware/BaseMiddleware";
import { Request, Response, NextFunction } from "express";
import { Model } from "mongoose";
import { IUserModel } from "./../../entity/UserModel/UserModel";
import { IUserRequest } from "./../AuthController/AuthController";
//import AppError from "../../service/ErrorManager/AppError";
import BaseMongooseController from "../BaseMongooseController/BaseMongooseController";
import { IAPIFeatures } from "../../service/APIFeatures/APIFeatures";
import {
  IAppError,
  IGetAppError
} from "../../service/ErrorManager/ErrorManager";

class UserController extends BaseMongooseController<IUserModel> {
  //userModel: Model<IUserModel>;

  constructor(
    features: IAPIFeatures<IUserModel>,
    Model: Model<IUserModel>,
    //errorManager: IErrorManager
    getAppError: IGetAppError<IAppError>
  ) {
    super(features, Model, getAppError);
  }

  /* getAllUsers = this.catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const users = await this.userModel.find({}, null, { limit: 100 });

      res.status(200).json({
        status: "success",
        results: users.length,
        data: {
          users
        }
      });
    }
  ); */

  getUserById = async (req: Request, res: Response, next: NextFunction) =>
    await this.getOne()(req, res, next);

  getMe = (req: Request, res: Response, next: NextFunction) => {
    req.params.id = (req as any).user.id;
    next();
    /* if ((req as IUserRequest).user) {
      const user = (req as IUserRequest).user;
      user.password = "";
      user.passwordConfirm = "";

      res.status(200).json({
        status: "success",
        data: {
          user
        }
      });
    } else {
      res.status(404).json({
        status: "fail",
        message: "You must login first..."
      });
    } */
  };

  updateMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // 1 Create error if user post password
      if (req.body.password || req.body.passwordConfirm) {
        return next(
          this.getAppError(
            "This route is not for password updates. Please use /update-password",
            400
          )
        );
      }

      // 2 Update user document
      const filteredBody = this.filterObj(req.body, "name", "email");

      if ((req as IUserRequest).user === undefined)
        throw new Error("No user in request object");

      const updatedUser = await this.Model.findByIdAndUpdate(
        (req as IUserRequest).user.id,
        filteredBody,
        {
          new: true,
          runValidators: true
        }
      );

      res.status(200).json({
        status: "success",
        data: {
          user: updatedUser
        }
      });
    } catch (error) {
      next(error);
    }
  };

  deleteMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if ((req as IUserRequest).user === undefined)
        throw new Error("No user in request object");

      await this.Model.findByIdAndUpdate((req as IUserRequest).user.id, {
        active: false
      });

      res.status(204).json({
        status: "success",
        data: null
      });
    } catch (error) {
      next(error);
    }
  };

  createUser = (req: Request, res: Response) => {
    res.status(501).json({
      status: "fail",
      message: "Not implemented"
    });
  };

  /* updateUser = this.catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      //new: true - says that in tour it was updated tour
      const doc = await this.userModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true
        }
      );

      if (!doc) {
        return next(new AppError("No document found", 404));
      }

      res.status(201).json({
        status: "success",
        data: {
          doc
        }
      });
    }
  ); */

  /* deleteUser = this.catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      //new: true - says that in tour it was updated tour
      const doc = await this.userModel.findByIdAndDelete(req.params.id);

      if (!doc) {
        return next(new AppError("No document found", 404));
      }

      res.status(204).json({
        status: "success",
        data: null
      });
    }
  ); */

  filterObj = (
    obj: { [string: string]: string },
    ...allowedFields: string[]
  ) => {
    const newObj: { [string: string]: string } = {};

    Object.keys(obj).forEach((element: string) => {
      if (allowedFields.includes(element)) newObj[element] = obj[element];
    });

    return newObj;
  };
}

export default UserController;
