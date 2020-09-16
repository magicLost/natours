import ErrorManager, { AppError } from "./ErrorManager";

/* NODE_ENV=production npm run test ErrorManager.test.js */
let errorManager = null;

describe("ErrorManager", () => {
  const response = {
    status: jest.fn(() => {
      return response;
    }),
    json: jest.fn(() => {
      return response;
    }),
  };

  const request = {
    method: "GET",
    path: "/api/v1/users",
  };
  const next = jest.fn();

  beforeEach(() => {
    errorManager = new ErrorManager();
  });

  afterEach(() => {
    response.status.mockClear();
    response.json.mockClear();
  });

  describe("globalErrorHandler", () => {
    describe("test/development", () => {
      test("It must call sendErrorDev", () => {
        errorManager.sendErrorDev = jest.fn();
        errorManager.globalErrorHandler(
          new Error("Hello error"),
          request,
          response,
          next
        );

        expect(errorManager.sendErrorDev).toHaveBeenCalledTimes(1);
      });

      describe("If our request from site", () => {});

      describe("If our request from api or ajax", () => {
        test("If we pass Error it must return 500 status", () => {
          errorManager.globalErrorHandler(
            new Error("Hello error"),
            request,
            response,
            next
          );

          //expect(process.env.NODE_ENV).toEqual("test");

          expect(response.status).toHaveBeenNthCalledWith(1, 500);

          expect(response.json).toHaveBeenCalledTimes(1);
          expect(response.json).toHaveBeenCalledWith({
            status: "ERROR",
            error: {
              message: "Hello error",
              stack: `Error: Hello error
    at Object.<anonymous> (/home/nikki/Documents/Natours/Natours_Backend/src/server/service/ErrorManager/ErrorManager.test.js:50:13)
    at Object.asyncJestTest (/home/nikki/Documents/Natours/Natours_Backend/node_modules/jest-jasmine2/build/jasmineAsyncInstall.js:100:37)
    at /home/nikki/Documents/Natours/Natours_Backend/node_modules/jest-jasmine2/build/queueRunner.js:45:12
    at new Promise (<anonymous>)
    at mapper (/home/nikki/Documents/Natours/Natours_Backend/node_modules/jest-jasmine2/build/queueRunner.js:28:19)
    at /home/nikki/Documents/Natours/Natours_Backend/node_modules/jest-jasmine2/build/queueRunner.js:75:41`,
              name: "Error",
            },
          });
        });

        test("If we pass AppError it must return data from that error", () => {
          errorManager.globalErrorHandler(
            new AppError("Hello error", 405),
            request,
            response,
            next
          );

          //expect(process.env.NODE_ENV).toEqual("test");

          expect(response.status).toHaveBeenNthCalledWith(1, 200);

          expect(response.json).toHaveBeenCalledTimes(1);
          expect(response.json).toHaveBeenCalledWith({
            status: "FAIL",
            error: {
              message: "Hello error",
              stack: `Error: Hello error
    at Object.<anonymous> (/home/nikki/Documents/Natours/Natours_Backend/src/server/service/ErrorManager/ErrorManager.test.js:79:13)
    at Object.asyncJestTest (/home/nikki/Documents/Natours/Natours_Backend/node_modules/jest-jasmine2/build/jasmineAsyncInstall.js:100:37)
    at /home/nikki/Documents/Natours/Natours_Backend/node_modules/jest-jasmine2/build/queueRunner.js:45:12
    at new Promise (<anonymous>)
    at mapper (/home/nikki/Documents/Natours/Natours_Backend/node_modules/jest-jasmine2/build/queueRunner.js:28:19)
    at /home/nikki/Documents/Natours/Natours_Backend/node_modules/jest-jasmine2/build/queueRunner.js:75:41`,
              name: "Error",
            },
          });
        });
      });
    });

    describe("production", () => {
      beforeAll(() => {
        process.env["NODE_ENV"] = "production";
      });
      test("It must call sendErrorProd", () => {
        expect(process.env["NODE_ENV"]).toEqual("production");
        errorManager.sendErrorProd = jest.fn();
        errorManager.globalErrorHandler(
          new Error("Hello error"),
          request,
          response,
          next
        );

        expect(errorManager.sendErrorProd).toHaveBeenCalledTimes(1);
      });
      describe("If our request from site", () => {});

      describe("If our request from api or ajax", () => {
        test("If we pass Error it must return 500 status", () => {
          errorManager.globalErrorHandler(
            new Error("Hello error"),
            request,
            response,
            next
          );

          //expect(process.env.NODE_ENV).toEqual("test");

          expect(response.status).toHaveBeenNthCalledWith(1, 500);

          expect(response.json).toHaveBeenCalledTimes(1);
          expect(response.json).toHaveBeenCalledWith({
            status: "ERROR",
            error: {
              message: "Server error.",
            },
          });
        });

        test("If we pass AppError it must return data from that error", () => {
          errorManager.globalErrorHandler(
            new AppError("Hello app error", 401),
            request,
            response,
            next
          );

          //expect(process.env.NODE_ENV).toEqual("test");

          expect(response.status).toHaveBeenNthCalledWith(1, 200);

          expect(response.json).toHaveBeenCalledTimes(1);
          expect(response.json).toHaveBeenCalledWith({
            status: "FAIL",
            error: {
              message: "Hello app error",
            },
          });
        });

        test("If we pass CastError ", () => {
          const err = new Error("Hello CastError");
          err.name = "CastError";
          err.path = "some path";
          err.value = "some value";
          errorManager.globalErrorHandler(err, request, response, next);

          //expect(process.env.NODE_ENV).toEqual("test");

          expect(response.status).toHaveBeenNthCalledWith(1, 200);

          expect(response.json).toHaveBeenCalledTimes(1);
          expect(response.json).toHaveBeenCalledWith({
            status: "FAIL",
            error: {
              message: "Invalid some path: some value",
            },
          });
        });
      });
    });
  });
});
