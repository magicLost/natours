import React from "react";
import { action } from "@storybook/addon-actions";
import Layout from "./Layout";
        
export default {
    component: Layout,
    title: "Layout",
    decorators: [],
    //decorators: [withKnobs],
    // Our exports that end in "Data" are not stories.
    excludeStories: /.*Data$/,
};

export const Default = () => {
    return (
      <>
        <Layout />
      </>
    );
  };
        