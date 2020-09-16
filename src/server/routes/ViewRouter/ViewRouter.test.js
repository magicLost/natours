import request from "supertest";
import express, { static as staticMiddleware } from "express";
import ViewRouter from "./ViewRouter";
//import ViewController from "../../controller/ViewController/ViewController";
import { setMetaData } from "../../utils/setMetaData/setMetaData";
import csrf from "csurf";

jest.mock("../../utils/setMetaData/setMetaData", () => {
  return {
    __esModule: true,
    setMetaData: jest.fn().mockImplementation((req, res, next) => {
      req.metaData = "meta-data";
      next();
    }),
  };
});

/* jest
  .mock("../../controller/ViewController/ViewController")
  .mockImplementation(() => {
    return {
      allTours: (req, res, next) => {
        res.send("Hellometa");
      },
    };
  }); */

jest.mock("csurf", () => {
  return {
    __esModule: true,
    default: (options) => {
      return jest.fn().mockImplementation((req, res, next) => {
        req.metaData = "meta-data";
        next();
      });
    },
  };
});

describe("ViewRouter", () => {
  let viewRouter = null;
  const csrfProtection = csrf({ cookie: true });
  const authController = {
    isLoggedIn: jest.fn().mockImplementation((req, res, next) => {
      next();
    }),
  };
  /* const csrfProtection = jest.fn().mockImplementation((req, res, next) => {
    next();
  }); */
  /* const setMetaData = jest.fn().mockImplementation((req, res, next) => {
    req.metaData = "meta-data";
    next();
  }); */
  //const TourModel = {};

  const viewController = {
    allTours: jest.fn().mockImplementation((req, res, next) => {
      res.send("Hellometa");
    }),
  };

  beforeEach(() => {
    viewRouter = new ViewRouter(
      /* new ViewController(
        TourModel,
        (message, status) => {
          return new Error(message + status);
        },
        "Hello!!!META_DATA!!!"
      ), */
      viewController,
      csrfProtection,
      setMetaData,
      authController
    );
  });

  test("", async () => {
    const app = express();

    app.use("/", viewRouter.getRouter());
    const response = await request(app).get("/");

    expect(authController.isLoggedIn).toHaveBeenCalledTimes(1);
    expect(csrfProtection).toHaveBeenCalledTimes(1);
    expect(setMetaData).toHaveBeenCalledTimes(1);

    expect(viewController.allTours).toHaveBeenCalledTimes(1);

    expect(response.statusCode).toEqual(200);
    expect(response.text).toEqual("Hellometa");

    expect(2).toEqual(2);
  });
});
