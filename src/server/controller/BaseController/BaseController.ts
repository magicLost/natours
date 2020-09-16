import { Request, Response, NextFunction } from "express";

import DynamicImportSsr from "../../service/DynamicImportSsr/DynamicImportSsr";
import { IRoute } from "../../../routes/routes";
import { IUserRequest } from "../AuthController/AuthController";

/* export const renderSsrDiPage = (dynamicImportSsr: DynamicImportSsr, routes: Map<string, IRoute>) => {

    return catchAsync(async (request: express.Request, response: express.Response, next: express.NextFunction) => {

        //console.log("renderSsrDiPage path", request.path);

        const page = await dynamicImportSsr.renderHtmlPage(routes.get(request.path) as IRoute);
  
        response.status(200).send(page);

    });
}; */

class BaseController {
  dynamicImportSsr: DynamicImportSsr;
  routes: Map<string, IRoute>;

  constructor(dynamicImportSsr: DynamicImportSsr, routes: Map<string, IRoute>) {
    this.dynamicImportSsr = dynamicImportSsr;
    this.routes = routes;
  }

  index = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const page = await this.dynamicImportSsr.renderHtmlPage(
        this.routes.get(request.path) as IRoute
      );

      response.status(200).send(page);
    } catch (error) {
      next(error);
    }
  };
}

export default BaseController;
