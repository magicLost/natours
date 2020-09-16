import React from "react";
import { action } from "@storybook/addon-actions";
import ButtonLink from "./ButtonLink";
        
export default {
    component: ButtonLink,
    title: "ButtonLink",
    decorators: [],
    //decorators: [withKnobs],
    // Our exports that end in "Data" are not stories.
    excludeStories: /.*Data$/,
};

export const Default = () => {
    return (
      <>
        <ButtonLink />
      </>
    );
  };
        