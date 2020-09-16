import { DocumentQuery, Document, Model } from "mongoose";

export interface BrowserQueryString {
  sort?: string;
  fields?: string;
  page?: string;
  limit?: string;
  filter?: string;
}

export interface IAPIFeatures<T extends Document> {
  Model: Model<T>;
  sendQueryToMongo: () => Promise<T[]>;
  preStart: (browserQueryString: BrowserQueryString) => IAPIFeatures<T>;
  run: (browserQueryString: BrowserQueryString) => IAPIFeatures<T>;
  filter: () => IAPIFeatures<T>;
  sort: () => IAPIFeatures<T>;
  limitFields: () => IAPIFeatures<T>;
  paginate: () => IAPIFeatures<T>;
}

class APIFeatures<T extends Document> implements IAPIFeatures<T> {
  /* mongooseQuery: DocumentQuery<any, any>;
  browserQueryString: BrowserQueryString;

  constructor(
    mongooseQuery: DocumentQuery<any, any>,
    browserQueryString: BrowserQueryString
  ) {
    this.mongooseQuery = mongooseQuery;
    this.browserQueryString = browserQueryString;
  } */
  Model: Model<T>;
  //initMongooseQuery: DocumentQuery<any, any>;
  mongooseQuery: DocumentQuery<any, any>;
  browserQueryString: BrowserQueryString;

  constructor(Model: Model<T>) {
    this.Model = Model;
    this.mongooseQuery = Model.find();
    //this.initMongooseQuery = mongooseQuery;
    this.browserQueryString = {};
  }

  sendQueryToMongo = async () => {
    //this.mongooseQuery = this.initMongooseQuery;

    return await this.mongooseQuery;
  };

  preStart = (browserQueryString: BrowserQueryString) => {
    this.mongooseQuery = this.Model.find();
    this.browserQueryString = browserQueryString;
    return this;
  };

  run = (browserQueryString: BrowserQueryString) => {
    this.preStart(browserQueryString)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    return this;
  };

  filter = () => {
    //this.mongooseQuery = this.initMongooseQuery;

    const queryOjb = { ...this.browserQueryString };

    const excludeFields = ["page", "sort", "limit", "fields"];

    excludeFields.forEach((el: string) => delete (queryOjb as any)[el]);

    //console.log(queryOjb);

    let queryStr = JSON.stringify(queryOjb);

    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));

    return this;
  };

  sort = () => {
    if (this.browserQueryString.sort) {
      const sortBy = this.browserQueryString.sort.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.sort(sortBy);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort("-createdAt");
    }

    return this;
  };

  limitFields = () => {
    if (this.browserQueryString.fields) {
      const fields = this.browserQueryString.fields.split(",").join(" "); //BUG
      this.mongooseQuery = this.mongooseQuery.select(fields);
    } else {
      this.mongooseQuery = this.mongooseQuery.select("-__v");
    }

    return this;
  };

  paginate = () => {
    const page =
      this.browserQueryString.page !== undefined
        ? parseInt(this.browserQueryString.page)
        : 1;

    const limit =
      this.browserQueryString.limit !== undefined
        ? parseInt(this.browserQueryString.limit)
        : 100;

    const skip = (page - 1) * limit;

    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);

    /* if (this.browserQueryString.page) {
          const numTours = await Tour.countDocuments();
          if (skip >= numTours) throw new Error("This page does not exist");
        } */

    return this;
  };
}

export default APIFeatures;
