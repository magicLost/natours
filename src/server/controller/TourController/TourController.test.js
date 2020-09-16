import TourController from "./TourController";
import TourModel from "../../entity/TourModel/TourModel";
//import APIFeatures from "../../service/APIFeatures/APIFeatures";

describe("TourController", () => {
  let controller = null;
  const features = {
    run: jest.fn()
  };
  const getAppError = jest.fn().mockImplementation((message, status) => {
    return Error(message);
  });

  beforeEach(() => {
    controller = new TourController(TourModel);
  });

  afterEach(() => {
    getAppError.mockClear();
  });

  describe("getTourById", () => {
    test("It must create instance", () => {
      controller = new TourController({}, TourModel, getAppError);

      const result = controller.getTourById();

      expect(result).toEqual("Hello");
    });
  });
});
