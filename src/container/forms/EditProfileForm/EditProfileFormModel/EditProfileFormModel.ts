import { TFormElementsState } from "react-components-lib-lost/hooks/Form/form";
import {
  TFormElementsDescs,
  IFormElementState,
} from "react-components-lib-lost/component/Form/Form";

//import { IFeedbackModel } from "react-components-lib-lost/container/Forms/interfaces";
import FormModel from "react-components-lib-lost/container/Forms/FormModel";
//import { IFormValidatorChain } from "react-components-lib-lost/helper/Validation/FormValidatorChain";
import { IFormValidatorChain } from "react-components-lib-lost/helper/Validation/FormValidatorChain";
import { IEditUserData } from "./../EditProfileForm";

export type EDIT_PROFILE_FORM_ELEMENTS = "EMAIL" | "NAME" | "PHOTO";

class EditProfileFormModel extends FormModel<EDIT_PROFILE_FORM_ELEMENTS> {
  userData: IEditUserData;

  constructor(
    validatorChain: IFormValidatorChain,
    getToken: () => string,
    userData: IEditUserData
  ) {
    super(validatorChain, getToken);
    this.userData = userData;
  }

  getFormElementsInitState(
    formElements: TFormElementsDescs<EDIT_PROFILE_FORM_ELEMENTS>
  ): TFormElementsState<EDIT_PROFILE_FORM_ELEMENTS> {
    const formElementsState: TFormElementsState<EDIT_PROFILE_FORM_ELEMENTS> = super.getFormElementsInitState(
      formElements
    );

    const name = formElementsState.get("NAME");
    const email = formElementsState.get("EMAIL");

    (name as IFormElementState).value = this.userData.name;
    (email as IFormElementState).value = this.userData.email;

    return formElementsState;
  }

  validateOnSubmit(
    stateFormElements: TFormElementsState<EDIT_PROFILE_FORM_ELEMENTS>
  ): string {
    //if no file -> check if name, email not the same
    //if one of fiels is empty we do not change this field

    let email = "";
    let name = "";
    let photoFile = "";

    stateFormElements.forEach((elemDesc, key, map) => {
      switch (key) {
        case "EMAIL":
          email = elemDesc.value;
          break;
        case "NAME":
          name = elemDesc.value;
          break;
        case "PHOTO":
          photoFile = elemDesc.value;
          break;
      }
    });

    //console.log("validateOnSubmit", email, name, photoFile);

    if (photoFile === "") {
      if (
        (name === "" || name === this.userData.name) &&
        (email === "" || email === this.userData.email)
      )
        return "Вы ничего не изменили.";
    }

    return "";
  }

  calcAndGetFormMessage(formData: FormData) {
    throw new Error("Do not use this...");
    return "";
  }
}

export default EditProfileFormModel;
