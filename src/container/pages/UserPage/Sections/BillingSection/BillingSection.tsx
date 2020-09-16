import React from "react";
//import classes from './BillingSection.module.scss';
//import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

interface BillingSectionProps {}

/*const useStyles = makeStyles({
    root: {
      display: "block",
    },
});*/

const BillingSection = ({}: BillingSectionProps) => {
  //const classes = useStyles();
  console.log("[RENDER] BillingSection");

  return (
    <section>
      <h3>Billing section</h3>
    </section>
  );
};

export default BillingSection;
