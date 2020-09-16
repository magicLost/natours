import { AFormController } from "react-components-lib-lost/container/Forms/FormController";
import { TSendPostWithJsonResponse } from "react-components-lib-lost/container/Forms/FormRequestController";
import {
  IHiddenField,
  IFormModel,
} from "react-components-lib-lost/container/Forms/interfaces";
import { IFormState } from "react-components-lib-lost/hooks/Form/form";
import { TFormElementsDescs } from "react-components-lib-lost/component/Form/Form";
import {
  IJsonResponse,
  IJsonResponseError,
} from "react-components-lib-lost/types";
import { TAlertType } from "../../component/Alert/Alert";

class NFormRequestController<
  FORM_ELEMENTS_NAMES,
  RESPONSE_DATA_TYPE
> extends AFormController<FORM_ELEMENTS_NAMES> {
  successMessage = "Все супер!!!";
  onSuccess?: (data: RESPONSE_DATA_TYPE) => void | undefined;
  url = "";
  hiddenFields?: IHiddenField[];
  sendPostWithJsonResponse: TSendPostWithJsonResponse;
  showAlert?: (message: string, alertType: TAlertType) => void | undefined;

  constructor(
    formElements: TFormElementsDescs<FORM_ELEMENTS_NAMES>,
    model: IFormModel<FORM_ELEMENTS_NAMES>,
    url: string,
    sendPostWithJsonResponse: TSendPostWithJsonResponse,
    successMessage: string,
    onSuccess?: (data: RESPONSE_DATA_TYPE) => void | undefined
  ) {
    super(formElements, model);
    this.sendPostWithJsonResponse = sendPostWithJsonResponse;
    this.url = url;
    this.successMessage = successMessage;
    this.onSuccess = onSuccess;
  }

  onClear = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    //console.log("onClear");

    this.onClearHandler();
  };

  onChange = (event: any) => {
    //event.preventDefault();
    event.stopPropagation();

    //console.log("onChange", event.target);

    this.onChangeHandler(event.target);
  };

  onSubmit = (event: any): void | undefined => {
    event.preventDefault();
    event.stopPropagation();

    //console.log("Submit");

    this.onSubmitHandler();
  };

  protected onSubmitHandler(): void | undefined {
    if (this.setFormState === null) throw new Error("No setFormState...");

    this.setFormState((prevState: IFormState<FORM_ELEMENTS_NAMES>) => {
      if (this.showAlert === undefined) throw new Error("No showAlert...");

      if (
        this.model.hasInputsError(
          prevState.formElementsState,
          prevState.formError
        )
      ) {
        //show alert with Error message: not all fields have valid value
        this.showAlert("Not all fields have valid value.", "ERROR");
        return prevState;
      }

      const formError = this.model.validateOnSubmit(
        prevState.formElementsState
      );

      if (!formError) {
        const formData = this.model.getFormData(
          prevState.formElementsState,
          this.hiddenFields
        );

        if (this.model.getToken === undefined)
          throw new Error("No token function");
        const token = this.model.getToken();
        formData.append("_csrf", token);

        this.postRequest(formData);
      } else {
        //show error alert with form error
        this.showAlert(formError, "ERROR");
        return prevState;
      }

      return prevState;
    });
  }

  protected beforeRequest = () => {
    //show loading alert
    //disable form
    if (this.setFormState === null) throw new Error("No setFormState...");
    if (this.showAlert === undefined) throw new Error("No showAlert...");

    this.showAlert("...Loading.", "LOADING");

    this.setFormState((prevState: IFormState<FORM_ELEMENTS_NAMES>) => {
      return { ...prevState, isLoading: true };
    });
  };

  protected onSuccessHandler = (data: RESPONSE_DATA_TYPE) => {
    if (this.setFormState === null) throw new Error("No setFormState...");

    if (this.showAlert === undefined) throw new Error("No showAlert...");

    this.showAlert(this.successMessage, "SUCCESS");

    if (this.onSuccess) this.onSuccess(data);

    /* this.setFormState((prevState: IFormState<FORM_ELEMENTS_NAMES>) => {
      return {
        ...prevState,
        formError: "",
        formMessage: this.successMessage,
      };
    }); */
  };

  protected async postRequest(formData: FormData): Promise<any> {
    if (this.showAlert === undefined) throw new Error("No showAlert...");
    if (this.setFormState === null) throw new Error("No setFormState...");

    this.beforeRequest();
    try {
      const result = await this.sendPostWithJsonResponse<
        IJsonResponse<RESPONSE_DATA_TYPE>
      >(this.url, formData);

      this.setFormState((prevState: IFormState<FORM_ELEMENTS_NAMES>) => {
        return { ...prevState, isLoading: false };
      });

      console.log("RESPONSE DATA", result.data);

      if (result.status && result.status === "SUCCESS") {
        //console.log(data);
        //show success alert
        this.onSuccessHandler(result.data);
      } else if (result.status && result.status === "FAIL") {
        //console.log(data);
        //show Error alert
        this.showAlert(result.error.message, "ERROR");
      } else {
        //show Error alert
        this.showAlert("Ops. Some error.", "ERROR");
      }
    } catch (error) {
      console.log("[RESPONSE ERROR] ", error);
      //show Error alert
      this.showAlert("Server do not want to talk.", "ERROR");
    }
  }
}

export default NFormRequestController;
