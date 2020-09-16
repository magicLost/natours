import React from "react";
import path from "path";
import App from "../client/App";

//import { path as rootPath } from "app-root-path";
//import routes, {IRoute} from "../routes/routes";
//import DynamicImportSsr from './service/DynamicImportSsr/DynamicImportSsr';
import FileSystemHelper from "./utils/FileSystem/FileSystemHelper";

import express, { static as staticMiddleware, Express } from "express";
import multer from "multer";
import cookieParser from "cookie-parser";
//import { checkRouteForExisting } from './controller/NotFoundController';
//import  BaseController  from './controller/BaseController/BaseController';

//import globalErrorHandler from "./utils/globalErrorHandler/globalErrorHandler";

import { setMetaData } from "./utils/setMetaData/setMetaData";
import UserRouter from "./routes/UserRouter/UserRouter";
import AuthController from "./controller/AuthController/AuthController";
import UserController from "./controller/UserController/UserController";
import UserModel, { IUserModel } from "./entity/UserModel/UserModel";
import TourRouter from "./routes/TourRouter/TourRouter";
import TourController from "./controller/TourController/TourController";
import TourModel, { ITourModel } from "./entity/TourModel/TourModel";
import ReviewRouter from "./routes/ReviewRoutes/ReviewRouter";
import ReviewController from "./controller/ReviewController/ReviewController";
import ReviewModel, { IReviewModel } from "./entity/ReviewModel/ReviewModel";
import ErrorManager, {
  IErrorManager,
  IAppError,
  IErrorPages,
} from "./service/ErrorManager/ErrorManager";
import APIFeatures from "./service/APIFeatures/APIFeatures";
import TestRouter from "./routes/TestRouter/TestRouter";
import csrf from "csurf";
import { IUserRequest } from "./controller/AuthController/AuthController";
import ViewRouter from "./routes/ViewRouter/ViewRouter";
import ViewController from "./controller/ViewController/ViewController";

class Kernel {
  app: Express | undefined = undefined;

  //mainHtml: string;

  rootPath: string;

  fileSystemHelper: FileSystemHelper;

  //dynamicImportSsr: DynamicImportSsr;

  authController: AuthController;

  //baseController: BaseController;

  userRouter: UserRouter;

  tourRouter: TourRouter;

  testRouter: TestRouter;

  viewRouter: ViewRouter;

  errorManager: IErrorManager<IAppError>;

  upload: any;

  csrfProtection: any;

  constructor(rootPath: string, mainHtmlPage: string, errorPages: IErrorPages) {
    this.rootPath = rootPath;
    //this.mainHtml = "";
    /* const pathToIndexHtml = path.resolve(
      this.rootPath,
      "public",
      "iiindex.html"
    ); */

    this.upload = multer();
    this.csrfProtection = csrf({ cookie: true });
    this.fileSystemHelper = new FileSystemHelper();
    /* this.dynamicImportSsr = new DynamicImportSsr(
      <App />,
      routes,
      this.fileSystemHelper,
      path.join(__dirname, "..", "public", "loadable-stats.json"),
      path.join(__dirname, "..", "config", "htmlTemplates", "base.di.template.html"),
      ""
    ); */
    //this.baseController = new BaseController(this.dynamicImportSsr, routes);

    /*  if (!this.fileSystemHelper.isFileExists(pathToIndexHtml))
      throw new Error(`No index.html file on address - ${pathToIndexHtml}`);

    let mainHtml = "";

    this.fileSystemHelper.readFile(pathToIndexHtml).then((data: string) => {
      mainHtml = data;
    }); */

    this.errorManager = new ErrorManager(errorPages);

    this.authController = new AuthController(
      UserModel,
      process.env.JWT_SECRET as string,
      process.env.JWT_COOKIE_EXPIRES_AT as string,
      process.env.JWT_EXPIRES_AT as string,
      this.errorManager.getAppError
    );

    this.userRouter = new UserRouter(
      this.authController,
      new UserController(
        new APIFeatures<IUserModel>(UserModel),
        UserModel,
        this.errorManager.getAppError
      ),
      this.upload,
      this.csrfProtection
    );

    this.tourRouter = new TourRouter(
      this.authController,
      new TourController(
        new APIFeatures<ITourModel>(TourModel),
        TourModel,
        this.errorManager.getAppError
      ),
      new ReviewRouter(
        this.authController,
        new ReviewController(
          new APIFeatures<IReviewModel>(ReviewModel),
          ReviewModel,
          this.errorManager.getAppError
        )
      )
    );

    this.testRouter = new TestRouter();

    this.viewRouter = new ViewRouter(
      new ViewController(
        TourModel,
        this.errorManager.getAppError,
        mainHtmlPage
      ),
      this.csrfProtection,
      setMetaData,
      this.authController
    );

    this.run();
  }

  run = () => {
    this.app = express();

    this.app.use((req, res, next) => {
      //console.log(`[PATH] ${req.originalUrl}`);
      res.append("Access-Control-Allow-Origin", ["*"]);
      res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
      res.append("Access-Control-Allow-Headers", "Content-Type");
      next();
    });

    this.app.use(express.json({ limit: "10kb" })); // for parsing application/json

    this.app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

    this.app.use(cookieParser());

    this.app.use(staticMiddleware(path.resolve(this.rootPath, "public")));

    //app.use(checkRouteForExisting);

    this.app.use(
      "/api/v1/users",
      //this.upload.none(),
      this.userRouter.getRouter()
    );

    this.app.use("/api/v1/tours", this.tourRouter.getRouter());

    /* TEST */

    this.app.use("/test", this.testRouter.getRouter());

    /* END TEST */

    /* this.app.all("*", this.csrfProtection, (request, response, next) => {
      let html = this.mainHtml.replace(
        "!!!CSRF_TOKEN!!!",
        (request as any).csrfToken()
      );

      if ((request as IUserRequest).user) {
        html = this.mainHtml.replace(
          "!!!USER!!!",
          JSON.stringify({
            name: (request as IUserRequest).user.name,
            photo: (request as IUserRequest).user.photo,
          })
        );
      } else {
        html = this.mainHtml.replace("!!!USER!!!", "");
      }

      response.send(html);
    }); */

    if (this.viewRouter === undefined) throw new Error("No view router...");

    this.app.use(
      "/",
      /* (req, res, next) => {
        console.log("viewRouter");
        next();
      }, */
      this.viewRouter.getRouter()
    );

    this.app.use((req, res, next) => {
      if (res.headersSent) {
        console.log(
          "[Wierd strange not error, we get into middleware after response was send.]",
          req.method,
          req.originalUrl
        );
      } else {
        next(this.errorManager.getAppError("Not found resource", 404));
      }
    });

    this.app.use(this.errorManager.globalErrorHandler);
  };

  /* initSsr = () => {
    
    // Serving static file
     const options = {
      dotfiles: 'ignore',
      etag: false,
      extensions: ['js', 'html', "css"],
      fallthrough: true, //show or not error - true - not show
      index: false,
      maxAge: '1d',
      redirect: false,
      setHeaders: function (res: express.Response, path: string, stat: any) {
        console.log("What response ", path);
    
        res.set('x-timestamp', Date.now().toString());
      } 
    }
     
    this.app.use(staticMiddleware(path.join(__dirname, "..", "public")));
    
    //app.use(checkRouteForExisting);
    
    this.app.all("*", this.baseController.index); 
    
    this.app.use(this.errorController.globalErrorHandler);
    
  } */
}

export default Kernel;
