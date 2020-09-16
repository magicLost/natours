import mongoose, {Mongoose} from 'mongoose';
import ReviewModel from './UserModel';


describe("ReviewModel", () => {

    let mongooseCon = undefined;

    beforeAll( async () => {

        mongooseCon = await mongoose
            .connect("mongodb://localhost:27017", {
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
                useUnifiedTopology: true,
                dbName: "test_db"
        });

        await ReviewModel.collection.drop();
    })

    afterAll(async () => {
        await ReviewModel.collection.drop();
        await mongoose.disconnect();
    })

    

});