import express, { Router } from "express";
import AuthController from "../../controller/AuthController/AuthController";
import UserController from "../../controller/UserController/UserController";

export interface IRouter {
  getRouter: () => Router;
}

class UserRouter implements IRouter {
  authController: AuthController;
  userController: UserController;
  multerUpload: any;
  csrfProtection: any;
  router: Router;

  constructor(
    authController: AuthController,
    userController: UserController,
    multerUpload: any,
    csrfProtection: any
  ) {
    this.authController = authController;
    this.userController = userController;
    this.multerUpload = multerUpload;
    this.csrfProtection = csrfProtection;

    this.router = express.Router();

    this.init();
  }

  init = () => {
    this.router.post(
      "/signup",
      this.multerUpload.none(),
      this.csrfProtection,
      this.authController.signup
    );
    this.router.post(
      "/login",
      this.multerUpload.none(),
      this.csrfProtection,
      this.authController.login
    );

    this.router.post(
      "/logout",
      this.multerUpload.none(),
      this.csrfProtection,
      this.authController.logout
    );

    this.router.post("/forgot-password", this.authController.forgotPassword);
    this.router.patch(
      "/reset-password/:token",
      this.authController.resetPassword
    );

    this.router.use(this.authController.protect);

    this.router.patch("/update-password", this.authController.updatePassword);

    this.router.get(
      "/me",
      this.userController.getMe,
      this.userController.getUserById
    );
    this.router.patch("/update-me", this.userController.updateMe);
    this.router.delete("/delete-me", this.userController.deleteMe);

    this.router.use(this.authController.restrictTo("admin"));

    this.router
      .route("/")
      .get(this.userController.getAll)
      .post(this.userController.createUser);

    this.router
      .route("/:id")
      .get(this.userController.getUserById)
      .patch(this.userController.updateOne)
      .delete(this.userController.deleteOne);
  };

  getRouter = () => {
    return this.router;
  };
}

export default UserRouter;
