import React from "react";
//import { action } from "@storybook/addon-actions";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import { Alert } from "./Alert";

export default {
  component: Alert,
  title: "Alert",
  decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  //excludeStories: /.*Data$/,
};

export const Default = () => (
  <Alert
    type={text("Type", "SUCCESS")}
    isShow={boolean("isShow", true)}
    message={text("Message", "Hello, from alert...")}
  />
);
