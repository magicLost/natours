import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import logoWhite from "./../../../../static/images/logo-white.png";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import NavUserBtnWithMenu from "../../../../component/NavUserBtnWithMenu/NavUserBtnWithMenu";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { usePostRequest } from "../../../../hooks/request/usePostRequest";
import { logoutPath } from "../../../../data/backendPaths";

const useStyles = makeStyles((theme: Theme) =>
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

export const Header = ({
  user,
  showModal,
  showSuccessAlert,
  logOutUser,
  showErrorAlert,
}: any) => {
  const classes = useStyles();

  const { sendRequest } = usePostRequest<undefined>();
  let history = useHistory();

  const onSuccessLogout = () => {
    showSuccessAlert();
    logOutUser();
    //ToDo: make redirect only from protected pages
    history.push("/");
  };

  const onLogout = () => {
    sendRequest(logoutPath, new FormData(), onSuccessLogout, showErrorAlert);
  };

  const getAuthFragment = () => {
    if (user && user.name !== "") {
      return (
        <NavUserBtnWithMenu
          userButton={
            <Button
              classes={{
                label: classes.label,
              }}
              className={classes.authButton}
              color="inherit"
              startIcon={
                <img
                  className={classes.userPhoto}
                  src={`/images/users/${user.photo}`}
                  height={"30px"}
                  alt={`${user.name} photo`}
                />
              }
            >
              {user.name}
            </Button>
          }
          onLogOutUser={onLogout}
        />
      );
    } else {
      return (
        <Button
          className={classes.authButton}
          color="inherit"
          startIcon={<AccountCircleIcon />}
          onClick={showModal}
        >
          Login
        </Button>
      );
    }
  };

  const authFragment = getAuthFragment();

  return (
    <AppBar position="sticky" className={classes.appBarBGColor}>
      <Container maxWidth="lg">
        <Toolbar>
          <IconButton
            aria-label="Home page"
            component={RouterLink}
            to="/"
            className={classes.menuButton}
          >
            <img src={logoWhite} height={"30px"} alt="Natours logo" />
          </IconButton>
          {authFragment}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const mapStateToProps = (state: any) => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    logOutUser: () =>
      dispatch({
        type: "LOG_OUT_USER",
      }),
    showModal: () =>
      dispatch({
        type: "SHOW_MODAL",
      }),
    showSuccessAlert: () =>
      dispatch({
        type: "SHOW_ALERT",
        message: "Вы успешно вышли из аккаунта.",
        alertType: "success",
      }),
    showErrorAlert: () =>
      dispatch({
        type: "SHOW_ALERT",
        message: "Опс. Какая-то ошибка... Пожалуйста попробуйт позже...",
        alertType: "error",
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
