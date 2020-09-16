import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import { PopupAlert } from "./PopupAlert";

export default {
  component: PopupAlert,
  title: "PopupAlert",
  decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  //excludeStories: /.*Data$/,
};

export const Default = () => (
  <PopupAlert
    type={text("Type", "success")}
    isShow={boolean("isShow", true)}
    message={text("Message", "Hello, from alert...")}
    hideAlert={action("onClose")}
  />
);
