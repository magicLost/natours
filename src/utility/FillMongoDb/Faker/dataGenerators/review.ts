import * as faker from "faker";
import { getId } from "..";

const getReview = (userId: string, tourId: string) => {
  return {
    _id: getId(),
    review: faker.lorem.paragraph(),
    rating: faker.random.number({ min: 1, max: 5 }),
    user: userId,
    tour: tourId,
  };
};

const setUniqueNumber = (
  numbers: number[],
  maxNumbers: number,
  count: number = 0
) => {
  const n = faker.random.number({ min: 1, max: maxNumbers });
  count++;
  //console.log(count);
  if (numbers.includes(n)) {
    setUniqueNumber(numbers, maxNumbers, count);
  }
  if (numbers.includes(n)) return;
  numbers.push(n);
};

export const fillArrayWithUniqueNumbers = (
  numbers: number[],
  maxNumbers: number,
  length: number
) => {
  if (length >= maxNumbers)
    throw new Error("max numbers must be more than length");

  for (let i = 0; i < length; i++) {
    setUniqueNumber(numbers, maxNumbers);
  }
};

export const getReviews = (toursIds: string[], usersIds: string[]) => {
  const reviews: any[] = [];
  let uniqueNumbersOfUsers: number[] = [];
  const usersIdsLength = usersIds.length;

  toursIds.forEach((tourId) => {
    const numberOfReviewsForThisTour = faker.random.number(8);
    fillArrayWithUniqueNumbers(
      uniqueNumbersOfUsers,
      usersIdsLength,
      numberOfReviewsForThisTour
    );

    uniqueNumbersOfUsers.forEach((i) => {
      reviews.push(getReview(usersIds[i], tourId));
    });
    uniqueNumbersOfUsers = [];
  });

  return reviews;
};
