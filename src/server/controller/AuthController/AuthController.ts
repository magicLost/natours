import crypto from "crypto";
import { promisify } from "util";
import { sign, verify } from "jsonwebtoken";
import { IUserModel } from "./../../entity/UserModel/UserModel";
import { Model } from "mongoose";
//import AppError from "../../service/ErrorManager/AppError";
import { Request, Response, NextFunction, RequestHandler } from "express";
import {
  IAppError,
  IGetAppError,
} from "../../service/ErrorManager/ErrorManager";
//import {ISimpleJsonResponse} from "../../types";
//import catchAsync from "../../utils/CatchAsync/catchAsync";
//import sendEmail from "./../../utils/email";

export interface IUserRequest extends Request<any> {
  user: IUserModel;
  csrfToken: () => string;
  metaData: string;
}

/* export interface IAuthController {
  jwtSecret: string;
  jwtVerify: (
    token: string,
    secret: string
  ) => Promise<{ id: string; iat: string }>;

  signup: (
    req: IUserRequest,
    res: Response,
    next: NextFunction
  ) => RequestHandler;
  login: (
    req: IUserRequest,
    res: Response,
    next: NextFunction
  ) => RequestHandler;

  protect: (
    req: IUserRequest,
    res: Response,
    next: NextFunction
  ) => RequestHandler;
  restrictTo: (...roles: string[]) => RequestHandler;

  forgotPassword: (
    req: IUserRequest,
    res: Response,
    next: NextFunction
  ) => RequestHandler;
  updatePassword: (
    req: IUserRequest,
    res: Response,
    next: NextFunction
  ) => RequestHandler;
  resetPassword: (
    req: IUserRequest,
    res: Response,
    next: NextFunction
  ) => RequestHandler;
} */

class AuthController /* implements IAuthController */ {
  //process.env.JWT_SECRET
  jwtSecret: string;
  jwtCookieExpiresAt: string;
  jwtExpiresAt: string;
  jwtVerify: (
    token: string,
    secret: string
  ) => Promise<{ id: string; iat: string }>;

  userModel: Model<IUserModel>;

  getAppError: IGetAppError<IAppError>;

  constructor(
    userModel: Model<IUserModel>,
    jwtSecret: string,
    jwtCookieExpiresAt: string,
    jwtExpiresAt: string,
    getAppError: IGetAppError<IAppError>
  ) {
    this.getAppError = getAppError;
    this.jwtCookieExpiresAt = jwtCookieExpiresAt;
    this.jwtExpiresAt = jwtExpiresAt;
    this.jwtSecret = jwtSecret;
    this.jwtVerify = promisify(verify) as any;
    this.userModel = userModel;
  }

  signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userModel.create({
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
      });

      this.createAndSendToken(user, 201, req, res);
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      //console.log("[LOGIN REQUEST]", req.body);

      /* TODO VALIDATE FORM DATA */
      if (!email || !password) {
        return next(
          this.getAppError("Please tell us your email and password...", 401)
        );
        /* return res.status(200).json({
          status: "fail",
          data: {
            error: "Please tell us your email and password...",
          },
        }); */
      }

      /* console.log("CSRF", _csrf);
      if (_csrf !== "ttoken") {
        return next(this.getAppError("Bad token...", 401));
      } */

      const user = await this.userModel
        .findOne({ email: email })
        .select("+password");

      if (!user || !(await user.correctPassword(password, user.password))) {
        return next(this.getAppError("Incorrect email or password...", 401));
        /* console.log(
          "[CHECK PASS]",
          PASSWORD,
          (user as any).password,
          await (user as any).correctPassword(PASSWORD, (user as any).password)
        ); */
        /* return res.status(200).json({
          status: "fail",
          data: {
            error: "Incorrect email or password...",
          },
        }); */
      }

