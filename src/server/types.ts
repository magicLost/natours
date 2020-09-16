import { Request, Response, NextFunction } from "express";

export type RESPONSE_STATUS = "SUSSECC" | "FAIL" | "ERROR";

export interface IJsonResponseError {
  message: string;
  stack?: string;
  name?: string;
}

export interface ISimpleJsonResponse {
  status: RESPONSE_STATUS;
  error: IJsonResponseError;
}
export interface IDataJsonResponse extends ISimpleJsonResponse {
  data: any;
}

export type TExpressMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => void | undefined;
