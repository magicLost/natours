import BaseMongooseController from "./BaseMongooseController";

describe("BaseMongooseController", () => {
  let controller = null;
  const features = {
    run: jest.fn().mockImplementation(() => features),
    sendQueryToMongo: jest
      .fn()
      .mockImplementation(() => new Promise(resolve => resolve("Hello")))
  };
  const getAppError = jest.fn().mockImplementation((message, status) => {
    return Error(message);
  });

  beforeEach(() => {
    controller = new BaseMongooseController(features, {}, getAppError);
  });

  afterEach(() => {
    getAppError.mockClear();
  });

  describe("getAll", () => {
    test("", () => {});
  });
});
