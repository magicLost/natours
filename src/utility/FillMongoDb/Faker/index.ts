import { createTours } from "./dataGenerators/tour";
import { createUsers } from "./dataGenerators/user";
import { getReviews } from "./dataGenerators/review";
import { writeFile } from "fs";
import { promisify } from "util";
import { join } from "path";
import { fillDb } from "./mongo";
import { ObjectId } from "mongodb";

//import * as faker from "faker";

export const getId = () => {
  return new ObjectId().toHexString();
};

//first we create users and get guidesIds and userIds
//second we create tours with guidesIds and get toursIds
//third we create reviews with usersIds and toursIds

export const create = async () => {
  //return { tours, users, reviews };
  /* promisify(writeFile)(
    join(__dirname, "data", "users.js"),
    JSON.stringify(users)
  );

  promisify(writeFile)(
    join(__dirname, "data", "usersId.js"),
    JSON.stringify(usersIds)
  );

  promisify(writeFile)(
    join(__dirname, "data", "guidesId.js"),
    JSON.stringify(guidesIds)
  );

  promisify(writeFile)(
    join(__dirname, "data", "tours.js"),
    JSON.stringify(tours)
  );

  promisify(writeFile)(
    join(__dirname, "data", "toursIds.js"),
    JSON.stringify(toursIds)
  );

  promisify(writeFile)(
    join(__dirname, "data", "reviews.js"),
    JSON.stringify(reviews)
  ); */
};

const run = async () => {
  try {
    const { users, usersIds, guidesIds } = createUsers(50);
    const { tours, toursIds } = createTours(10, guidesIds);
    const reviews = getReviews(toursIds, usersIds);

    /* console.log(
      `${users.length} | 
      ${usersIds.length} |
      ${guidesIds.length} |
      ${tours.length} |
      ${toursIds.length} |
      ${reviews.length}`
    );
    console.log(); */

    promisify(writeFile)(
      join(__dirname, "data", "users.js"),
      JSON.stringify(users)
    );

    promisify(writeFile)(
      join(__dirname, "data", "usersId.js"),
      JSON.stringify(usersIds)
    );

    promisify(writeFile)(
      join(__dirname, "data", "guidesId.js"),
      JSON.stringify(guidesIds)
    );

    promisify(writeFile)(
      join(__dirname, "data", "tours.js"),
      JSON.stringify(tours)
    );

    promisify(writeFile)(
      join(__dirname, "data", "toursIds.js"),
      JSON.stringify(toursIds)
    );

    /* promisify(writeFile)(
      join(__dirname, "data", "reviews.js"),
      JSON.stringify(reviews)
    ); */

    await fillDb("natours", tours, users, reviews);
  } catch (err) {
    console.log("[ERROR] ", err.message);
  }
};

run();
