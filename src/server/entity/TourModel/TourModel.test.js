//import mongoose, {Mongoose} from 'mongoose';
import TourModel from "./TourModel";
import FillDb from "../../utils/FillMongoDb/FillDb";

describe("TourModel", () => {
  //let mongooseCon = undefined;
  let fillDb = undefined;

  beforeAll(async () => {
    fillDb = new FillDb("natours"); //test_db

    console = { log: jest.fn() };

    process.exit = jest.fn();

    await fillDb.connect();

    await fillDb.mongoose.connection.dropDatabase();

    await fillDb.importData();
  });

  afterAll(async () => {
    await fillDb.mongoose.connection.dropDatabase();
    await fillDb.disconnect();
  });

  test("Connection", () => {
    expect(fillDb.mongoose.version).toEqual("5.9.7");
  });

  test("Connection", () => {
    expect(fillDb.mongoose.version).toEqual("5.9.5");
  });

  describe("Test pre/post find middleware", () => {
    test("When find tour it must in guides section instead of id fill with guides info", async () => {
      const tour = await TourModel.findById("5c88fa8cf4afda39709c2955");

      const tour1 = await TourModel.findById("5c88fa8cf4afda39709c2951");

      expect(tour).toBeInstanceOf(TourModel);
      expect(tour.name).toEqual("The Sea Explorer");
      expect(tour.durationWeeks).toEqual(1);
      expect(tour.guides[0].name).toEqual("Miyah Myles");
      expect(tour.guides[1].role).toEqual("guide");

      expect(tour1.durationWeeks).toEqual(1);
    });
  });

  test("If no connection", async () => {
    await fillDb.disconnect();

    try {
      const tour = await TourModel.findById("5c88fa8cf4afda39709c2955");
    } catch (error) {
      expect(error.message).toEqual("Heloo");
    }
  });
});
