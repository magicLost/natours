import express, { Router } from "express";
import AuthController from "../../controller/AuthController/AuthController";
import { IRouter } from "../UserRouter/UserRouter";
import TourController from "../../controller/TourController/TourController";
import ReviewRouter from "../ReviewRoutes/ReviewRouter";

class TourRouter implements IRouter {
  authController: AuthController;
  tourController: TourController;
  reviewRouter: ReviewRouter;
  router: Router;

  constructor(
    authController: AuthController,
    tourController: TourController,
    reviewRouter: ReviewRouter
  ) {
    this.authController = authController;
    this.tourController = tourController;

    this.reviewRouter = reviewRouter;

    this.router = express.Router();

    this.init();
  }

  init = () => {
    this.router.use("/:tourId/reviews", this.reviewRouter.getRouter());

    this.router
      .route("/top-5-cheap")
      .get(this.tourController.aliasTopTours, this.tourController.getAll);

    this.router.route("/tour-stats").get(this.tourController.getTourStats);

    this.router
      .route("/monthly-plan/:year")
      .get(
        this.authController.protect,
        this.authController.restrictTo("admin", "lead-guide", "guide"),
        this.tourController.getMonthlyPlan
      );

    // /tours-within/233/center/-40,45/unit/mi
    this.router
      .route("/tours-within/:distance/center/:latlng/unit/:unit")
      .get(this.tourController.getToursWithin);

    this.router
      .route("/distances/:latlng/unit/:unit")
      .get(this.tourController.getDistances);

    this.router.route("/slug/:slug").get(this.tourController.getTourBySlug);

    this.router
      .route("/")
      .get(this.tourController.getAllTours)
      .post(
        this.authController.protect,
        this.authController.restrictTo("admin", "lead-guide"),
        this.tourController.createOne
      );

    this.router
      .route("/:id")
      .get(this.tourController.getTourById)
      .patch(
        this.authController.protect,
        this.authController.restrictTo("admin", "lead-guide"),
        this.tourController.updateOne
      )
      .delete(
        this.authController.protect,
        this.authController.restrictTo("admin", "lead-guide"),
        this.tourController.deleteOne
      );
  };

  getRouter = () => {
    return this.router;
  };
}

export default TourRouter;
