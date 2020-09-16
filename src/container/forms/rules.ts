import { regex } from "../../utils/formValidators";
import trim from "validator/lib/trim";
import isEmail from "validator/lib/isEmail";

export const nameRules = {
  regex: (value: string) =>
    regex(value, {
      pattern: /[a-zA-ZА-Яа-я 0-9-]*/,
      errorMessage: "Не используйте спец символы.",
    }),
};

export const emailRules = {
  regex: (value: string) => isEmail(value) || "Некорректный адрес.",
};

export const passwordRules = {
  required: "Введите пароль, пожалуйста.",
  maxLength: {
    value: 254,
    message: "Да ладно...", // <p>error message</p>
  },
  minLength: {
    value: 8,
    message: "Минимум 8 символов", // <p>error message</p>
  },
};
