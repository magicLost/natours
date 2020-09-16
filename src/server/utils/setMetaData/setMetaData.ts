import { Response, Request, NextFunction } from "express";
import { IUserRequest } from "../../controller/AuthController/AuthController";

export const setMetaData = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    //console.log("setMetaData", (request as any).user);
    let userStringify = "";
    let token = "";

    if ((request as any).csrfToken) token = (request as any).csrfToken();

    if ((request as IUserRequest).user) {
      userStringify = JSON.stringify({
        name: (request as IUserRequest).user.name,
        photo: (request as IUserRequest).user.photo,
      });
    }

    const metaData = `
    <meta name="csrf-token" content="${token}" />
    <meta name="auth" content='${userStringify}' />
    `;

    //console.log("setMetaData", metaData);

    (request as IUserRequest).metaData = metaData;
    next();
  } catch (error) {
    error.name = "SET_METADATA_ERROR";
    next(error);
  }
};
