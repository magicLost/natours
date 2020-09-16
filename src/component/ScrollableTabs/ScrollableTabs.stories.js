import React from "react";
import { action } from "@storybook/addon-actions";
import ScrollableTabs from "./ScrollableTabs";
import SettingsIcon from "@material-ui/icons/Settings";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import WorkIcon from "@material-ui/icons/Work";

const testTabsDesc = [
  { label: "Settings", icon: SettingsIcon },
  { label: "My bookings", icon: BusinessCenterIcon },
  { label: "My reviews", icon: StarBorderIcon },
  { label: "Billing", icon: WorkIcon },
];

export default {
  component: ScrollableTabs,
  title: "ScrollableTabs",
  decorators: [],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const Default = () => {
  return (
    <>
      <ScrollableTabs tabs={testTabsDesc}>
        <div>
          <h3>Settings</h3>
        </div>
        <div>
          <h3>My bookings</h3>
        </div>
        <div>
          <h3>My reviews</h3>
        </div>
        <div>
          <h3>Billing</h3>
        </div>
      </ScrollableTabs>
    </>
  );
};
