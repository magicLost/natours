import FillDb from "./FillDb";
import TourModel from "../../../../Natours_Backend/src/server/entity/TourModel/TourModel";
import UserModel from "../../../../Natours_Backend/src/server/entity/UserModel/UserModel";
import ReviewModel from "../../../../Natours_Backend/src/server/entity/ReviewModel/ReviewModel";

describe("FillDb", () => {
  let fillDb = undefined;

  beforeAll(async () => {
    fillDb = new FillDb("test_db");

    process.exit = jest.fn();

    await fillDb.connect();
  });

  afterAll(async () => {
    await fillDb.mongoose.connection.dropDatabase();
    await fillDb.disconnect();
  });

  describe("getData", () => {
    test("Must return object with arrays of tours, users, reviews", async () => {
      const { tours, users, reviews } = await fillDb.getData();

      expect(tours[0]["_id"]).toEqual("5c88fa8cf4afda39709c2955");
      expect(users[2]["_id"]).toEqual("5c8a1e1a2f8fb814b56fa182");
      expect(reviews[1]["_id"]).toEqual("5c8a355b14eb5c17645c9109");
    });
  });

  test("Connection", () => {
    expect(fillDb.mongoose.version).toEqual("5.9.5");
  });

  test("ImportData - it must fill db with data from files", async () => {
    await fillDb.importData();

    const users = await UserModel.find({ role: "lead-guide" });
    const tours = await TourModel.find({
      ratingsAverage: {
        $gte: 4.6,
      },
    });

    const reviews = await ReviewModel.find({
      rating: {
        $eq: 2,
      },
    });

    expect(users).toHaveLength(3);
    expect(tours).toHaveLength(6);
    expect(reviews).toHaveLength(1);
  });
});
