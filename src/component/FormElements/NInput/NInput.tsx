import React from "react";
import classes from "./NInput.module.scss";
import { FormElementProps } from "react-components-lib-lost/component/FormElements/FormElementPropsInterface";

interface NInputProps extends FormElementProps {
  error: string;
}

const getInputClasses = (classes: any, error: string): string => {
  let inputClasses = classes.input;

  inputClasses += error
    ? ` ${classes["input--invalid"]}`
    : ` ${classes["input--valid"]}`;
  return inputClasses;
};

const NInput = ({
  elementAttrs,
  value,
  name,
  labelValue,
  onChange,
  disabled,
  error,
}: NInputProps) => {
  const inputClasses = getInputClasses(classes, error);
  return (
    <>
      <label className={classes.label} htmlFor={elementAttrs.id}>
        {labelValue}
      </label>
      <input
        className={inputClasses}
        {...elementAttrs}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </>
  );
};

export default NInput;
