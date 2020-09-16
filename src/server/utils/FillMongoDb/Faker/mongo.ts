import mongoose from "mongoose";
import TourModel from "../../../entity/TourModel/TourModel";
import UserModel from "../../../entity/UserModel/UserModel";
import ReviewModel from "../../../entity/ReviewModel/ReviewModel";

let mongooseConnection: mongoose.Mongoose | undefined = undefined;

export const fillDb = async (
  dbName: string,
  tours: any[],
  users: any[],
  reviews: any[]
) => {
  await connect(dbName);
  await deleteData();
  await importData(tours, users, reviews);
  await disconnect();
};

const connect = async (dbName: string) => {
  try {
    mongooseConnection = await mongoose.connect("mongodb://localhost:27017", {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      dbName: dbName,
    });
  } catch (error) {
    console.log(`MONGOOSE CONNECTION ERROR ${error.message}`);
  }
};

const disconnect = async () => {
  if (mongooseConnection !== undefined) await mongooseConnection.disconnect();
};

const importData = async (tours: any[], users: any[], reviews: any[]) => {
  try {
    await Promise.all([
      TourModel.create(tours),
      UserModel.create(users, { validateBeforeSave: false }),
      ReviewModel.create(reviews),
    ]);

    console.log("Data successfully loaded");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Promise.all([
      TourModel.deleteMany({}),
      UserModel.deleteMany({}),
      ReviewModel.deleteMany({}),
    ]);
    /*    await Tour.deleteMany();
      await User.deleteMany();
      await Review.deleteMany(); */

    console.log("Data successfully deleted");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
