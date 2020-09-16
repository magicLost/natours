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
import { changePasswordPath } from "../../../data/backendPaths";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: "300px",
      margin: "auto",
    },
  })
);

export interface ILoginFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const ChangePasswordForm = ({ onSuccessHandler, showAlert }: any) => {
  const classes = useStyles();

  const [isDisabled, setIsDisabled] = useState(false);

  const { register, handleSubmit, errors, getValues } = useForm<
    ILoginFormData
  >();

  const { sendRequest } = usePostRequest<undefined>();

  const onSuccess = () => {
    showAlert("Все хоккей.", "success");
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

  const onSubmit = handleSubmit(
    ({ currentPassword, newPassword, confirmPassword }) => {
      console.log("SUBMIT", currentPassword, newPassword, confirmPassword);
      //set FormData
      const formData = new FormData();
      formData.set("currentPassword", currentPassword);
      formData.set("newPassword", newPassword);
      formData.set("confirmPassword", confirmPassword);
      //add token
      /* const token = getToken();
      formData.set("_csrf", token); */
      //setIsDisable
      setIsDisabled(true);
      //sendRequest
      sendRequest(
        changePasswordPath,
        formData,
        onSuccess,
        onServerError,
        onFail
      );
    }
  );

  console.log("[RENDER LOGIN FORM]");
  return (
    <form className={classes.root} onSubmit={onSubmit}>
      <Box width={"100%"} paddingBottom={3}>
        <PasswordInput
          register={register}
          rules={passwordRules}
          error={errors.currentPassword}
          disabled={isDisabled}
          label={"Текущий пароль"}
          name={"currentPassword"}
        />
      </Box>
      <Box width={"100%"} paddingBottom={3}>
        <PasswordInput
          register={register}
          rules={{
            ...passwordRules,
            required: "Введите новый пароль, пожалуйста.",
          }}
          error={errors.newPassword}
          disabled={isDisabled}
          label={"Новый пароль"}
          name={"newPassword"}
        />
      </Box>
      <Box width={"100%"} paddingBottom={3}>
        <PasswordInput
          register={register}
          rules={{
            required: "Пожалуйста, подтвердите пароль",
            validate: {
              matchesPreviousPassword: (value: string) => {
                const { newPassword } = getValues();
                return newPassword === value || "Пароли должны совпадать";
              },
            },
          }}
          error={errors.confirmPassword}
          disabled={isDisabled}
          label={"Подтвердите пароль"}
          name={"confirmPassword"}
        />
      </Box>

      {isDisabled && (
        <Box pt={1}>
          <LinearProgress variant="query" />
        </Box>
      )}

      <Box display={"flex"} justifyContent={"flex-end"}>
        <Button
          disabled={isDisabled}
          type="submit"
          color="primary"
          variant="outlined"
        >
          Сохранить пароль
        </Button>
      </Box>
    </form>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    /* setUser: (user: IUserData) =>
      dispatch({
        type: "SET_USER",
        user: user,
      }), */
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

export default connect(null, mapDispatchToProps)(ChangePasswordForm);
