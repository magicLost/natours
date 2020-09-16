import mongoose from "mongoose";
import TourModel from "./TourModel";
//import FillDb from "../../utils/FillMongoDb/FillDb";

describe("Mongoose", () => {
  test("If no connection", async () => {
    /*
        0: disconnected
        1: connected
        2: connecting
        3: disconnecting
     */
    expect(mongoose.connection.readyState).toEqual(0);
  });

  test("", async () => {
    console.log(process.env.DB_NAME);
    await mongoose.connect("mongodb://localhost:27017", {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      dbName: "test_db"
    });

    const tour = await TourModel.findById("5c88fa8cf4afda39709c2955");
    expect(tour).toEqual(null);

    //await mongoose.disconnect();

    //done();
  });
});
