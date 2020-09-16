import { Response, Request, NextFunction } from "express";

export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //console.log("Error handler");

  console.log(`[GLOBAL_ERROR_HANDLER] ${err.message}`);

  //const isApi = this.isApi(req);

  ///this.resetValues();

  res
    .status(200)
    .json({
      errors: [{ message: err.message }],
      data: null,
    })
    .end();
};

export const parseMongooseErrorGraphQL = (err: Error): string => {
  if (err.name === "CastError") {
    return `Invalid ${(err as any).path}: ${(err as any).value}`;
  } else if (err.name === "ValidationError") {
    const errors = Object.values((err as any).errors).map(
      (el: any) => el.message
    );
    return `Invalid input data. ${errors[0]}`;
  } else if ((err as any).code === 11000) {
    const value = (err as any).errmsg.match(/(["'])(\\?.)*?\1/)[0];
    return `Duplicate field value: ${value}. Please use another value`;
  } else {
    return "";
  }
};

/* import { Request, Response, NextFunction } from "express";
import { RESPONSE_STATUS } from "./../types";
import { getErrorPages } from "./errorManager.helper";
import { path as rootPath } from "app-root-path";
import path from "path";
import AppError from "./AppError";

export interface IErrorPages {
  serverError: string;
  notFound: string;
}

let status: RESPONSE_STATUS = "ERROR";
let statusCode: number = 500;
let message: string = "";
let stack: string | undefined = "";
let name: string = "";
let errorPages: IErrorPages | undefined = undefined;

const init = async () => {
  errorPages = await getErrorPages(
    path.join(rootPath, "config", "htmlTemplates"),
    "server-error.html",
    "not-found-page.html"
  );
};

init();

export const globalErrorHandler = (
  err: AppError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //console.log("Error handler");

  console.log(`[GLOBAL_ERROR_HANDLER] ${err.message}`);

  //const isApi = this.isApi(req);

  ///this.resetValues();

  if (
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "test"
  ) {
    if (err instanceof AppError) {
      statusCode = err.statusCode;
      status = `${err.statusCode}`.startsWith("4") ? "FAIL" : "ERROR";
    } else {
      statusCode = 500;
      status = "ERROR";
    }

    message = err.message;
    stack = err.stack;
    name = err.name;

    sendErrorDev(req, res);
  } else {
    if (err instanceof AppError) {
      statusCode = err.statusCode;
      status = `${err.statusCode}`.startsWith("4") ? "FAIL" : "ERROR";
      message = err.message;
    } else {
      parseError(err);
    }
    sendErrorProd(req, res);
  }
};

export const sendErrorDev = (req: Request, res: Response) => {
  //console.log("sendErrorDev");
  //console.log("[ERROR-sendErrorDev]", this.name, this.message, this.stack);
  sendErrorPage(res);
};

export const sendErrorProd = (req: Request, res: Response) => {
  sendErrorPage(res);
};



export const sendErrorPage = (res: Response) => {
  if (!errorPages || !errorPages.notFound || !errorPages.notFound)
    return res.status(500).send();
  if (statusCode === 404) {
    return res.status(statusCode).send(errorPages.notFound);
  } else {
    return res.status(statusCode).send(errorPages.serverError);
  }
};
 */
