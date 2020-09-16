import express, { Router } from "express";
import ViewController from "../../controller/ViewController/ViewController";
import { IRouter } from "../UserRouter/UserRouter";
import { TExpressMiddleware } from "../../types";
import AuthController from "../../controller/AuthController/AuthController";

class ViewRouter implements IRouter {
  viewController: ViewController;
  authController: AuthController;
  csrfProtection: TExpressMiddleware;
  setMetaData: TExpressMiddleware;
  router: Router;

  constructor(
    viewController: ViewController,
    csrfProtection: TExpressMiddleware,
    setMetaData: TExpressMiddleware,
    authController: AuthController
  ) {
    this.viewController = viewController;
    this.csrfProtection = csrfProtection;
    this.setMetaData = setMetaData;
    this.authController = authController;

    this.router = express.Router();

    this.init();
  }

  init = () => {
    this.router.use(
      this.authController.isLoggedIn,
      this.csrfProtection,
      this.setMetaData
    );

    this.router.get("/", this.viewController.allTours);

    //this.router.get("/tour/:slug", this.viewController.getTour);
  };

  getRouter = () => {
    return this.router;
  };
}

export default ViewRouter;
