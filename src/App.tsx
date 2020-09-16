import React, { useState, useMemo } from "react";
import { connect } from "react-redux";
import classes from "./App.module.scss";
import Homepage from "./container/pages/Homepage/Homepage";
import Header from "./container/pages/Partial/Header/Header";
import Footer from "./container/pages/Partial/Footer/Footer";
import { Switch, Route } from "react-router-dom";
import NotFoundPage from "./container/pages/NotFoundPage/NotFoundPage";
import ErrorBoundary from "./component/ErrorBoundary/ErrorBoundary";
import TourPage from "./container/pages/TourPage/TourPage";
import Modal from "react-components-lib-lost/component/Modal/Modal";
//import LoginForm from "./container/forms/LoginForm/LoginForm";
import { sendPostWithJsonResponse } from "utils-library-lost/Fetch/Fetch";
import { getToken } from "./utils/getToken";
import Alert from "./component/Alert/Alert";
import NLoginForm from "./container/forms/NLoginForm/NLoginForm";
//import Button from "../node_modules/react-components-lib-lost/component/UI/Button/Button";

interface IAppProps {
  logOutUser?: () => void | undefined;
  showSuccessAlert?: () => void | undefined;
  showErrorAlert?: () => void | undefined;
  hideModal?: () => void | undefined;
  showModal?: () => void | undefined;
  isShowModal?: boolean;
}

export const App = ({
  logOutUser,
  showSuccessAlert,
  showErrorAlert,
  hideModal,
  showModal,
  isShowModal,
}: IAppProps) => {
  console.log("render App");

  //const [showLoginForm, setShowLoginForm] = useState(false);

  const onLogout = async (event: any) => {
    const formData = new FormData();

    let token: string = getToken();

    formData.append("_csrf", token);

    try {
      const result = await sendPostWithJsonResponse<{
        status: "SUCCESS" | "FAIL" | "ERROR";
      }>("/api/v1/users/logout", formData);
      if (result.status !== "SUCCESS") throw new Error();

      if (showSuccessAlert === undefined)
        throw new Error("No showSuccessAlert");
      showSuccessAlert();
      if (logOutUser === undefined) throw new Error("No logOutUser");
      logOutUser();
    } catch (error) {
      if (showErrorAlert === undefined) throw new Error("No showErrorAlert");
      showErrorAlert();
    }
  };

  return (
    <>
      <Header
        onShowLoginForm={showModal as any}
        onShowRegistrationForm={() => console.log("onShowRegistrationForm")}
        onLogout={onLogout}
      />
      <main className={classes["main"]}>
        <ErrorBoundary>
          <Switch>
            <Route path="/tour/:slug" component={TourPage} />
            <Route path="/">
              <Homepage />
            </Route>
            <Route path="*">
              <NotFoundPage />
            </Route>
          </Switch>
        </ErrorBoundary>
      </main>
      <Footer />
      <Modal
        show={isShowModal as any}
        onClose={hideModal as any}
        type={"CENTER"}
      >
        {useMemo(() => {
          return (
            <NLoginForm
              url={"http://localhost:3000/api/v1/users/login"}
              sendPostWithJsonResponse={sendPostWithJsonResponse}
              successMessage={"You successfully loged in."}
              onSuccess={hideModal}
              getToken={getToken}
            />
          );
        }, [isShowModal])}
      </Modal>
      <Alert />
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    isShowModal: state.modal.isShow,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    logOutUser: () =>
      dispatch({
        type: "LOG_OUT_USER",
      }),
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
