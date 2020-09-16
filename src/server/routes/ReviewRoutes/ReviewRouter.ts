import express, { Router } from "express";
import AuthController from "../../controller/AuthController/AuthController";
import { IRouter } from "../UserRouter/UserRouter";
import ReviewController from "../../controller/ReviewController/ReviewController";

class ReviewRouter implements IRouter {
  authController: AuthController;
  reviewController: ReviewController;
  router: Router;

  constructor(
    authController: AuthController,
    reviewController: ReviewController
  ) {
    this.authController = authController;
    this.reviewController = reviewController;

    this.router = express.Router({
      mergeParams: true
    });

    this.init();
  }

  init = () => {
    this.router.use(this.authController.protect);

    this.router
      .route("/")
      .get(this.reviewController.getAll)
      .post(
        this.authController.restrictTo("user"),
        this.reviewController.setTourUserIds,
        this.reviewController.createOne
      );

    this.router
      .route("/:id")
      .get(this.reviewController.getReviewById)
      .patch(
        this.authController.restrictTo("user", "admin"),
        this.reviewController.updateOne
      )
      .delete(
        this.authController.restrictTo("user", "admin"),
        this.reviewController.deleteOne
      );
  };

  getRouter = () => {
    return this.router;
  };
}

export default ReviewRouter;
