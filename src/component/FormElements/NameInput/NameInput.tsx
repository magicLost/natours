import React from "react";
import TextField from "@material-ui/core/TextField";
//import { regex } from "../../../utils/formValidators";

export type TError = {
  message: string;
  ref: any;
  type: string;
};

/* inputRef={register({
        required: "Представьтесь, пожалуйста.",
        validate: {
          regex: (value: string) =>
            regex(value, {
              pattern: /[a-zA-ZА-Яа-я 0-9-],
              errorMessage: "Не используйте спец символы, пожалуйста",
            }),
        },
      })} */

const NameInput = ({ register, rules, onChange, error, disabled }: any) => {
  return (
    <TextField
      name="name"
      onChange={onChange}
      fullWidth
      inputRef={register(rules)}
      error={error ? true : false}
      id="some-id"
      label="Ваше имя"
      placeholder="Анакриоктий"
      helperText={error && error.message}
      disabled={disabled}
      variant={"outlined"}
    />
  );
};

export default React.memo(NameInput);
