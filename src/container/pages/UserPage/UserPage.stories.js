import React from "react";
import { action } from "@storybook/addon-actions";
import UserPage from "./UserPage";

export default {
  component: UserPage,
  title: "Pages/UserPage",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return (
    <>
      <UserPage />
    </>
  );
};
