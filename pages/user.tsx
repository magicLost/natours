import React from "react";

//ssr - we render only base template without any data
//on client we send request for user info and show skeleton
//if user not auth we show NotAuth element
//if user auth we show info

const UserPage = () => {
  return <p>Hello, from user page.</p>;
};

export default UserPage;
