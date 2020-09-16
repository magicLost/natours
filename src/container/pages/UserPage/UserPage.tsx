import React from "react";
//import classes from './UserPage.module.scss';
//import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import SettingsIcon from "@material-ui/icons/Settings";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import WorkIcon from "@material-ui/icons/Work";
import ScrollableTabs from "../../../component/ScrollableTabs/ScrollableTabs";
import SettingsSection from "./Sections/SettingsSection/SettingsSection";
import MyBookingsSection from "./Sections/MyBookingsSection/MyBookingsSection";
import MyReviewsSection from "./Sections/MyReviewsSection/MyReviewsSection";
import BillingSection from "./Sections/BillingSection/BillingSection";

const userTabsDesc = [
  { label: "Settings", icon: SettingsIcon },
  { label: "My bookings", icon: BusinessCenterIcon },
  { label: "My reviews", icon: StarBorderIcon },
  { label: "Billing", icon: WorkIcon },
];

interface UserPageProps {}

/*const useStyles = makeStyles({
    root: {
      display: "block",
    },
});*/

const UserPage = ({}: UserPageProps) => {
  //const classes = useStyles();
  return (
    <>
      <ScrollableTabs tabs={userTabsDesc}>
        <SettingsSection />
        <MyBookingsSection />
        <MyReviewsSection />
        <BillingSection />
      </ScrollableTabs>
    </>
  );
};

export default UserPage;
