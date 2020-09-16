import FileSystemHelper from "../../../../Natours_Backend/src/server/utils/FileSystem/FileSystemHelper";
import TourModel from "../../../../Natours_Backend/src/server/entity/TourModel/TourModel";
import ReviewModel from "../../../../Natours_Backend/src/server/entity/ReviewModel/ReviewModel";
import UserModel from "../../../../Natours_Backend/src/server/entity/UserModel/UserModel";
import mongoose from "mongoose";

//https://www.natours.dev
//dotenv.config({ path: "./config.env" });

/* const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
); */

class FillDb {
  fs: FileSystemHelper;
  dbName: string;
  mongoose: mongoose.Mongoose | undefined = undefined;

  constructor(dbName: string) {
    this.fs = new FileSystemHelper();
    this.dbName = dbName;
  }

  connect = async () => {
    try {
      this.mongoose = await mongoose.connect("mongodb://localhost:27017", {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        dbName: this.dbName,
      });
    } catch (error) {
      console.log(`MONGOOSE CONNECTION ERROR ${error.message}`);
    }
  };

  disconnect = async () => {
    if (this.mongoose !== undefined) await this.mongoose.disconnect();
  };

  importData = async () => {
    try {
      const { tours, users, reviews } = await this.getData();

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

  deleteData = async () => {
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

  getData = async () => {
    const toursPromise = this.fs.readFile(`${__dirname}/data/tours.json`, true);
    const usersPromise = this.fs.readFile(`${__dirname}/data/users.json`, true);
    const reviewsPromise = this.fs.readFile(
      `${__dirname}/data/reviews.json`,
      true
    );

    const [toursJson, usersJson, reviewsJson] = await Promise.all([
      toursPromise,
      usersPromise,
      reviewsPromise,
    ]);

    const tours: any[] = JSON.parse(toursJson);
    const users: any[] = JSON.parse(usersJson);
    const reviews: any[] = JSON.parse(reviewsJson);

    return {
      tours,
      users,
      reviews,
    };
  };
}

export default FillDb;

/* if (process.argv[2] === "--import") {

  importData();

} else if (process.argv[2] === "--delete") {

  deleteData();
  
} */
