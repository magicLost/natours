const getToken = () => {
  console.log("getToken");
  return "token";
};

export const token = getToken();
let count = 0;

export const func = () => {
  console.log(`TOKEN ${count} === ${token}`);
  count++;
};
