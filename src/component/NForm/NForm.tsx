import React from "react";
import classes from "./NForm.module.scss";
import {
  IFormProps,
  TFormElementsDescs,
  TFormElementsState,
  IFormElementState,
} from "react-components-lib-lost/component/Form/Form";
import NInput from "../FormElements/NInput/NInput";

interface NFormProps<T> extends IFormProps<T> {}

export function renderElements<T>(
  formElementsDescs: TFormElementsDescs<T>,
  formElementsState: TFormElementsState<T>,
  onChange: (event: any) => void,
  isLoading: boolean
) {
  const elements: JSX.Element[] = [];

  formElementsDescs.forEach((elemDesc, key, map) => {
    let state = undefined;
    switch (elemDesc.elementType) {
      case "INPUT":
        state = formElementsState.get(key) as IFormElementState;
        //console.log("FORM STATE", key, formElementsState);
        //console.log("Key", classes.Group + key);

        elements.push(
          <div key={classes.Group + key} className={classes.Group}>
            <NInput
              elementAttrs={elemDesc.elementAttrs}
              disabled={isLoading}
              onChange={onChange}
              value={state.value}
              name={key as any}
              labelValue={elemDesc.labelValue}
              error={state.errors.length > 0 ? state.errors[0] : ""}
            />
          </div>
        );
        break;
      case "FILE_INPUT":
        break;

      default:
        throw new Error(`No implementation for type ${elemDesc.elementType}`);
    }
  });

  return elements;
}

function NForm<T>({
  elementsDescs,
  formElementsState,
  formError,
  formMessage,

  onSubmit,
  onClear,
  onChange,
  //children,
  submitButtonLabel = "Отправить",
  isLoading = false,
}: NFormProps<T>) {
  const elements = renderElements(
    elementsDescs,
    formElementsState,
    onChange,
    isLoading
  );
  return (
    <form onSubmit={onSubmit} className={classes.NForm}>
      {elements}
      <div className={classes.Group}>
        <button disabled={isLoading} className="btn btn--green">
          {submitButtonLabel}
        </button>
      </div>
    </form>
  );
}

export default NForm;
