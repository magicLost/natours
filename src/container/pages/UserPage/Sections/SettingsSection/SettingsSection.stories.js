import React from "react";
import { action } from "@storybook/addon-actions";
import SettingsSection from "./SettingsSection";

export default {
  component: SettingsSection,
  title: "Pages/UserPage/Sections/SettingsSection",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return (
    <>
      <SettingsSection />
    </>
  );
};
