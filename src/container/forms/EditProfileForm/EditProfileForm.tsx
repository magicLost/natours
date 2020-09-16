import React, { useEffect, useMemo } from "react";
import classes from "./EditProfileForm.module.scss";
import { TSendPostWithJsonResponse } from "react-components-lib-lost/container/Forms/FormRequestController";
//import { IFormProps } from "react-components-lib-lost/component/Form/Form";
import { TAlertType } from "../../../component/Alert/Alert";
import { connect } from "react-redux";
import { renderElements } from "../../../component/NForm/NForm";
import { useNForm } from "../../../hooks/nForm";
import EditProfileFormModel, {
  EDIT_PROFILE_FORM_ELEMENTS,
} from "./EditProfileFormModel/EditProfileFormModel";
import { IUserData } from "../../../store/reducer/auth";
import formClasses from "../../../component/NForm/NForm.module.scss";
import {
  IFormProps,
  TFormElementsDescs,
  IFormElementDesc,
  TFormElementsState,
  IFormElementState,
} from "react-components-lib-lost/component/Form/Form";
import { IJsonResponse } from "react-components-lib-lost/types";
import { editProfileElementsMap } from "../../../data/form/edit_profile_data";
import FormValidatorChain from "react-components-lib-lost/helper/Validation/FormValidatorChain";
import { showAlertAC } from "../../../store/reducer/alert";

export interface IEditUserData extends IUserData {
  email: string;
}

export interface IEditUserResponseData {
  user: {
    name: string;
    email: string;
    photo: string;
  };
}

interface EditProfileFormProps {
  url: string;
  sendPostWithJsonResponse: TSendPostWithJsonResponse;
  successMessage: string;
  onSuccess?: () => void | undefined;
  showAlert?: (message: string, alertType: TAlertType) => void | undefined;
  setUser?: (user: IUserData) => void | undefined;
  //closeForm?: () => void | undefined;
  getToken: () => string;
  userData: IEditUserData;
}

const getPhotoFileInput = (
  formElementsDescs: TFormElementsDescs<EDIT_PROFILE_FORM_ELEMENTS>,
  formElementsState: TFormElementsState<EDIT_PROFILE_FORM_ELEMENTS>,
  userData: IEditUserData,
  onChange: (event: any) => void,
  isLoading: boolean
) => {
  const inputState = formElementsState.get("PHOTO");
  const inputDesc = formElementsDescs.get("PHOTO");

  //const divClasses = "";
  //const inputClasses = "";
  return (
    <div
      key={"PHOTO_3242"}
      className={[formClasses.Group, classes["form__photo-upload"]].join(" ")}
    >
      <img
        className={classes["form__user-photo"]}
        src={"/img/users/" + userData.photo}
        alt="User photo"
      />
      <input
        className={classes["form__upload"]}
        type="file"
        {...(inputDesc as IFormElementDesc).elementAttrs}
        name={"PHOTO"}
        value={(inputState as IFormElementState).value}
        onChange={onChange}
        disabled={isLoading}
      />
      <label htmlFor={(inputDesc as IFormElementDesc).elementAttrs.id}>
        {(inputDesc as IFormElementDesc).labelValue}
      </label>
    </div>
  );
};

const getElements = (
  formElementsDescs: TFormElementsDescs<EDIT_PROFILE_FORM_ELEMENTS>,
  formElementsState: TFormElementsState<EDIT_PROFILE_FORM_ELEMENTS>,
  userData: IEditUserData,
  onChange: (event: any) => void,
  isLoading: boolean
) => {
  const elements = renderElements(
    formElementsDescs,
    formElementsState,
    onChange,
    isLoading
  );

  elements.push(
    getPhotoFileInput(
      formElementsDescs,
      formElementsState,
      userData,
      onChange,
      isLoading
    )
  );

  return elements;
};

export const EditProfileForm = ({
  url,
  sendPostWithJsonResponse,
  successMessage,
  getToken,
  onSuccess,
  setUser,
  showAlert,
  userData,
}: EditProfileFormProps) => {
  const onSuccessLogin = (data: IEditUserResponseData) => {
    //if (closeForm === undefined) throw new Error("NO close form");
    if (setUser === undefined) throw new Error("NO setUser");

    const { name, photo } = data.user;

    //set user info to user state
    setUser({ name, photo });
    //close form
    if (onSuccess) onSuccess();
  };

  const { controller, formElementsState, isLoading } = useNForm<
    EDIT_PROFILE_FORM_ELEMENTS,
    IEditUserResponseData
  >(
    editProfileElementsMap,
    new EditProfileFormModel(new FormValidatorChain(), getToken, userData),
    sendPostWithJsonResponse,
    url,
    successMessage,
    showAlert as any,
    onSuccessLogin
  );

  const elements = getElements(
    editProfileElementsMap,
    formElementsState,
    userData,
    controller.onChange,
    isLoading as boolean
  );

  return (
    <form className={classes["form"]} onSubmit={controller.onSubmit}>
      {elements}
      <div className="form__group right">
        <button className="btn btn--small btn--green">Save settings</button>
      </div>
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
