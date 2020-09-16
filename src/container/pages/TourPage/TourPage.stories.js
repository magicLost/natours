import React from "react";
import { action } from "@storybook/addon-actions";
import TourPage from "./TourPage";
        
export default {
    component: TourPage,
    title: "TourPage",
    decorators: [],
    //decorators: [withKnobs],
    // Our exports that end in "Data" are not stories.
    excludeStories: /.*Data$/,
};

export const Default = () => {
    return (
      <>
        <TourPage />
      </>
    );
  };
        