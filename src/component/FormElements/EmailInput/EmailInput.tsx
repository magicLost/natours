import React from "react";
import TextField from "@material-ui/core/TextField";
//import isEmail from "validator/lib/isEmail";

export type TError = {
  message: string;
  ref: any;
  type: string;
};

/* inputRef={register({
        required: "Введите ваш электронный адрес, пожалуйста.",
        validate: {
          regex: (value: string) => isEmail(value) || "Некорректный адрес.",
        },
      })} */

const EmailInput = ({ register, rules, error, disabled }: any) => {
  console.log("[RENDER EMAIL INPUT]");

  return (
    <TextField
      name="email"
      //type="email"
      //onChange={onChange}
      inputRef={register(rules)}
      fullWidth
      error={error ? true : false}
      id="email-id"
      label="Адрес электронной почты"
      placeholder="example@mail.ru"
      helperText={error && error.message}
      disabled={disabled}
      variant={"outlined"}
    />
  );
};

export default React.memo(EmailInput);