      this.createAndSendToken(user, 200, req, res);
    } catch (error) {
      next(error);
    }
  };

  logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.cookie("jwt", "loggedout", {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
      });

      res.status(200).json({ status: "SUCCESS" });
    } catch (error) {
      next(error);
    }
  };

  isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.cookies.jwt) {
        /* VERIFY TOKEN */
        const decoded = await this.jwtVerify(req.cookies.jwt, this.jwtSecret);

        /* CHECK IF USER EXISTS */
        const user = await this.userModel.findById(decoded.id);

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
          this.jwtSecret
        );
        return next();
      } else if (error.name === "TokenExpiredError") {
        console.log(
          "[DEV_INFO] TokenExpiredError",
          req.cookies.jwt,
          this.jwtSecret
        );
        return next();
      } else {
        return next(error);
      }
    }
  };

  protect = async (req: Request, res: Response, next: NextFunction) => {
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

      if (!token) return next(this.getAppError("You are not logged in.", 401));

      /* VERIFY TOKEN */
      const decoded = await this.jwtVerify(token, this.jwtSecret);

      /* CHECK IF USER EXISTS */
      const user = await this.userModel.findById(decoded.id);

      if (!user)
        return next(
          this.getAppError(
            "The user belonging to this token does not exists.",
            401
          )
        );

      /* CHECK IF USER CHANGED PASSWORD AFTER THE TOKEN WAS ISSUED */
      if (user.changedPasswordAfter(decoded.iat)) {
        return next(
          this.getAppError(
            "User recently changed password. Please login again",
            401
          )
        );
      }

      /* GRANT ACCESS TO PROTECTED ROUTE */
      (req as IUserRequest).user = user;

      next();
    } catch (error) {
      next(error);
    }
  };

  restrictTo = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!roles.includes((req as IUserRequest).user.role)) {
        return next(
          this.getAppError(
            "You do not have permission to perform this action",
            403
          )
        );
      }

      next();
    };
  };

  forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userModel.findOne({ email: req.body.email });

      if (!user) {
        return next(
          this.getAppError("There is no user with email address.", 404)
        );
      }

      const resetToken = user.createPasswordResetToken();

      await user.save({ validateBeforeSave: false });

      const resetUrl = `${req.protocol}://${req.get(
        "host"
      )}/api/v1/users/reset-password/${resetToken}`;

      //const message = `Forgot your password? Submit a request with your new password and passwordConfirm to: ${resetUrl}`;

      try {
        /* await sendEmail({
          email: user.email,
          subject: "Your password reset token (valid for 10 minutes)",
          message
        }); */

        res.status(200).json({
          status: "success",
          message: "Token sent to email",
        });
      } catch (err) {
        user.passwordResetToken = "";
        user.passwordResetExpires = "";
        await user.save({ validateBeforeSave: false });

        return next(
          //"There was an error sending the email. Try again later!"
          this.getAppError(err.message, 500)
        );
      }
    } catch (error) {
      next(error);
    }
  };

  resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get user based on token
      const hashedToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

      const user = await this.userModel.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() + "" },
      });

      if (!user) {
        return next(this.getAppError("Token is invalid or expired", 400));
      }

      //set new password
      user.password = req.body.password;
      user.passwordConfirm = req.body.passwordConfirm;
      user.passwordResetToken = "";
      user.passwordResetExpires = "";

      //update user
      await user.save();

      //login user
      this.createAndSendToken(user, 200, req, res);
    } catch (error) {
      next(error);
    }
  };

  updatePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // 1 Get user from collection
      const user = await this.userModel
        .findById((req as IUserRequest).user.id)
        .select("+password");

      const { currentPassword, password, passwordConfirm } = req.body;

      if (!user)
        return next(
          this.getAppError("Some error. Please log in and try again...", 401)
        );

      // 2 Check if posted password correct
      if (!(await user.correctPassword(currentPassword, user.password))) {
        return next(
          this.getAppError("Wrong password. Please try again...", 401)
        );
      }

      // 3 Update password
      user.password = password;
      user.passwordConfirm = passwordConfirm;

      await user.save();

      // 4 Log user in
      this.createAndSendToken(user, 201, req, res);
    } catch (error) {
      next(error);
    }
  };

  signToken = (id: string) => {
    return sign({ id }, this.jwtSecret, {
      expiresIn:
        Date.now() + parseInt(this.jwtCookieExpiresAt) * 24 * 60 * 60 * 1000,
    });
  };

  createAndSendToken = (
    user: IUserModel,
    statusCode: number,
    req: Request,
    res: Response
  ) => {
    const token = this.signToken(user._id);

    //if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

    res.cookie("jwt", token, {
      expires: new Date(
        Date.now() + parseInt(this.jwtCookieExpiresAt) * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    });

    user.password = "";
    user.passwordConfirm = "";

    res.status(statusCode).json({
      status: "SUCCESS",
      data: {
        user,
        token,
      },
    });
  };
}

export default AuthController;
