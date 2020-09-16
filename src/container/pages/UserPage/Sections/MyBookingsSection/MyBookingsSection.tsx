import React from "react";
//import classes from './MyBookingsSection.module.scss';
//import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

interface MyBookingsSectionProps {}

/*const useStyles = makeStyles({
    root: {
      display: "block",
    },
});*/

const MyBookingsSection = ({}: MyBookingsSectionProps) => {
  //const classes = useStyles();
  console.log("[RENDER] MyBookingsSection");

  return (
    <section>
      <h3>My bookings section</h3>
    </section>
  );
};

export default MyBookingsSection;
