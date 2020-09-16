import React from "react";
//import classes from './NLoginForm.module.scss';
import { TSendPostWithJsonResponse } from "react-components-lib-lost/container/Forms/FormRequestController";
//import { IFormProps } from "react-components-lib-lost/component/Form/Form";
import NForm from "../../../component/NForm/NForm";
import { loginElementsMap } from "react-components-lib-lost/data/form/login_form_data";
import { useNForm } from "../../../hooks/nForm";
import LoginFormModel, {
  LOGIN_FORM_ELEMENTS,
} from "react-components-lib-lost/container/Forms/LoginForm/LoginFormModel/LoginFormModel";
import FormValidatorChain from "react-components-lib-lost/helper/Validation/FormValidatorChain";
import { TAlertType } from "../../../component/Alert/Alert";
import { showAlertAC } from "./../../../store/reducer/alert";
import { IUserData } from "../../../store/reducer/auth";
import { connect } from "react-redux";

export type TDATA = {
  user: any;
};

interface NLoginFormProps<RESPONSE_DATA_TYPE, T> {
  url: string;
  sendPostWithJsonResponse: TSendPostWithJsonResponse;
  successMessage: string;
  onSuccess?: () => void | undefined;
  showAlert?: (message: string, alertType: TAlertType) => void | undefined;
  setUser?: (user: IUserData) => void | undefined;
  //closeForm?: () => void | undefined;
  getToken: () => string;
  //Form: React.FC<IFormProps<T>>;
}

export function NLoginForm({
  url,
  sendPostWithJsonResponse,
  successMessage,
  getToken,
  onSuccess,
  setUser,
  showAlert,
}: NLoginFormProps<TDATA, LOGIN_FORM_ELEMENTS>) {
  const onSuccessLogin = (data: TDATA) => {
    //if (closeForm === undefined) throw new Error("NO close form");
    if (setUser === undefined) throw new Error("NO setUser");

    const { name, photo } = data.user;

    //set user info to user state
    setUser({ name, photo });
    //close form
    if (onSuccess) onSuccess();
  };

  const { controller, formElementsState, isLoading } = useNForm<
    LOGIN_FORM_ELEMENTS,
    TDATA
  >(
    loginElementsMap,
    new LoginFormModel(new FormValidatorChain(), getToken),
    sendPostWithJsonResponse,
    url,
    successMessage,
    showAlert as any,
    onSuccessLogin
  );

  return (
    <NForm
      formError={""}
      formMessage={""}
      formElementsState={formElementsState}
      elementsDescs={loginElementsMap}
      submitButtonLabel={"Login"}
      onChange={controller.onChange}
      onClear={controller.onClear}
      onSubmit={controller.onSubmit}
      isLoading={isLoading}
    />
  );
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setUser: (user: IUserData) =>
      dispatch({
        type: "SET_USER",
        user: user,
      }),
    showAlert: (message: string, alertType: TAlertType) => {
      dispatch(showAlertAC(message, alertType));
    },
    /* closeForm: () => {
      dispatch({
        type: "HIDE_MODAL",
      });
    }, */
  };
};

export default connect(null, mapDispatchToProps)(NLoginForm);
