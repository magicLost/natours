import React from "react";
import { action } from "@storybook/addon-actions";
import MyReviewsSection from "./MyReviewsSection";

export default {
  component: MyReviewsSection,
  title: "Pages/UserPage/Sections/MyReviewsSection",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return (
    <>
      <MyReviewsSection />
    </>
  );
};
