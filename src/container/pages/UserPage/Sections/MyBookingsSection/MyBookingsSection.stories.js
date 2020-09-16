import React from "react";
import { action } from "@storybook/addon-actions";
import MyBookingsSection from "./MyBookingsSection";

export default {
  component: MyBookingsSection,
  title: "Pages/UserPage/Sections/MyBookingsSection",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return (
    <>
      <MyBookingsSection />
    </>
  );
};
