import { TALERT_ACTION } from "../action";

export type TAlertType = "error" | "warning" | "info" | "success";

export interface IAlertState {
  isShow: boolean;
  message: string;
  type: TAlertType;
}

const initialState: IAlertState = {
  isShow: false,
  message: "",
  type: "success",
};

export interface IAlertAction {
  type: TALERT_ACTION;
  message: string;
  alertType: TAlertType;
}

export const showAlertAC = (
  message: string,
  alertType: TAlertType
): IAlertAction => {
  return {
    type: "SHOW_ALERT",
    message: message,
    alertType: alertType,
  };
};

const reducer = (state = initialState, action: IAlertAction) => {
  console.log("[ALERT_ACTION]", action);
  switch (action.type) {
    case "SHOW_ALERT":
      return {
        ...state,
        isShow: true,
        message: action.message,
        type: action.alertType,
      };

    case "HIDE_ALERT":
      return {
        ...state,
        isShow: false,
        //message: "",
      };

    default:
      return state;
  }
};

export default reducer;
