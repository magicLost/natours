import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { regex } from "../../../utils/formValidators";
import trim from "validator/lib/trim";
import EmailInput from "../../../component/FormElements/EmailInput/EmailInput";
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
import NameInput from "../../../component/FormElements/NameInput/NameInput";
import UploadButton from "../../../component/buttons/UploadButton/UploadButton";
import { emailRules, nameRules } from "../rules";
import { editProfilePath } from "../../../data/backendPaths";

export interface IFullUserData extends IUserData {
  email: string;
}

export interface IEditProfileResponseData {
  user: IFullUserData;
}

export interface IEditProfileFormData {
  name: string;
  email: string;
  photo: FileList;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: "300px",
      margin: "auto",
    },
  })
);

export const EditProfileForm = ({
  userData,
  onSuccessHandler,
  showAlert,
  setUser,
}: any) => {
  const classes = useStyles();

  const [isDisabled, setIsDisabled] = useState(false);

  const [userPhoto, setUserPhoto] = useState(userData.photo);

  const { register, handleSubmit, setValue, errors } = useForm<
    IEditProfileFormData
  >({
    defaultValues: {
      name: userData.name,
      email: userData.email,
      photo: undefined,
    },
  });

  const { sendRequest } = usePostRequest<IEditProfileResponseData>();

  const onSuccess = (data: IEditProfileResponseData) => {
    showAlert("Все хоккей.", "success");
    setUser(data.user);
    //TODO set user values to our form
    setValue([
      { name: data.user.name },
      { email: data.user.email },
      { photo: undefined },
    ]);
    setUserPhoto(data.user.photo);
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

  const onSubmit = handleSubmit(({ name, email, photo }) => {
    console.log("SUBMIT", name, email, photo);

    if (
      photo.length === 0 &&
      name === userData.name &&
      email === userData.email
    ) {
      showAlert("Вы ничего не изменили...", "info");
      return;
    }

    //set FormData
    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("photo", photo[0]); //file - FileList[0]
    //add token
    /*  const token = getToken();
    formData.set("_csrf", token); */
    //setIsDisable
    setIsDisabled(true);
    //sendRequest
    sendRequest(editProfilePath, formData, onSuccess, onServerError, onFail);
  });

  console.log("[RENDER LOGIN FORM]");
  return (
    <form className={classes.root} onSubmit={onSubmit}>
      <Box width={"100%"} paddingBottom={3}>
        <NameInput
          register={register}
          rules={{ validate: { ...nameRules } }}
          error={errors.name}
          disabled={isDisabled}
        />
      </Box>

      <Box width={"100%"} paddingBottom={3}>
        <EmailInput
          register={register}
          rules={{ validate: { ...emailRules } }}
          error={errors.email}
          disabled={isDisabled}
        />
      </Box>

      <Box width={"100%"} paddingBottom={2}>
        <UploadButton
          register={register}
          photo={userPhoto}
          disabled={isDisabled}
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
          Сохранить настройки
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

export default connect(null, mapDispatchToProps)(EditProfileForm);
