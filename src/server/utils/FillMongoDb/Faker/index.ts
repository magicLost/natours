import { createTours } from "./dataGenerators/tour";
import { createUsers } from "./dataGenerators/user";
import {
  getReviews,
  fillArrayWithUniqueNumbers,
} from "./dataGenerators/review";
import { writeFile } from "fs";
import { promisify } from "util";
import { join } from "path";
//import * as faker from "faker";

//first we create users and get guidesIds and userIds
//second we create tours with guidesIds and get toursIds
//third we create reviews with usersIds and toursIds

/* const arr: number[] = [];

fillArrayWithUniqueNumbers(arr, 25, 8); */

const create = async () => {
  const { users, usersIds, guidesIds } = await createUsers(50);
  const { tours, toursIds } = createTours(20, guidesIds);
  const reviews = getReviews(toursIds, usersIds);

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

  promisify(writeFile)(
    join(__dirname, "data", "reviews.js"),
    JSON.stringify(reviews)
  );
};

create();
