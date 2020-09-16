import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import NavUserBtnWithMenu from "./NavUserBtnWithMenu";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { BrowserRouter } from "react-router-dom";

const useStyles = makeStyles((theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    authButton: {
      marginLeft: "auto",
      // padding: "2px",
    },
    userPhoto: {
      borderRadius: "50%",
    },
    appBarBGColor: {
      backgroundColor: "#55c57a",
    },
    label: {
      textTransform: "capitalize",
    },
  })
);

export default {
  component: NavUserBtnWithMenu,
  title: "NavUserBtnWithMenu",
  decorators: [],
  // Our exports that end in "Data" are not stories.
  //excludeStories: /.*Data$/,
};

export const Default = () => {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <Box width={"100px"} margin={"auto"}>
        <NavUserBtnWithMenu
          userButton={
            <Button
              classes={{
                label: classes.label,
              }}
              className={classes.authButton}
              startIcon={
                <img
                  className={classes.userPhoto}
                  src={`/images/users/user-3.jpg`}
                  height={"30px"}
                  alt={`Kelly photo`}
                />
              }
            >
              {"Kelly"}
            </Button>
          }
        />
      </Box>
    </BrowserRouter>
  );
};
