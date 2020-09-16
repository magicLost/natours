import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import logoGreen from "../../../../static/images/logo-green.png";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    navigation: {
      listStyle: "none",
      display: "flex",
      justifyContent: "flex-end",
      flexBasis: "100%",
    },
    logo: {
      marginLeft: "auto",
      height: "30px",
    },
    link: {
      paddingRight: "12px",
      fontSize: "14px",
      color: "#777",
    },
  })
);

const Footer = () => {
  const classes = useStyles();

  return (
    <Container component={"footer"} maxWidth={"lg"}>
      <Grid container spacing={3} alignItems={"center"}>
        <Grid item sm={2} xs={12}>
          <img className={classes.logo} src={logoGreen} alt="Natours logo" />
        </Grid>
        <Grid item sm={10} xs={12}>
          <Box
            display={"flex"}
            flexWrap={"wrap"}
            justifyContent={"flex-end"}
            alignItems={"flex-start"}
          >
            <ul className={classes.navigation}>
              <li className={classes.link}>
                <Link color={"textSecondary"} href="#">
                  About us
                </Link>
              </li>
              <li className={classes.link}>
                <Link color={"textSecondary"} href="#">
                  Download apps
                </Link>
              </li>
              <li className={classes.link}>
                <Link color={"textSecondary"} href="#">
                  Become a guide
                </Link>
              </li>
              <li className={classes.link}>
                <Link color={"textSecondary"} href="#">
                  Careers
                </Link>
              </li>
              <li className={classes.link}>
                <Link color={"textSecondary"} href="#">
                  Contact
                </Link>
              </li>
            </ul>
            <Typography color={"textSecondary"} variant={"body2"}>
              &copy; by Hren Morjovii. All rights reserved.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Footer;
