import React from "react";
import { action } from "@storybook/addon-actions";
import Footer from "./Footer";
        
export default {
    component: Footer,
    title: "Footer",
    decorators: [],
    //decorators: [withKnobs],
    // Our exports that end in "Data" are not stories.
    excludeStories: /.*Data$/,
};

export const Default = () => {
    return (
      <>
        <Footer />
      </>
    );
  };
        