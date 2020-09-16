import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import NavUserBtnWithMenu from "../../../component/NavUserBtnWithMenu/NavUserBtnWithMenu";
import ButtonLink from "../../../component/UI/ButtonLink/ButtonLink";
import { useAuthUser } from "../../../hooks/auth/auth";
import Skeleton from "@material-ui/lab/Skeleton";

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

export const Header = ({}: /*  user,
  showModal,
  showSuccessAlert,
  logOutUser,
  showErrorAlert, */
any) => {
  const classes = useStyles();

  const { data, error, loading } = useAuthUser();

  //const { sendRequest } = usePostRequest<undefined>();
  //let history = useHistory();

  const onSuccessLogout = () => {
    console.log("onSuccessLogout");
    /* showSuccessAlert();
    logOutUser();
    //ToDo: make redirect only from protected pages
    history.push("/"); */
  };

  const onLogout = () => {
    console.log("onLogout");
    //sendRequest(logoutPath, new FormData(), onSuccessLogout, showErrorAlert);
  };

  const getAuthFragment = (data: any, loading: boolean) => {
    if (loading) {
      return <Skeleton variant="rect" width={90} height={36} />;
    }

    /* if (data && data.userAuth) {
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
    } else { */
    return (
      <Button
        className={classes.authButton}
        color="inherit"
        startIcon={<AccountCircleIcon />}
        onClick={() => console.log("showModal")}
      >
        Login
      </Button>
    );
    //}
  };

  const authFragment = getAuthFragment(data, loading);

  return (
    <Container maxWidth="lg">
      <AppBar position="sticky" className={classes.appBarBGColor}>
        <Toolbar>
          <IconButton
            aria-label="Home page"
            component={ButtonLink}
            href="/"
            hrefAs="/"
            className={classes.menuButton}
          >
            <img
              src="images/logo-white.png"
              height={"30px"}
              alt="Natours logo"
            />
          </IconButton>
          {authFragment}
        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default Header;

/* const mapStateToProps = (state: any) => {
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
 */
