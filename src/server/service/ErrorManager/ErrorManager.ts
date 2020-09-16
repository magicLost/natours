import { Request, Response, NextFunction } from "express";
import { RESPONSE_STATUS } from "../../types";

export interface IAppError extends Error {
  statusCode: number;
  //status: string;
  //isOperational: boolean;
  //type: ERROR_TYPE;
}

export type ERROR_TYPE = "API" | "SITE";

export class AppError extends Error implements IAppError {
  statusCode: number;
  //status: string;
  //isOperational: boolean;
  //type: ERROR_TYPE;

  constructor(message: string, statusCode: number) {
    super(message);

    //this.type = type;
    this.statusCode = statusCode;
    //this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    //this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export type IGetAppError<T extends Error> = (
  message: string,
  statusCode: number
) => T;

export interface IErrorManager<T extends Error> {
  status: RESPONSE_STATUS;
  statusCode: number;
  getAppError: IGetAppError<T>;
  globalErrorHandler: (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
}

export interface IErrorPages {
  serverError: string;
  notFound: string;
}

class ErrorManager<IAppError> implements IErrorManager<AppError> {
  status: RESPONSE_STATUS = "ERROR";
  statusCode: number = 500;
  message: string = "";
  stack: string | undefined;
  name: string = "";
  errorPages: IErrorPages;

  constructor(errorPages: IErrorPages) {
    this.errorPages = errorPages;
  }

  getAppError = (message: string, statusCode: number) => {
    return new AppError(message, statusCode);
  };

  globalErrorHandler = (
    err: AppError | Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    //console.log("Error handler");

    console.log(`[GLOBAL_ERROR_HANDLERR] ${err.name} | ${err.message}`);
    console.log();
    console.log(err);

    const isApi = this.isApi(req);

    this.resetValues();

    if (
      process.env.NODE_ENV === "development" ||
      process.env.NODE_ENV === "test"
    ) {
      if (err instanceof AppError) {
        this.statusCode = isApi ? 200 : err.statusCode;
        this.status = `${err.statusCode}`.startsWith("4") ? "FAIL" : "ERROR";
      } else {
        this.statusCode = 500;
        this.status = "ERROR";
      }

      this.message = err.message;
      this.stack = err.stack;
      this.name = err.name;

      this.sendErrorDev(req, res);
    } else {
      if (err instanceof AppError) {
        this.statusCode = isApi ? 200 : err.statusCode;
        this.status = `${err.statusCode}`.startsWith("4") ? "FAIL" : "ERROR";
        this.message = err.message;
      } else {
        this.parseError(err);
      }
      this.sendErrorProd(req, res);
    }
  };

  sendErrorDev = (req: Request, res: Response) => {
    //console.log("sendErrorDev");
    //console.log("[ERROR-sendErrorDev]", this.name, this.message, this.stack);
    if (this.isApi(req)) {
      res.status(this.statusCode).json({
        status: this.status,
        error: {
          message: this.message,
          stack: this.stack,
          name: this.name,
        },
        //message: err.message,
        //stack: err.stack,
      });
    } else {
      //throw new Error("No implementation for site error");
      //console.log("[ERROR]", this.message);

      this.sendErrorPage(res);
    }
  };

  sendErrorProd = (req: Request, res: Response) => {
    //console.log("sendErrorProd");
    if (this.isApi(req)) {
      res.status(this.statusCode).json({
        status: this.status,
        error: {
          message: this.message,
        },
      });
    } else {
      //console.log("[ERROR]", this.message);
      //throw new Error("No implementation for site error");
      this.sendErrorPage(res);
    }
  };

  parseError = (err: AppError | Error) => {
    if (err.name === "CastError") {
      this.message = `Invalid ${(err as any).path}: ${(err as any).value}`;
      this.statusCode = 200;
      this.status = "FAIL";
    } else if (err.name === "ValidationError") {
      const errors = Object.values((err as any).errors).map(
        (el: any) => el.message
      );
      this.message = `Invalid input data. ${errors[0]}`;
      this.statusCode = 200;
      this.status = "FAIL";
    } else if ((err as any).code === 11000) {
      const value = (err as any).errmsg.match(/(["'])(\\?.)*?\1/)[0];
      this.message = `Duplicate field value: ${value}. Please use another value`;
      this.statusCode = 200;
      this.status = "FAIL";
    } else if (err.name === "JsonWebTokenError") {
      this.message = "Invalid token. Please login again";
      this.statusCode = 200;
      this.status = "FAIL";
    } else if (err.name === "TokenExpiredError") {
      this.message = "Token has expired. Please login again";
      this.statusCode = 200;
      this.status = "FAIL";
    } else if ((err as any).code === "EBADCSRFTOKEN") {
      //console.log("EBADCSRFTOKEN", err);
      this.message = "Какая-то ошибочка...";
      this.statusCode = 200;
      this.status = "FAIL";
    } else {
      this.message = "Server error.";
      this.statusCode = 500;
      this.status = "ERROR";
    }
  };

  resetValues = () => {
    this.message = "";
    this.statusCode = 500;
    this.stack = undefined;
    this.status = "ERROR";
    this.name = "";
  };

  sendErrorPage = (res: Response) => {
    if (this.statusCode === 404) {
      return res.status(this.statusCode).send(this.errorPages.notFound);
    } else {
      return res.status(this.statusCode).send(this.errorPages.serverError);
    }
  };

  isApi = (req: Request) => {
    if (req.method === "POST") {
      return true;
    } else if (req.path.includes("api")) {
      return true;
    }

    return false;
  };
}

export default ErrorManager;
