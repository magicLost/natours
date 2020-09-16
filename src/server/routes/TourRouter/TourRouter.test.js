import request from "supertest";
import TourRouter from "./TourRouter";
import ReviewRouter from "../ReviewRoutes/ReviewRouter";
import AuthController from "../../controller/AuthController/AuthController";
import UserModel from "../../entity/UserModel/UserModel";
import ReviewModel from "../../entity/ReviewModel/ReviewModel";
import ReviewController from "../../controller/ReviewController/ReviewController";

//jest.mock("../../controller/AuthController/AuthController");
//jest.mock("../ReviewRoutes/ReviewRouter");

describe("TourRouter", () => {
  test("It should response the GET method on /", async () => {
    const tourController = {
      aliasTopTours: jest.fn().mockImplementation((req, res, next) => {
        next();
      }),
      getAllTours: jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => resolve(["one", "two"]));
      }),
      createTour: jest.fn(),
      deleteTour: jest.fn(),
      updateTour: jest.fn(),
      getMonthlyPlan: jest.fn(),
      getToursWithin: jest.fn(),
      getDistances: jest.fn(),
      getTourStats: jest.fn(),
      getTourById: jest.fn()
    };

    const authController = new AuthController(
      UserModel,
      "secret",
      "hello",
      "bye"
    );

    const tourRouter = new TourRouter(
      authController,
      //new TourController(TourModel),
      tourController,
      new ReviewRouter(authController, new ReviewController(ReviewModel))
    );

    const response = await request(tourRouter).get("/");

    expect(response.statusCode).toEqual(200);

    //expect(response.text).toEqual("true");
  });
});
