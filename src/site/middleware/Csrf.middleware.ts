import csrf from "csurf";
import { Request, Response, NextFunction } from "express";

//export const csrfProtection = csrf({ cookie: true });

export const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
  },
});

const _next = (err: Error) => {
  //console.log("[CSRF_PROTECTION] NEXT");
  if (err) {
    throw err;
  }
};

export const csrfProtectionGraphQL = (req: Request, res: Response) => {
  csrfProtection(req, res, _next);
};
