import React from "react";
import TextField from "@material-ui/core/TextField";

/* inputRef={register({
        required: "Введите пароль, пожалуйста.",
        maxLength: {
          value: 254,
          message: "Да ладно...", // <p>error message</p>
        },
        minLength: {
          value: 8,
          message: "Минимум 8 символов", // <p>error message</p>
        },
      })} */

const PasswordInput = ({
  register,
  rules,
  error,
  disabled,
  label,
  name,
}: any) => {
  console.log("[RENDER PASSWORD INPUT]");

  return (
    <TextField
      name={name}
      type="password"
      //onChange={onChange}
      inputRef={register(rules)}
      fullWidth
      error={error ? true : false}
      id="some-id"
      label={label}
      placeholder="***********"
      helperText={error && error.message}
      disabled={disabled}
      variant={"outlined"}
    />
  );
};

export default React.memo(PasswordInput);
