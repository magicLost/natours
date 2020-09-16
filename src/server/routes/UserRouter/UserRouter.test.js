import request from "supertest";
import express, { static as staticMiddleware } from "express";
import UserRouter from "./UserRouter";
//import ViewController from "../../controller/ViewController/ViewController";
import MockAuthController from "../../controller/AuthController/__mock__/MockAuthController";
import MockUserController from "../../controller/UserController/__mock__/MockUserController";

describe("UserRouter", () => {
  let app = null;

  let userRouter = null;

  const csrfProtection = jest.fn().mockImplementation((req, res, next) => {
    //req.metaData = "meta-data";
    console.log("csrfProtection");
    req.queue += "csrf";
    next();
  });

  const authController = new MockAuthController();

  const userController = new MockUserController();

  const multer = jest.fn().mockImplementation((req, res, next) => {
    console.log("multerUpload.none");
    req.queue = "multer";
    next();
  });

  const multerUpload = {
    none: () => {
      return multer;
    },
  };

  beforeEach(() => {
    userRouter = new UserRouter(
      authController,
      userController,
      multerUpload,
      csrfProtection
    );

    app = express();

    app.use("/", userRouter.getRouter());
  });

  /* this.router.post(
      "/logout",
      this.multerUpload.none(),
      this.csrfProtection,
      this.authController.logout
    ); */
  test("/logout - it must call multerUpload, csrfProtection, logout and send json response with set cookie(empty cookie)", async () => {
    const response = await request(app).post("/logout");

    expect(csrfProtection).toHaveBeenCalledTimes(1);
    expect(multer).toHaveBeenCalledTimes(1);

    expect(authController.logout).toHaveBeenCalledTimes(1);

    //console.log(response);

    expect(response.statusCode).toEqual(200);
    expect(
      response.headers["set-cookie"][0].includes("jwt=multercsrf")
    ).toEqual(true);
    expect(response.text).toEqual('{"status":"SUCCESS"}');
  });
});
