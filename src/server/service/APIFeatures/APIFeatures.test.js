//import mongoose, {Mongoose} from 'mongoose';
import APIFeatures from "./APIFeatures";
import TourModel from "./../../entity/TourModel/TourModel";
import FillDb from "../../utils/FillMongoDb/FillDb";

describe("TourModel", () => {
  //let mongooseCon = undefined;
  let fillDb = undefined;
  let features = undefined;

  beforeAll(async () => {
    fillDb = new FillDb("test_db");

    process.exit = jest.fn();
    console = { log: jest.fn() };

    features = new APIFeatures(TourModel);

    await fillDb.connect();

    await fillDb.mongoose.connection.dropDatabase();

    await fillDb.importData();

    /* mongooseCon = await mongoose
            .connect("mongodb://localhost:27017", {
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
                useUnifiedTopology: true,
                dbName: "test_db"
        });

        await TourModel.collection.drop(); */
  });

  /* beforeEach(() => {
      features = new APIFeatures(Model.find(), req.query);
  }) */

  afterAll(async () => {
    await fillDb.mongoose.connection.dropDatabase();
    await fillDb.disconnect();

    /* await TourModel.collection.drop();
        await mongoose.disconnect(); */
  });

  test("Connection", () => {
    expect(fillDb.mongoose.version).toEqual("5.9.5");
  });

  test("mongoose query must return all data from collection", async () => {
    features = new APIFeatures(TourModel);
    const tours = await features.run({}).sendQueryToMongo();

    expect(tours).toHaveLength(9);
  });

  //http:localhost/tours?duration[gte]=5&difficulty=medium
  describe("Filter", () => {
    test("We past browser query /tours?duration=7&difficulty=medium - it must return one tour", async () => {
      features
        .preStart({
          duration: "7",
          difficulty: "medium"
        })
        .filter();

      //const tours = await features.sendQueryToMongo();
      const tours = await features
        .preStart({
          duration: "7",
          difficulty: "medium"
        })
        .filter()
        .sendQueryToMongo();

      expect(tours).toHaveLength(1);
    });

    test("We past browser query /tours?duration[gte]=6&difficulty=easy - it must return seven tours", async () => {
      /* features = new APIFeatures(TourModel.find());

      features.filter({
        duration: { gte: "6" }
        //difficulty: "easy"
      }); */

      const tours = await features
        .preStart({
          duration: { gte: "6" },
          difficulty: "easy"
        })
        .filter()
        .sendQueryToMongo();

      expect(tours).toHaveLength(1);
    });
  });

  describe("Sort", () => {
    test("We past browser query /tours?duration[gte]=5&sort=price - it must return seven tours sorted by price", async () => {
      /* features
        .start({
          duration: { gte: "5" },
          sort: "price"
        })
        .filter()
        .sort(); */

      const tours = await features
        .preStart({
          duration: { gte: "6" },
          sort: "price"
        })
        .filter()
        .sort()
        .sendQueryToMongo();

      expect(tours).toHaveLength(5);
      expect(tours[0].price).toEqual(497);
    });
    test("We past browser query /tours?duration[gte]=5&sort=-price - it must return seven tours sorted by price", async () => {
      const tours = await features
        .preStart({
          duration: { gte: "5" },
          sort: "-price"
        })
        .filter()
        .sort()
        .sendQueryToMongo();

      expect(tours).toHaveLength(7);
      expect(tours[0].price).toEqual(2997);
      expect(tours[0].ratingsAverage).toEqual(3.9);
      expect(tours[1].price).toEqual(2997);
      expect(tours[1].ratingsAverage).toEqual(4.8);
    });
    test("We past browser query /tours?duration[gte]=5&sort=-price,-ratingsAverage - it must return seven tours sorted by price and ratingsAverage(if price is equals)", async () => {
      const tours = await features
        .preStart({
          duration: { gte: "5" },
          sort: "-price,-ratingsAverage"
        })
        .filter()
        .sort()
        .sendQueryToMongo();

      expect(tours).toHaveLength(7);
      expect(tours[0].price).toEqual(2997);
      expect(tours[0].ratingsAverage).toEqual(4.8);
      expect(tours[1].price).toEqual(2997);
      expect(tours[1].ratingsAverage).toEqual(3.9);
    });
  });

  describe("limitFields", () => {
    test("We past browser query /tours?difficulty=easy&fields=name,price - it must return array of tours with only specified fields", async () => {
      const tours = await features
        .preStart({ fields: "name,price", difficulty: "easy" })
        .filter()
        .limitFields()
        .sendQueryToMongo();

      expect(tours).toHaveLength(4);
      expect(tours[0].name).toEqual("The Forest Hiker");
      expect(tours[0].price).toEqual(397);
      expect(tours[0].maxGroupSize).toEqual(undefined);
    });

    test("We past browser query /tours?difficulty=easy&fields=-name,-price - it must return array of tours without specified fields", async () => {
      const tours = await features
        .preStart({
          fields: "-name,-price",
          difficulty: "easy"
        })
        .filter()
        .limitFields()
        .sendQueryToMongo();

      expect(tours).toHaveLength(4);
      expect(tours[0].name).toEqual(undefined);
      expect(tours[0].price).toEqual(undefined);
      expect(tours[0].maxGroupSize).toEqual(25);
    });
  });

  describe("paginate", () => {
    test("We past browser query /tours?page=1&limit=4 - it must return four first tours", async () => {
      const tours = await features
        .preStart({
          page: "1",
          limit: "4"
        })
        .filter()
        .sort()
        .limitFields()
        .paginate()
        .sendQueryToMongo();

      expect(tours).toHaveLength(4);
      expect(tours[0].name).toEqual("The Sea Explorer");
    });

    test("We past browser query /tours?page=2&limit=4 - it must return next four tours", async () => {
      const tours = await features
        .run({
          page: "2",
          limit: "4"
        })
        /* .filter()
        .sort()
        .limitFields()
        .paginate() */
        .sendQueryToMongo();

      expect(tours).toHaveLength(4);
      expect(tours[0].name).toEqual("The City Wanderer");
    });
  });
});
