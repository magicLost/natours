import { Request, Response, NextFunction } from "express";
import { sign, verify } from "jsonwebtoken";
import { promisify } from "util";
import UserModel, { IUserModel } from "../../api/entity/User/User.model";
import AppError from "../../error/AppError";
import { IUserRequest } from "./../../types";

const sendSuccessResponse = (res: Response, statusCode: number, data: any) => {
  res.status(statusCode).json({
    status: "SUCCESS",
    data: data,
  });
};

export const isLoggedIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.cookies.jwt) {
      /* VERIFY TOKEN */
      const decoded = await promisify(verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      /* CHECK IF USER EXISTS   */
      /* TODO: check from redis  */
      const user = await UserModel.findById(decoded.id);

      if (!user) return next();

      /* CHECK IF USER CHANGED PASSWORD AFTER THE TOKEN WAS ISSUED */
      if (user.changedPasswordAfter(decoded.iat)) {
        return next();
      }

      /* THERE IS A LOGGED IN USER */
      (req as IUserRequest).user = user;

      next();
    }
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      console.log(
        "[DEV_INFO] JsonWebTokenError",
        req.cookies.jwt,
        process.env.JWT_SECRET
      );
      return next();
    } else if (error.name === "TokenExpiredError") {
      console.log(
        "[DEV_INFO] TokenExpiredError",
        req.cookies.jwt,
        process.env.JWT_SECRET
      );
      return next();
    } else {
      return next(error);
    }
  }
};

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /* GET TOKEN */
    let token: string = "";
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) return next(new AppError("You are not logged in.", 401));

    /* VERIFY TOKEN */
    const decoded = await promisify(verify)(
      req.cookies.jwt,
      process.env.JWT_SECRET
    );

    /* CHECK IF USER EXISTS */
    const user = await UserModel.findById(decoded.id);

    if (!user)
      return next(
        new AppError("The user belonging to this token does not exists.", 401)
      );

    /* CHECK IF USER CHANGED PASSWORD AFTER THE TOKEN WAS ISSUED */
    if (user.changedPasswordAfter(decoded.iat)) {
      return next(
        new AppError("User recently changed password. Please login again", 401)
      );
    }

    /* GRANT ACCESS TO PROTECTED ROUTE */
    (req as IUserRequest).user = user;

    next();
  } catch (error) {
    next(error);
  }
};

export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes((req as IUserRequest).user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }

    next();
  };
};
