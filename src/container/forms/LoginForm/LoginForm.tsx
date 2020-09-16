import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { regex } from "../../../utils/formValidators";
import trim from "validator/lib/trim";
import EmailInput from "../../../component/FormElements/EmailInput/EmailInput";
import PasswordInput from "../../../component/FormElements/PasswordInput/PasswordInput";
import isEmail from "validator/lib/isEmail";
import {
  usePostRequest,
  IJsonResponseError,
} from "../../../hooks/request/usePostRequest";
import LinearProgress from "@material-ui/core/LinearProgress";
import { connect } from "react-redux";
import { IUserData } from "../../../store/reducer/auth";
import { showAlertAC, TAlertType } from "./../../../store/reducer/alert";
//import { getToken } from "./../getToken";
import { emailRules, passwordRules } from "../rules";
import { loginPath } from "../../../data/backendPaths";

export interface ILoginResponseData {
  user: IUserData;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "300px",
      margin: "auto",
    },
  })
);

export interface ILoginFormData {
  email: string;
  password: string;
}

export const LoginForm = ({ onSuccessHandler, showAlert, setUser }: any) => {
  const classes = useStyles();

  const [isDisabled, setIsDisabled] = useState(false);

  const { register, handleSubmit, errors } = useForm<ILoginFormData>();

  const { sendRequest } = usePostRequest<ILoginResponseData>();

  const onSuccess = (data: ILoginResponseData) => {
    showAlert("Все хоккей.", "success");
    setUser(data.user);
    if (onSuccessHandler) onSuccessHandler();
  };

  const onFail = (err: IJsonResponseError) => {
    showAlert(err.message, "error");
    //setUser(data.user);
    setIsDisabled(false);
  };

  const onServerError = () => {
    showAlert("Сервер капризничает...", "error");
    //setUser(data.user);
    setIsDisabled(false);
  };

  const onSubmit = handleSubmit(({ email, password }) => {
    console.log("SUBMIT", email, password);
    //set FormData
    const formData = new FormData();
    formData.set("email", email);
    formData.set("password", password);
    //add token
    /* const token = getToken();
    formData.set("_csrf", token); */
    //setIsDisable
    setIsDisabled(true);
    //sendRequest
    sendRequest(loginPath, formData, onSuccess, onServerError, onFail);
  });

  console.log("[RENDER LOGIN FORM]");
  return (
    <form className={classes.root} onSubmit={onSubmit}>
      <Box width={"100%"} paddingBottom={3}>
        <EmailInput
          register={register}
          rules={{
            required: "Введите ваш email-адрес",
            validate: { ...emailRules },
          }}
          error={errors.email}
          disabled={isDisabled}
        />
      </Box>
      <Box width={"100%"} paddingBottom={3}>
        <PasswordInput
          register={register}
          rules={passwordRules}
          error={errors.password}
          disabled={isDisabled}
          label={"Пароль"}
          name={"password"}
        />
      </Box>

      {isDisabled && (
        <Box pt={1}>
          <LinearProgress variant="query" />
        </Box>
      )}

      <Box paddingTop={1}>
        <Button
          disabled={isDisabled}
          type="submit"
          color="primary"
          fullWidth
          variant="outlined"
        >
          Отправить
        </Button>
      </Box>
    </form>
  );
};

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

export default connect(null, mapDispatchToProps)(LoginForm);
