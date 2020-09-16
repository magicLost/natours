import * as faker from "faker";
//import { hash } from "bcryptjs";
import { getId } from "./../index";

const getPassword = () => {
  //return await hash("test1234", 12);
  return "test1234";
};

const role = (index: number) => {
  if (index === 0) return "admin";
  else if (index <= 5) return "lead-guide";
  else if (index <= 20) return "guide";
  else return "user";
};

const active = () => {
  const i = faker.random.number({ min: 1, max: 10 });
  return i < 9;
};

const getUser = (index: number, id: string) => {
  //first user - admin
  //next 5 - lead-guides
  //next 10 - guides
  //all others - users

  const password = getPassword();
  const firstName = faker.name.firstName();

  return {
    _id: id,
    name: `${firstName} ${faker.name.lastName()}`,
    email: `${firstName.toLowerCase()}_${faker.random.number({
      min: 1,
      max: 2000,
    })}@example.com`,
    role: role(index),
    active: active(),
    photo: faker.image.avatar(),
    password,
  };
};

export const createUsers = (numberOfUsers: number) => {
  const guidesIds = [];

  const usersIds = [];

  const users = [];

  for (let i = 0; i < numberOfUsers; i++) {
    const id = getId();
    if (i > 0 && i <= 20) {
      guidesIds.push(id);
    } else {
      if (i !== 0) usersIds.push(id);
    }

    users.push(getUser(i, id));
  }

  return { users, usersIds, guidesIds };
};
