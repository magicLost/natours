import React from "react";
//import classes from './MyReviewsSection.module.scss';
//import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

interface MyReviewsSectionProps {}

/*const useStyles = makeStyles({
    root: {
      display: "block",
    },
});*/

const MyReviewsSection = ({}: MyReviewsSectionProps) => {
  //const classes = useStyles();
  console.log("[RENDER] MyReviewsSection");
  return (
    <section>
      <h3>My reviews section</h3>
    </section>
  );
};

export default MyReviewsSection;
