import React from "react";
//import classes from "./LoginForm.module.scss";
import { connect } from "react-redux";
import { TSendPostWithJsonResponse } from "react-components-lib-lost/container/Forms/FormRequestController";
import LoginForm from "react-components-lib-lost/container/Forms/LoginForm/LoginForm";
import Form from "react-components-lib-lost/component/Form/Form";
import { IUserData } from "../../../store/reducer/auth";

interface LoginFormProps {
  url: string;
  sendPostWithJsonResponse: TSendPostWithJsonResponse;
  getToken: () => string;
  setUser?: (user: any) => void | undefined;
}

type TDATA = {
  user: any;
  token: string;
};

export const MLoginForm = ({
  url,
  sendPostWithJsonResponse,
  getToken,
  setUser,
}: LoginFormProps) => {
  console.log("[RENDER] login form");

  return (
    <>
      <LoginForm<TDATA>
        url={url}
        sendPostWithJsonResponse={sendPostWithJsonResponse}
        successMessage={"Все пучком."}
        onSuccess={(data: TDATA) => {
          if (!setUser) throw new Error("NO setUser");
          const { name, photo } = data.user;
          setUser({ name, photo });
        }}
        getToken={getToken}
        Form={Form}
      />
    </>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setUser: (user: IUserData) =>
      dispatch({
        type: "SET_USER",
        user: user,
      }),
  };
};

export default connect(null, mapDispatchToProps)(MLoginForm);
