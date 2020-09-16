import { Request, Response, NextFunction } from "express";
import { sign, verify } from "jsonwebtoken";
import { IUserModel } from "../User/User.model";
import { IUserRequest } from "./../../../types";

export const signToken = (id: string) => {
  return sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn:
      Date.now() +
      parseInt(process.env.JWT_COOKIE_EXPIRES_AT as string) *
        24 *
        60 *
        60 *
        1000,
  });
};

export const setCookieWithToken = (
  req: Request,
  res: Response,
  token: string
) => {
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() +
        parseInt(process.env.JWT_EXPIRES_AT as string) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });
};

export const hideUserPassword = (user: IUserModel) => {
  user.password = "";
  user.passwordConfirm = "";
};

export const isPermission = (roles: string[], req: Request): boolean => {
  if (!(req as IUserRequest).user) return false;
  return roles.includes((req as IUserRequest).user.role);
};
