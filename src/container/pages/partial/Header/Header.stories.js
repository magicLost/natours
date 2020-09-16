import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import { Header } from "./Header";

export default {
  component: Header,
  title: "Header",
  decorators: [],
  // Our exports that end in "Data" are not stories.
  //excludeStories: /.*Data$/,
};

export const Default = () => <Header />;

export const LogedIn = () => (
  <Header user={{ name: "Crissy", photo: "user-3.jpg" }} />
);
