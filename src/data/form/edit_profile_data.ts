import {
  VALIDATOR_TYPES,
  IFormValidatorOptions,
} from "react-components-lib-lost/helper/Validation/form_validators";
import {
  IFormElementDesc,
  TFormElementsDescs,
  ELEMENT_TYPE,
} from "react-components-lib-lost/component/Form/Form";
import { EDIT_PROFILE_FORM_ELEMENTS } from "./../../container/forms/EditProfileForm/EditProfileFormModel/EditProfileFormModel";
//import {element_type} from "../component/Form/Form";
//import {validatorTypes} from "../helper/Validation/Validators";

export const editProfileElements: IFormElementDesc[] = [
  {
    elementType: "INPUT",
    elementAttrs: {
      type: "email",
      id: "edit_profile_email123",
      placeholder: "example@mail.ru",
    },
    labelValue: "Email address",
    validators: [
      {
        name: VALIDATOR_TYPES.LENGTH,
        options: {
          errorMessage: "Слишком длинный электронный адрес.",
          max: 255,
        },
      },
    ],
    value: "",
  },

  {
    elementType: "INPUT",
    elementAttrs: {
      type: "name",
      id: "edit_profile_name123",
      placeholder: "Brad Nepit",
    },
    labelValue: "Name",
    validators: [
      {
        name: VALIDATOR_TYPES.REGEX,
        options: {
          errorMessage: "Недопустимый символ.",
          pattern: /[a-zA-ZА-Яа-я 0-9-]*/,
        },
      },
      {
        name: VALIDATOR_TYPES.LENGTH,
        options: {
          errorMessage: "Имя должно содержать от двух до 100 символов.",
          min: 2,
          max: 100,
        },
      },
    ],
    value: "",
  },

  {
    elementType: "FILE_INPUT",
    elementAttrs: {
      type: "file",
      id: "edit_profile_photo123",
      accept: "image/*",
    },
    labelValue: "Choose new photo",
    /* validators: [
      
      {
        name: VALIDATOR_TYPES.LENGTH,
        options: {
          errorMessage: "Имя должно содержать от двух до 100 символов.",
          min: 2,
          max: 100,
        },
      },
    ], */
    value: "",
  },
];

export const editProfileElementsMap: TFormElementsDescs<EDIT_PROFILE_FORM_ELEMENTS> = new Map();

editProfileElementsMap.set("NAME", editProfileElements[1]);
editProfileElementsMap.set("EMAIL", editProfileElements[0]);
editProfileElementsMap.set("PHOTO", editProfileElements[2]);
