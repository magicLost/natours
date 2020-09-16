import React from "react";
import { action } from "@storybook/addon-actions";
import BillingSection from "./BillingSection";

export default {
  component: BillingSection,
  title: "Pages/UserPage/Sections/BillingSection",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return (
    <>
      <BillingSection />
    </>
  );
};
