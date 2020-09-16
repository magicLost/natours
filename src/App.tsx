import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Header from "./container/pages/partial/Header/Header";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
//import NCard from "./component/Card/NCard";
import Footer from "./container/pages/partial/Footer/Footer";
import Homepage from "./container/pages/Hompage/Homepage";
import TransitionsModal from "./component/TransitionModal/TransitionModal";
import { connect } from "react-redux";
import LoginForm from "./container/forms/LoginForm/LoginForm";
import PopupAlert from "./component/PopupAlert/PopupAlert";
import NotFoundPage from "./container/pages/NotFoundPage/NotFoundPage";
import ErrorBoundary from "./component/ErrorBoundary/ErrorBoundary";
import UserPage from "./container/pages/UserPage/UserPage";
import TourPage from "./container/pages/TourPage/TourPage";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    loginFormWrapper: {
      backgroundColor: "white",
      borderRadius: "4px",
    },
  })
);

function App({
  hideModal,
  showModal,
  isShowModal,
  showSuccessAlert,
  showErrorAlert,
  isShowAlert,
}: any) {
  const classes = useStyles();
  return (
    <>
      <Header />
      <Container component={"main"} maxWidth="lg">
        <Box
          display={"flex"}
          flexWrap={"wrap"}
          justifyContent={"center"}
          paddingY={7}
          paddingX={2}
        >
          <ErrorBoundary>
            <Switch>
              <Route path="/tour/:slug" component={TourPage} />
              <Route path="/user" component={UserPage} />
              <Route path="/">
                <Homepage />
              </Route>
              <Route path="*">
                <NotFoundPage />
              </Route>
            </Switch>
          </ErrorBoundary>
        </Box>
      </Container>
      <Footer />
      <TransitionsModal isShow={isShowModal} hideModal={hideModal}>
        <Box className={classes.loginFormWrapper} pt={4} pb={3} paddingX={5}>
          <LoginForm onSuccessHandler={hideModal} />
        </Box>
      </TransitionsModal>
      <PopupAlert />
    </>
  );
}

const mapStateToProps = (state: any) => {
  return {
    isShowModal: state.modal.isShow,
    isShowAlert: state.alert.isShow,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    /* logOutUser: () =>
      dispatch({
        type: "LOG_OUT_USER",
      }),*/
    showSuccessAlert: () =>
      dispatch({
        type: "SHOW_ALERT",
        message: "You successfully loged out.",
        alertType: "SUCCESS",
      }),
    showErrorAlert: () =>
      dispatch({
        type: "SHOW_ALERT",
        message: "Ops. Some error...",
        alertType: "ERROR",
      }),
    hideModal: () =>
      dispatch({
        type: "HIDE_MODAL",
      }),
    showModal: () =>
      dispatch({
        type: "SHOW_MODAL",
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
