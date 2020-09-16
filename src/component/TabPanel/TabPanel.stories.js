import React from "react";
import { action } from "@storybook/addon-actions";
import TabPanel from "./TabPanel";
import SettingsIcon from "@material-ui/icons/Settings";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import WorkIcon from "@material-ui/icons/Work";

export default {
  component: TabPanel,
  title: "TabPanel",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return (
    <>
      <TabPanel />
    </>
  );
};
