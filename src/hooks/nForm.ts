import {
  IFormElementState,
  TFormElementsState,
  IFormState,
} from "react-components-lib-lost/hooks/Form/form";
import { IFormController } from "react-components-lib-lost/container/Forms/FormController";
import { useState, useRef } from "react";
import NFormRequestController from "../container/forms/NFormRequestController";
import { TFormElementsDescs } from "react-components-lib-lost/component/Form/Form";
import { IFormModel } from "react-components-lib-lost/container/Forms/interfaces";
import { TSendPostWithJsonResponse } from "react-components-lib-lost/container/Forms/FormRequestController";
import { TAlertType } from "../component/Alert/Alert";

//on form error we call show alert
//on form success we call show alert and hide modal
//on loading we call show alert and disable form

export interface INFormState<T> extends IFormState<T> {
  isLoading: false;
}

export const useNForm = <T, RESPONSE_DATA_TYPE>(
  formElements: TFormElementsDescs<T>,
  formModel: IFormModel<T>,
  sendPostWithJsonResponse: TSendPostWithJsonResponse,
  url: string,
  successMessage: string,
  showAlert: (message: string, alertType: TAlertType) => void | undefined,
  onSuccess?: (data: RESPONSE_DATA_TYPE) => void | undefined
) => {
  const controllerRef: React.MutableRefObject<IFormController<
    T
  > | null> = useRef(null);

  const [formState, setFormState] = useState(
    (): IFormState<T> => {
      const controller = new NFormRequestController<T, RESPONSE_DATA_TYPE>(
        formElements,
        formModel,
        url,
        sendPostWithJsonResponse,
        successMessage,
        onSuccess
      );

      const formElementsState = controller.model.getFormElementsInitState(
        formElements
      );

      controllerRef.current = controller;

      return {
        formError: "",
        formMessage: "",
        formElementsState: formElementsState,
        isLoading: false,
      };
    }
  );

  if (controllerRef.current === null) throw new Error("No controller");

  controllerRef.current.setFormState = setFormState;
  (controllerRef.current as NFormRequestController<
    T,
    RESPONSE_DATA_TYPE
  >).showAlert = showAlert;

  return {
    controller: controllerRef.current,
    //formError: formState.formError,
    //formMessage: formState.formMessage,
    formElementsState: formState.formElementsState,
    isLoading: formState.isLoading,

    //setFormState: setFormState
  };
};
